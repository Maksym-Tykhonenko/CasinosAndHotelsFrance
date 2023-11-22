import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import CasinoHome from './screens/CasinoHome';
import Profile from './screens/Profile';


const App=()=>{

  return (
    <NavigationContainer>
      <Tab.Navigator>
        
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="CasinoHome" component={CasinoHome} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
