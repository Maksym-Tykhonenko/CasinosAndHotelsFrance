{/** <Stack.Navigator>
            <Stack.Screen name="Casino" component={CasinoHome}  />
        </Stack.Navigator>
    
*/}
import React from "react";
import { Text, View } from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import CasinoHome from "../screens/CasinoHome";
import CasinoDitails from "../screens/CasinnoDitails";
import NewCasinoDitails from "../screens/NewCasinoDetails";


const Casinno = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="CasinoHome" component={CasinoHome} />
            <Stack.Screen options={{ headerShown: false }} name="CasinoDitails" component={CasinoDitails} />
            <Stack.Screen options={{ headerShown: false }} name='NewCasinoDitails' component={NewCasinoDitails} />
      </Stack.Navigator>
    )
        
};

export default Casinno;