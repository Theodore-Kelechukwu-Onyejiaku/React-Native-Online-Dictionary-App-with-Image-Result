import {
    ScrollView, View, Text, TouchableOpacity, TextInput, ActivityIndicator, Button,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import * as Speech from "expo-speech";

import Definitions from "../components/Definitions";
import Synonyms from "../components/Synonyms";
import Antonyms from "../components/Antonyms";

import { OXFORD_API_KEY, PIXABAY_API_KEY } from "@env";
import Images from "../components/Images";

export default function Home({ route }) {
    const [antonyms, setAntonyms] = useState([]);
    const [synonyms, setSynonyms] = useState([]);
    const [definitions, setDefinitions] = useState([]);
    const [word, setWord] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const [images, setImages] = useState([]);

    const storeToHistory = async (value) => {
        const existingHistory = await AsyncStorage.getItem("@dictHistory");
        let historyContainer = JSON.parse(existingHistory);
        if (!historyContainer) {
            historyContainer = [];
            historyContainer.push(value);
            await AsyncStorage.setItem("@dictHistory", JSON.stringify(historyContainer))
                .then(() => {
                    // successful
                })
                .catch((error) => {
                    setMessage(error.message);
                });
        } else {
            for (let i = 0; i < historyContainer.length; i++) {
                if (historyContainer[i] == value) {
                    historyContainer.splice(historyContainer.indexOf(historyContainer[i]), 1);
                    break
                }
            }
            historyContainer.push(value);
            await AsyncStorage.setItem("@dictHistory", JSON.stringify(historyContainer))
                .then(() => {
                    // successful
                })
                .catch((error) => {
                    setMessage(error.message);
                });
        }
    };

    const fetchWord = async (wordToSearch) => {
        console.log("the word", wordToSearch)
        if (!wordToSearch) return "";
        let data = { def: [], syn: [], ant: [], errorMessage: "", suggestion: "" };

        await axios({
            method: "get",
            url: `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${wordToSearch}?key=${OXFORD_API_KEY}`,
        }).then((response) => {
            if (typeof response["data"][0] == "string") {
                data.suggestion = `WORD NOT FOUND. Perhaps you can try the following:\n${response.data.toString()}`
            } else if (response.data.length == 0) {
                data.message = "WORD NOT FOUND";
            } else {

                response["data"].forEach((entry, index) => {
                    data["def"].push({ id: index, partOfSpeech: entry["fl"], definitions: entry["shortdef"] })
                    data["syn"].push({ id: index, syn: entry["meta"]["syns"][0] })
                });
                // If antonyms exists
                data.ant = response["data"][0]["meta"]["ants"][0]
            }
        }).catch((error) => {
            error.message == "Network Error"
                ? data.suggestion = "There seem to be problem with your network"
                : data.errorMessage = "Word not found!";
        });
        return data
    };

    const fetchImages = async (imageName) => {
        await axios({
            method: "get",
            url: `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=imageName`,
        }).then((results) => {
            setImages(results.data.hits)
        }).catch((error) => {
            setMessage(error.message)
        });
    };

    const resetView = async () => {
        setLoading(false);
        setDefinitions([]);
        setAntonyms([]);
        setSynonyms([]);
        setMessage("");
        setImages([]);
    };

    const loadResult = async (value) => {
        resetView();
        setLoading(true)
        let response = await fetchWord(value);
        if (response == "") {
            setLoading(false)
            return
        }
        const { def, syn, ant, errorMessage, suggestion } = response
        setDefinitions(def)
        setSynonyms(syn)
        setAntonyms(ant)
        storeToHistory(value)
        setSearch(value)
        if (errorMessage || suggestion) {
            setMessage(errorMessage || suggestion)
            setLoading(false)
        } else {
            fetchImages(value);
            setLoading(false)
        }
    };

    const handleTextInput = (text) => {
        setMessage("");
        let trimmedText = text.trim();
        setWord(trimmedText);
    };

    const speak = () => {
        Speech.speak(search);
    };

    useEffect(() => {
        if (route.params?.word) {
            loadResult(route.params.word)
        }
    }, [route.params?.word]);

    return (
        <ScrollView>
            <View>
                <Text
                    style={tw`text-center text-lg text-gray-500 my-3 rounded-lg text-gray-500`}
                >
                    Enter any word to get the meaning and the corresponding image!
                </Text>
                <View style={tw`mx-5`}>
                    <TextInput
                        spellCheck={true}
                        autoFocus={true}
                        autoCorrect={true}
                        placeholder="Enter word"
                        style={tw`m-3 text-gray-500 rounded-lg bg-white p-4 w-full m-auto`}
                        onChangeText={handleTextInput}
                    />
                </View>

                <View style={tw`ios:mb-14 android:mb-20 mt-5 mx-5`}>
                    <Button
                        disabled={loading}
                        title="Search"
                        onPress={() => {
                            loadResult(word)
                        }}
                    />
                </View>
                {loading && <ActivityIndicator sizew="large" />}
                {definitions?.length > 0 ? (
                    <View>
                        <Text style={tw`text-2xl font-extrabold px-5 text-gray-500`}>
                            {search}
                        </Text>
                        <TouchableOpacity onPress={speak} style={{ margin: 3, paddingLeft: 20, borderRadius: 10 }}>
                            <AntDesign name="sound" size={50} color="black" />
                        </TouchableOpacity>
                        <Definitions definitions={definitions} />
                    </View>
                ) : null}

                {synonyms.length ? (
                    <View style={tw`px-5 mb-3`}>
                        <Text style={tw`text-2xl font-bold mb-3`}>Synonyms</Text>
                        <Synonyms loadResult={loadResult}
                            synonyms={synonyms.slice(0, 1)}
                        />
                    </View>
                ) : null}
                {antonyms?.length ? (
                    <View style={tw`p-5`}>
                        <Text style={tw`text-2xl font-bold mb-3`}>Antonyms</Text>
                        <Antonyms loadResult={loadResult}
                            antonyms={antonyms.slice(0, 1)}
                        />
                    </View>
                ) : null}

                {images?.length ? <Images hits={images} /> : null}

                {message && (
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 4,
                            margin: 10,
                        }}
                    >
                        <FontAwesome name="info-circle" size={28} color={"tomato"} />
                        <Text style={tw`text-red-500 text-center text-lg`}>{message}</Text>
                    </View>
                )}
            </View>
            <StatusBar />
        </ScrollView>
    );
}
