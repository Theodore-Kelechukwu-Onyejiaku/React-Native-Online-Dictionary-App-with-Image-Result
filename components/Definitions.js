import { View, Text } from 'react-native'
import tw from "twrnc"

export default function Definitions({ definitions }) {
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <View >
                {definitions.map((entry, index) =>
                    <View key={index}>
                        <Text style={tw`text-2xl py-1 p-5 text-gray-500 text-blue-300 font-extrabold`}>{entry["partOfSpeech"]}</Text>
                        {
                            entry["definitions"].slice(0, 5).map((entry, index) => {
                                return <Text key={index} style={tw`text-lg  text-gray-500 italic bg-white p-8  ml-3 mr-3 mb-3`}>{entry}</Text>
                            })
                        }
                    </View>
                )}
            </View>
        </View>
    )
}
