import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,Animated, Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

import Casinno from './routs/Casino';
import CasinoHome from './screens/CasinoHome';
import Profile from './routs/Profile';

function useRoute(chackFatch) {
  if (chackFatch) {
    return (
      <View><Text>jfjfjfjfjf</Text></View>
    )
  } return (
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
  )
}

const App = () => {
  const routing = useRoute(false);

   ///////////////////////////////////// код лоудера in sportBlog
  const [loaderIsLoaded, setLoaderIsLoaded] = useState(false);

  const ChangeInView = props => {
    // const fadeAnim = useRef(new Animated.Image(require('../../acets/loader1.jpg'))).current;
    
    const fadeAnim = useRef(new Animated.Value(1)).current; // Initial value for opacity: 0 to 1
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      }).start();
    }, []);

    const appearingAnim = useRef(new Animated.Value(0)).current;// Initial value for opacity: 1 to 0
    useEffect(() => {
      Animated.timing(appearingAnim, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setLoaderIsLoaded(true)
      }, 7000);

    }, []);

    return (
      <View style={{ position: 'relative', flex: 1 }}>
        <Animated.Image
          source={require('./accets/backgr.jpg')}// Special animatable View
          style={{
            ...props.style,
            opacity: fadeAnim,
            //width: 'auto',
            height: '100%'  // Bind opacity to animated value
          }} />
        <Animated.Image
          source={require('./accets/loader.jpg')}// Special animatable View
          style={{
            ...props.style,
            opacity: appearingAnim,
            //width: '100%',
            height: '100%',
            position: 'absolute'// Bind opacity to animated value
          }} />
      </View>
    
    );
  };
  /////////////////////////////////////

  return (
    <NavigationContainer>
      {!loaderIsLoaded ? (
<ChangeInView
          style={{
            width: '100%',
            //height: 50,
            backgroundColor: 'powderblue',
          }}>
       
        </ChangeInView>
      ): (
          routing
      )}
     
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
