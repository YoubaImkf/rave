import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import RecordScreen from '../screens/RecordScreen';
import RaveScreen from '../screens/RaveScreen';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
      <Tab.Navigator >
        <Tab.Screen name='Home' component={HomeScreen} 
          options={{
          // tabBarStyle: { display: "none" },
            headerShown:false,
          }}
        />
        <Tab.Screen name='Record' component={RecordScreen}/>
        <Tab.Screen name='Rave' component={RaveScreen} />
      </Tab.Navigator>
  );
}; 

// export default AppNavigator;