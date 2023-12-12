import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,Animated, Image
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import Entypo from 'react-native-vector-icons/Entypo';

import { LogLevel, OneSignal } from 'react-native-onesignal';
import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


import Casinno from './routs/Casino';
import CasinoHome from './screens/CasinoHome';
import Profile from './routs/Profile';
import Prodact from './screens/Prodact';

function useRoute(chackFatch) {
  if (chackFatch) {
    return (
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name='Prodact' component={Prodact} />
      </Stack.Navigator>
    )
  } return (
     <Tab.Navigator >
        
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarActiveBackgroundColor: 'rgba(0, 0, 0, 1)',
            tabBarInactiveBackgroundColor: 'rgba(0, 0, 0, 1)',
            headerShown: false,
            tabBarLabelStyle: ({ focused }) => {
              return (
                { color: focused && '#e9c860' , fontWeight: 'bold' }
              )
            },
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              return (
                <Entypo name='user' style={{ color: focused ? '#e9c860' : '#fff', fontSize: 25 }} />
              )
            }
          }}
        />


        <Tab.Screen
          name="Casinno"
          component={Casinno}
          options={{
            tabBarActiveBackgroundColor: 'rgba(0, 0, 0, 1)',
            tabBarInactiveBackgroundColor: 'rgba(0, 0, 0, 1)',
            headerShown: false,
            tabBarLabelStyle: ({ focused }) => {
              return (
                { color: focused ? '#e9c860' : '#fff', fontWeight: 'bold' }
              )
            },
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => {
              return (
                <Entypo name='home' style={{ color: focused ? '#e9c860' : '#fff', fontSize: 30 }} />
              )
            }
          }}
        />

      
        
      </Tab.Navigator>
  )
}

const App = () => {
  
  const [rout, setRout] = useState(null);
  const routing = useRoute(rout);
  const [idfa, setIdfa] = useState(null);

  ////////////////////////////oneSignal
  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res) =>
        !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null),
      )
      .catch((err) => {
        console.log(err);
        return setIdfa(null);
      });
  }, []);

  useEffect(() => {
    if (idfa) {
      // Метод для запиту дозволів на push-сповіщення
      OneSignal.Notifications.requestPermission(true);
    }
  }, [idfa]);
  //

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize("491f5ff0-4df2-436d-a3dc-ead02d0e9c8c");

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', (event) => {
    console.log('OneSignal: notification clicked:', event);
  });

  //Add Data Tags
  OneSignal.User.addTag("key", "value");
  
  console.log('rout==>', rout)

  useEffect(() => {

    //const checkUrl = 'https://reactnative.dev/docs/animated';
    const checkUrl = 'https://jewelgate.space/ZHFLgHzZ';
    const targetData = new Date('2023-12-10');//дата з якої поч працювати webView 
    const currentData = new Date();//текущая дата 

    targetData.setHours(12, 0, 0, 0);

    if (currentData <= targetData) {
      setRout(false)
    } else {
      fetch(checkUrl).then(r => {
        if (r.status === 200) {
          setRout(true)
        } else {
          setRout(false)
        }
      }).catch(err => {
        console.log("error", err)
        setRout(false)
      })
     }
  })

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
      ) : (
        routing
      )}
     
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({

});

export default App;
