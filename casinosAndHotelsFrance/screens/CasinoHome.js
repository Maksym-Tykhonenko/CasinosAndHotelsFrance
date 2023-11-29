import React,{useState, useEffect} from "react";
import {TextInput, View, Text, ImageBackground, ScrollView, TouchableOpacity, Modal, Dimensions } from "react-native";
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { casino } from "../data/casino";
import { uid } from "uid";

const CasinoHome = ({ navigation }) => {
    
    const [casinos, setCasinos] = useState([]);
    console.log('casinos==>', casinos)
    /////////// Modal code
    const [modalAddHotelsVisible, setModalAddHotelsVisible] = useState(false);
    const [hotelName, setHotelName] = useState('');
    const [hotelAddress, setHotelAddress] = useState('');
    const [description, setDescription] = useState('');
    const [qwantityOfRooms, setQwantityOfRooms] = useState();

    useEffect(() => {
        getData(); // дані завантажені з AsyncStorage
    }, []);

    useEffect(() => {
        setData(); // Запис даних у AsyncStorage при зміні bankName, info або photo
    }, [casinos]);

    const setData = async () => {
        try {
            const data = {
                casinos,
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem("casinos", jsonData);
            console.log('Дані збережено AsyncStorage на CasinoHome')
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('casinos');
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setCasinos(parsedData.casinos);
            }
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };


    const handlAddHotel = () => {
        let newHotel = {
            hotel: hotelName,
            location: hotelAddress,
            description,
            qwantityOfRooms,
            id: uid(),
        };
        setCasinos([...casinos, newHotel]);

        setHotelName('');
        setHotelAddress('');
        setDescription('');
        setQwantityOfRooms('');
        setModalAddHotelsVisible(false);
    };

    const closeModal = () => {
        setModalAddHotelsVisible(false);
        setHotelName('');
        setHotelAddress('');
        setDescription('');
        setQwantityOfRooms('');
    };



    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../accets/bgrImg.jpeg')}
            >
                <View style={{ position: 'relative' }}>
                    <View style={{ marginTop: 40, marginRight: 40, marginLeft: 40, marginBottom: 40 }}>

                        <Text style={{ color: '#e9c860', fontSize: 30, fontWeight: 'bold', marginLeft: 20, marginBottom: 15 }}>Hotels in France :</Text>
                        <ScrollView style={{ marginBottom: 70 }}>
                            <View>
                        
                                <View>
                                    {casinos ? (casinos.map(({hotel, qwantityOfRooms, location, description, id}) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('NewCasinoDitails', { hotel, qwantityOfRooms, location, description, })
                                                }}
                                                style={{ height: 50, backgroundColor: 'rgba(233, 200, 96, 0.8)', marginBottom: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 15, shadowColor: '#e9c860', shadowOffset: { width: 1, height: 1, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}
                                                key={id}
                                            >
                                                <Text style={{ color: '#081f41', fontWeight: 'bold', }}>{hotel}</Text>
                                            </TouchableOpacity>
                                        )
                                    })) : (
                                            <View></View>
                                    )
                                }

                                    {casino.map(({ id, hotel, numberOfRooms, location, description, photo, latitude, longitude }) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('CasinoDitails', { hotel, numberOfRooms, location, description, photo, latitude, longitude })
                                                }}
                                                style={{ height: 50, backgroundColor: 'rgba(233, 200, 96, 0.8)', marginBottom: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 15, shadowColor: '#e9c860', shadowOffset: { width: 1, height: 1, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}
                                                key={id}
                                            >
                                                <Text style={{ color: '#081f41', fontWeight: 'bold', }}>{hotel}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                        </ScrollView>

                        <TouchableOpacity
                            onPress={() => { setModalAddHotelsVisible(true) }}
                            style={{ position: 'absolute', right: -30, top: -15 }}>
                            <Entypo name='circle-with-plus' style={{ color: '#e9c860', fontSize: 33 }} />
                        </TouchableOpacity>

                        {/**
                        <TouchableOpacity
                            
                            style={{ position: 'absolute', left: -30, top: -15 }}>
                            <AntDesign name="calculator" style={{ color: '#e9c860', fontSize: 33 }} />
                        </TouchableOpacity> */}
                    </View>

                </View>
                
                {/** Modal add hotel */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalAddHotelsVisible}
                >
                    <View
                        style={{
                            flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        }}>
                        <View style={{
                            flex: 1, marginTop: 100, borderTopLeftRadius: 15, borderTopRightRadius: 15, borderColor: '#e9c860', borderWidth: 1, backgroundColor: '#0c1e3b'
                        }}>

                            <View style={{marginHorizontal: 10, marginVertical: 20}}>

                                 <TextInput
                                            placeholderTextColor='rgba(233, 200, 96, 0.5)'
                                            placeholder="Hotel name..."
                                            value={hotelName}
                                            onChangeText={setHotelName}
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderColor: '#e9c860', color: '#e9c860', borderRadius: 10, width: 250, height: 40
                                            }}
                                        />

                                <TextInput
                                            placeholderTextColor='rgba(233, 200, 96, 0.5)'
                                            placeholder="Location..."
                                            value={hotelAddress}
                                            onChangeText={setHotelAddress}
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderColor: '#e9c860', color: '#e9c860', borderRadius: 10, width: 250, height: 40
                                            }}
                                        />

                                <TextInput
                                            placeholderTextColor='rgba(233, 200, 96, 0.5)'
                                            placeholder="Description..."
                                            value={description}
                                            onChangeText={setDescription}
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderColor: '#e9c860', color: '#e9c860', borderRadius: 10, width: 250, height: 40
                                            }}
                                        />

                                <TextInput
                                    multiline={true}
                                            placeholderTextColor='rgba(233, 200, 96, 0.5)'
                                            placeholder="Number Of Rooms..."
                                            value={qwantityOfRooms}
                                            onChangeText={setQwantityOfRooms}
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: 0.8,
                                                elevation: 9,
                                                marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderColor: '#e9c860', color: '#e9c860', borderRadius: 10, width: 250, height: 120
                                            }}
                                />
                                
                                <View style={{width: 250, justifyContent: 'center', alignItems: 'center'}}>
                                    <TouchableOpacity
                                        onPress={()=> handlAddHotel()}
                                        style={{width: 100, height: 40, borderWidth: 2, borderColor: '#e9c860', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}
                                    >
                                        <Text style={{color: '#e9c860', fontWeight: 'bold', fontSize: 18}}>Add</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            {/**Close Btn */}
                            <TouchableOpacity
                                style={{ position: 'absolute', right: 10, top: 10 }}
                                onPress={() => { closeModal() }}
                            >
                                <Entypo name='circle-with-cross' style={{ color: '#e9c860', fontSize: 33 }} />
                            </TouchableOpacity>

                        </View>

                    </View>

                </Modal>

            </ImageBackground>
        </View>
    );
};

export default CasinoHome;