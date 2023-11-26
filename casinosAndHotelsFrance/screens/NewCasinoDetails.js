
import React, {useState, useRef, useEffect} from "react";
import {Animated, View, Text,TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, Image } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { uid } from 'uid';
import MapView from 'react-native-maps';



const NewCasinoDitails = ({ navigation, route }) => {
    const [plase, setPlase] = useState(route.params);
    const { hotel, numberOfRooms, location, description } = plase;
    console.log('plase==>', plase);

    {/** ANIMATION */}
const [loaderIsLoaded, setLoaderIsLoaded] = useState(false);
const ChangeInView = props => {

    const appearingAnim = useRef(new Animated.Value(0)).current;// Initial value for opacity: 1 to 0
    useEffect(() => {
        Animated.timing(appearingAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            setLoaderIsLoaded(true)
        }, 2000);

    }, []);

    return (
        <View style={{ position: 'relative', flex: 1,backgroundColor: '#0c1e3b' }}>

            <Animated.Image
                source={require('../accets/bgrImg.jpeg')}// Special animatable View
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
///////////////////////////////////////////// borderTopWidth:5,borderColor: 'rgba(233, 200, 96, 0.8)',

    return (
        <View style={{ flex: 1, position: 'relative', backgroundColor: '#0c1e3b' }}>
            
            {!loaderIsLoaded ? (
                <ChangeInView
                    style={{
                        width: '100%',
                        //height: 50,
                        backgroundColor: 'powderblue',
                    }}>
       
                </ChangeInView>
            ) : (
                <ImageBackground
                    style={{ flex: 1 }}
                    source={require('../accets/bgrImg.jpeg')}
                >
                    <View style={{ flex: 1, borderRadius: 15, marginTop: 40, marginBottom: 30, marginHorizontal: 20, paddingHorizontal: 5, paddingVertical: 10, backgroundColor: 'rgba(233, 200, 96, 0.8)', shadowColor: '#e9c860', shadowOffset: { width: 1, height: 1, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}>
                            
                        <ScrollView>
                            <View style={{ padding: 10, paddingTop: 10 }}>
                                
                                {/**Photo block */}
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', }}>
                                    
                                    <TouchableOpacity
                                        onPress={() => {
                                            //ImagePicer()
                                        }}
                                        style={{
                                            borderWidth: 2,
                                            borderRadius: 10,
                                            borderColor: '#0c1e3b',
                                            height: 98,
                                            width: '100%',
                                            height: 200,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: 10,
                                            marginRight: 8,
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: 0.8,
                                            elevation: 9,
                                        }}
                                    >
                                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#0c1e3b' }}>+ add photo</Text>
                                    </TouchableOpacity>
                                </View>
                                    
                                {/**Info block */}
                                <View style={{ marginBottom: 15 }}>
                                    <Text style={{ color: '#0c1e3b' }}><Text style={{ fontWeight: 'bold' }}>Hôtel: </Text>{hotel}</Text>
                                    <Text style={{ color: '#0c1e3b' }}><Text style={{ fontWeight: 'bold' }}>Location: </Text>{location}</Text>
                                    <Text style={{ color: '#0c1e3b' }}><Text style={{ fontWeight: 'bold' }}>Description: </Text>{description}</Text>
                                    <Text style={{ color: '#0c1e3b' }}><Text style={{ fontWeight: 'bold' }}>Number of Rooms:</Text> Approximately {numberOfRooms} rooms</Text>
                                    
                                </View>
                             
                                {/**Map block */}
                                <View >
                                    <MapView
                                        style={{ flex: 1, height: 200, borderRadius: 10 }}
                                        initialRegion={{
                                            latitude: 37.78825,
                                            longitude: -122.4324,
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                    />

                                </View>
                               
                            </View>
                        </ScrollView>
                       
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("CasinoHome")}
                        style={{ position: 'absolute', bottom: 0, right: 10 }}>
                        <Entypo name="reply" style={{ color: '#e9c860', fontSize: 33 }} />
                    </TouchableOpacity>
              
                </ImageBackground>
            )}

            
        </View>
    );
};

export default NewCasinoDitails;