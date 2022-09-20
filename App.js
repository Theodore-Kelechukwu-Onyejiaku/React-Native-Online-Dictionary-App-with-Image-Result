import { Platform, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import DrawerNavigation from "./components/navigations/DrawerNavigation";
import BottomTabNavigation from "./components/navigations/BottomTabNavigation";

const App = Platform.select({
  ios: () => <BottomTabNavigation />,
  android: () => <DrawerNavigation />
})
export default App;