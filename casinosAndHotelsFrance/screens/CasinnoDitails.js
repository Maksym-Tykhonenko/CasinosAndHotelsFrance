
import React, {useState, useRef, useEffect} from "react";
import {Animated, View, Text,TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, Image } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { uid } from 'uid';
import MapView from 'react-native-maps';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const CasinoDitails = ({ navigation, route }) => {
    const [selectPhoto, setSelectPhoto] = useState(null);
    const [plase, setPlase] = useState(route.params);
    const { hotel, numberOfRooms, location, description, photo, longitude, latitude } = plase;
    console.log('plase==>', plase);

       useEffect(() => {
        getData(); // дані завантажені з AsyncStorage
    }, []);

    useEffect(() => {
        setData(); // Запис даних у AsyncStorage при зміні bankName, info або photo
    }, [selectPhoto]);

      const setData = async () => {
        try {
            const data = {
                selectPhoto,
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem("photoFromCasinoDitails", jsonData);
            console.log('Дані збережено AsyncStorage на CasinoHome')
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('photoFromCasinoDitails');
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setSelectPhoto(parsedData.selectPhoto);
            }
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };


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
        <View style={{ position: 'relative', flex: 1,backgroundColor: '#000' }}>

            <Animated.Image
                source={require('../accets/backgr.jpg')}// Special animatable View
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

     const ImagePicer = () => {
        let options = {
            storageOptios: {
                path: 'image',
            }
        };
        
        launchImageLibrary(options, response => {
            if (!response.didCancel) {
                console.log('response==>', response.assets[0].uri);
                
                //const newSelectedPhotos = [...selectPhoto, { sel: response.assets[0].uri }];
                //console.log('newSelectedPhotos==>', newSelectedPhotos)
                setSelectPhoto(response.assets[0].uri);

            } else {
                console.log('Вибір скасовано');
            }
        });
    };

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
                    source={require('../accets/backgr.jpg')}
                >
                    <View style={{ flex: 1, borderRadius: 15, marginTop: 40, marginBottom: 30, marginHorizontal: 20, paddingHorizontal: 5,paddingVertical:10, backgroundColor: 'rgba(0, 0, 0, 0.2)',   }}>
                            
                        <ScrollView>
                            <View style={{ padding: 10, paddingTop: 10 }}>
                                
                                {/**Photo block */}
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', }}>
                                    {photo.map((item) => {
                                        const index = photo.indexOf(item);
                                        return (
                                            
                                            <Image
                                                key={uid()}
                                                style={{
                                                    width: index === 0 ? '100%' : '48%',
                                                    height: index === 0 ? 200 : 100,
                                                    borderRadius: 10,
                                                    marginBottom: 10,
                                                    resizeMode: 'cover',
                                                }}
                                                source={item.pict}
                                            />
                                        )
                                    })}
                                        
                                        {selectPhoto &&
                        <Image
                            style={{ width: '48%', height: 100, borderRadius: 10, }}
                            source={{ uri: selectPhoto }} />
                    }
                                        
                                    <TouchableOpacity
                                        onPress={() => {
                                            ImagePicer()
                                        }}
                                        style={{
                                            borderWidth: 2,
                                            borderRadius: 10,
                                             borderColor: '#e9c860',
                                            height: 98,
                                            width: '46%',
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginBottom: 10,
                                            marginRight: 8,
                                            shadowOffset: { width: 3, height: 4 },
                                            shadowOpacity: 0.8,
                                            elevation: 9,
                                        }}
                                    >
                                        <Text style={{ fontWeight: 'bold', fontSize: 17, color: '#e9c860' }}>+ add photo</Text>
                                    </TouchableOpacity>
                                </View>
                                    
                                {/**Info block */}
                                <View style={{marginBottom: 15}}>   
                                    <Text style={{ color: '#e9c860' }}><Text style={{ fontWeight: 'bold' }}>Hôtel: </Text>{hotel}</Text>
                                    <Text style={{ color: '#e9c860' }}><Text style={{ fontWeight: 'bold' }}>Location: </Text>{location}</Text>
                                    <Text style={{ color: '#e9c860' }}><Text style={{ fontWeight: 'bold' }}>Description: </Text>{description}</Text>
                                    <Text style={{ color: '#e9c860' }}><Text style={{ fontWeight: 'bold' }}>Number of Rooms:</Text> Approximately {numberOfRooms} rooms</Text>
                                    
                                </View>
                             
                                {/**Map block */}
                                <View >
                                        <MapView
                                            style={{flex: 1, height: 200, borderRadius: 10 }}
                                        initialRegion={{
                                            latitude:  latitude,
                                            longitude:longitude,
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

export default CasinoDitails;