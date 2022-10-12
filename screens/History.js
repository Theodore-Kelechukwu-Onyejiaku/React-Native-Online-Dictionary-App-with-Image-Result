import React, { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import { View, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from "twrnc"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from "react-native-gesture-handler";

export default function History({ navigation }) {

    const isFocused = useIsFocused()
    let [searchHistory, setSearchHistory] = useState([])
    const getHistory = async () => {
        try {
            const existingHistory = await AsyncStorage.getItem('@dictHistory')
            setSearchHistory(JSON.parse(existingHistory))
        } catch (e) {
            // something went wrong!
        }
    }

    const clearHistory = async () => {
        try {
            await AsyncStorage.clear()
            setSearchHistory([])
        } catch (e) {
            // something went wrong!
        }
    }

    useEffect(() => {
        if (isFocused) {
            getHistory()
        }
        return () => getHistory()
    }, [isFocused]);
    const checkMeaning = (word) => {
        navigation.navigate("Home", { word })
    }
    return (
        <ScrollView>
            <View style={tw`px-5 py-2 `}>
                {JSON.parse(JSON.stringify(searchHistory))?.length ? JSON.parse(JSON.stringify(searchHistory)).reverse().slice(0, 10).map((search, index) =>
                    <TouchableOpacity key={index} style={tw`bg-white`} onPress={() => { checkMeaning(search) }}><Text style={tw`text-lg text-gray-500 py-3 px-5 w-full shadow my-3 rounded shadow`}>{search}</Text></TouchableOpacity>
                ) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={tw`text-7xl text-gray-500 text-center`}>Oops</Text>
                    <Text style={tw`text-lg text-gray-500 text-center`}>No History found</Text>
                </View>}
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => { navigation.navigate("Home") }}>
                    <AntDesign name="back" size={30} color="black" style={tw`text-black text-center m-3  p-5 rounded-md`} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { clearHistory() }}>
                    <AntDesign name="delete" size={30} color="black" style={tw`text-red-300 text-center m-3 p-5 rounded-md `} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
