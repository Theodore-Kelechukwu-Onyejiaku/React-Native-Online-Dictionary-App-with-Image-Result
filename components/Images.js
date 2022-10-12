import { View, Image, Linking, TouchableOpacity, Text } from 'react-native'
import tw from "twrnc"

function Images({ hits }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {hits?.length ? hits.map((img, index) =>
                <TouchableOpacity key={index} onPress={() => { Linking.openURL(img.largeImageURL) }}><Image style={{ width: 370, height: 300, backgroundColor: "#e1e4e8" }} source={{ uri: img.largeImageURL }} /></TouchableOpacity>
            )
                : null}
        </View>
    )
}

export default Images