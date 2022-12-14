import { View, Text, TouchableOpacity } from "react-native"
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from "twrnc"

export default function About({ navigation }) {
  return (
    <View>
      <Text style={tw`my-10 text-center p-5 text-lg`}>
        Online Dictionary is an application built using React Native, Pixabay API, Merriam Webster Dictionary and Expo Go.
      </Text>
      <TouchableOpacity onPress={() => { navigation.navigate("Home") }} style={tw`p-4 border w-2/5 m-auto `}>
        <AntDesign name="back" size={24} color="black" style={tw`text-center`} />
      </TouchableOpacity>
    </View>
  )
}
