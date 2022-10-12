import { View, Text, TouchableOpacity } from 'react-native'
import tw from "twrnc"

export default function Antonym({ antonyms, loadResult }) {
    return (
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            {antonyms.map((entry, index) => {
                return <TouchableOpacity key={index} style={tw`bg-white m-1 rounded-lg`} onPress={() => { loadResult(entry) }}><Text style={tw`text-lg p-2 underline m-1 text-red-500`}>{entry}</Text></TouchableOpacity>
            })}
        </View>
    )
}