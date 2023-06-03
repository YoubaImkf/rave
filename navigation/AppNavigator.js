import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import RaveScreen from '../screens/RaveScreen';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons'; 


const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
      <Tab.Navigator >
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
              options={
                {
                  tabBarStyle: {backgroundColor: '#8BD0FC'},
                  tabBarIconStyle: {color: 'white'},
                  headerShown:false,
                  tabBarLabel: () => null,
                  tabBarIcon: () => (
                    <FontAwesome name='microphone' size={24} color="black"/>
                  ),
            }} 
        />
        <Tab.Screen name='Rave' component={RaveScreen} 
              options={{
                headerShown:false,
                tabBarLabel: () => null,
                tabBarIcon: () => (
                  <Feather name="headphones" size={24} color="black" />
                )
              }}
        />
      </Tab.Navigator>
  );
}; 
