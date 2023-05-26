import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import RaveScreen from '../screens/RaveScreen';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
      <Tab.Navigator >
        {/* <Icon.Tab.Screen name="microphone"></Icon.Tab.Screen> */}
        <Tab.Screen name='Home' component={HomeScreen}
              options={
                {
                headerShown:false,
                tabBarLabel: () => null,
                tabBarIcon: () => (
                  <MaterialIcons name="login" size={24} color="black" />
                ),
            }} 
        />

        <Tab.Screen name='Record' component={RecordScreen}
              options={{
                tabBarLabel: () => null,
                tabBarIcon: () => (
                  <FontAwesome name='microphone' size={24} color="black"/>
                ),
            }} 
        />
        <Tab.Screen name='Rave' component={RaveScreen} 
              options={{
                tabBarLabel: () => null,
                tabBarIcon: () => (
                  <Feather name="headphones" size={24} color="black" />
                )
              }}
        />
      </Tab.Navigator>
  );
}; 

// export default AppNavigator;