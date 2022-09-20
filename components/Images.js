import { View, Image, Linking, Pressable } from 'react-native'

function Images({ hits }) {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {hits?.length ? hits.map((img, index) =>
                <Pressable key={index} onPress={() => { Linking.openURL(img.largeImageURL) }}><Image style={{ width: 370, height: 300, backgroundColor: "#e1e4e8" }} source={{ uri: img.largeImageURL }} /></Pressable>)
                : null}
        </View>
    )
}

export default Images