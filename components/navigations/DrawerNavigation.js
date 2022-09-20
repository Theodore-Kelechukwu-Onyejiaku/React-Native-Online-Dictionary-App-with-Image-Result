import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import "react-native-gesture-handler"
import { FontAwesome } from "@expo/vector-icons"

import Home from "../../screens/Home"
import About from "../../screens/About"
import History from "../../screens/History"

const Drawer = createDrawerNavigator()

export default function DrawerNavigation() {
    return (
        <NavigationContainer>
            <Drawer.Navigator options={{}} useLegacyImplementation={true} initialRouteName='Home'>
                <Drawer.Screen name="Home" component={Home}
                    options={{
                        title: "Online Dictionary",
                        drawerIcon: (focused, color, size) => {
                            let iconName = "home"
                            return <FontAwesome name={iconName} size={20} color="red" />
                        },
                        drawerActiveTintColor: "tomato",
                    }} />
                <Drawer.Screen  name="History" component={History}
                    options={{
                        title: "History",
                        drawerIcon: (focused, color, size) => {
                            return <FontAwesome focused={focused} name="history" size={20} color={"tomato"} />
                        },
                        drawerActiveTintColor: "tomato",
                    }} />
                <Drawer.Screen name="About" component={About} options={{
                    title: "About",
                    drawerIcon: (focused, color, size) => {
                        return <FontAwesome focused={focused} name="info-circle" size={20} color={"tomato"} />
                    },
                    drawerActiveTintColor: "tomato",
                }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
