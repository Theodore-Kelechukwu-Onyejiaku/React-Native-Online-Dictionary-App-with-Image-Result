import React, { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import { View, Text, Pressable } from 'react-native'
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
            console.log(existingHistory)
        } catch (e) {
            alert("Something went wrong!")
        }
    }

    const clearHistory = async () => {
        try {
            await AsyncStorage.clear()
            setSearchHistory([])
        } catch (e) {
            alert("Something went wrong!")
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
                    <Pressable key={index} style={({ pressed }) => [{ margin: 3, borderRadius: 10, backgroundColor: pressed ? 'tomato' : 'white' }]} onPress={() => { checkMeaning(search) }}><Text style={tw`text-lg text-gray-500 py-3 px-5 w-full shadow my-3 rounded shadow`}>{search}</Text></Pressable>
                ) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={tw`text-7xl text-gray-500 text-center`}>Oops</Text>
                    <Text style={tw`text-lg text-gray-500 text-center`}>No History found</Text>
                </View>}
            </View>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <Pressable onPress={() => { navigation.navigate("Home") }}>
                    <AntDesign name="back" size={24} color="black" style={tw`bg-black text-white text-center m-3  p-5 rounded-md`} />
                </Pressable>
                <Pressable onPress={() => { clearHistory() }}>
                    <AntDesign name="delete" size={24} color="black" style={tw`bg-red-600 text-white text-center m-3 p-5 rounded-md `} />
                </Pressable>
            </View>
        </ScrollView>
    )
}
