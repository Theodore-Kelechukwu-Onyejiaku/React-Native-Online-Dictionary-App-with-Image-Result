import { useState } from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome } from "@expo/vector-icons"
import "react-native-gesture-handler"

import Home from "../../screens/Home"
import About from "../../screens/About"
import History from "../../screens/History"

const Tab = createBottomTabNavigator()
export default function IosNavagition() {
    return (
        <NavigationContainer>
            <Tab.Navigator useLegacyImplementation={true} initialRouteName='Home'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        switch (route.name) {
                            case "Home": iconName = "home"; break;
                            case "About": iconName = "info-circle"; break;
                            case "History": iconName = "history"; break;
                        }
                        return <FontAwesome name={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: "tomato",
                })}>
                <Tab.Screen name="Home" component={Home} options={{ title: "Online Dictionary" }} />
                <Tab.Screen name="History" component={History} />
                <Tab.Screen name="About" component={About} />
            </Tab.Navigator>
        </NavigationContainer >
    )
}
