import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./navigation/AppNavigator";
import { LoadCustomFonts } from "./font.config";
import { Provider } from "react-redux"; // Provide the Redux Store to React
import { store } from "./store";

LoadCustomFonts();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
