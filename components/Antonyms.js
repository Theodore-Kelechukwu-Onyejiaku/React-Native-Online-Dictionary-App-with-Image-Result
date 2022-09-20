import { View, Text, Pressable } from 'react-native'
import tw from "twrnc"

export default function Antonym({ antonyms, loadResult }) {
    return (
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {antonyms.map((entry, index) => {
                return <Pressable key={index} style={({ pressed }) => [{ margin: 3, borderRadius: 10, backgroundColor: pressed ? 'tomato' : 'white' }]} onPress={() => { loadResult(entry) }}><Text style={tw`text-lg p-2 underline m-1 text-red-500`}>{entry}</Text></Pressable>
            })}
        </View>
    )
}