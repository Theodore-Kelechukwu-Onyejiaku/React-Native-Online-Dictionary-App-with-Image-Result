import { View, Text } from 'react-native'
import tw from "twrnc"

export default function Definitions({ definitions }) {
    return (
            <View >
                {definitions.map((entry, index) =>
                    <View key={index} style={tw`mx-5 my-3`}>
                        <Text style={tw`text-2xl text-gray-500`}>{entry["partOfSpeech"]}</Text>
                        {
                            entry["definitions"].slice(0, 5).map((entry, index) => {
                                return <Text key={index} style={tw`m-3 text-lg text-gray-500 rounded-lg bg-white p-4 w-full m-auto`}>{entry}</Text>
                            })
                        }
                    </View>
                )}
            </View>
    )
}
