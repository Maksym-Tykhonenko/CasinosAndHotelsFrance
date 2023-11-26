import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

import Casinno from './routs/Casino';
import CasinoHome from './screens/CasinoHome';
import Profile from './routs/Profile';


const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator >
        
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarActiveBackgroundColor: '#e9c860',
            tabBarInactiveBackgroundColor: '#6097d9',
            headerShown: false,
            tabBarLabelStyle: { color: '#fff', fontWeight: 'bold' },
            tabBarIcon: ({ focused }) => {
              return (
                <Entypo name='user' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
              )
            }
          }}
        />


        <Tab.Screen
          name="Casinno"
          component={Casinno}
          options={{
            tabBarActiveBackgroundColor: '#e9c860',
            tabBarInactiveBackgroundColor: '#6097d9',
            headerShown: false,
            tabBarLabelStyle: { color: '#fff', fontWeight: 'bold' },
            tabBarIcon: ({ focused }) => {
              return (
                <Entypo name='home' style={{ color: focused ? '#fff' : '#fff', fontSize: 25 }} />
              )
            }
          }}
        />

      
        
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
