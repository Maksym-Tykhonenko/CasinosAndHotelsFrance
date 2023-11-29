import React,{useEffect, useState} from "react";
import {Switch, View, Text,TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, Image, Modal, Alert } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uid } from 'uid';
import { Calendar, LocaleConfig } from 'react-native-calendars';



const Profile = () => {

    const [history, setHistory] = useState([]);
    const [selectedData, setSelectedData] = useState('')
    const [casinoName, setCasinoName] = useState('');
    const [summa, setSumma] = useState('');
    const [modalAddHotelsVisible, setModalAddHotelsVisible] = useState(false);
    const [writingUsername, setWritingUsername] = useState('');
    const [userName, setUserName] = useState('');
    const [selectPhoto, setSelectPhoto] = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
    //console.log('casinoName&summa==>', casinoName, summa);
    //console.log('selectedData====>', history.data.day[0])

    useEffect(() => {
        getData(); // дані завантажені з AsyncStorage
    }, []);

    useEffect(() => {
        setData(); // Запис даних у AsyncStorage при зміні bankName, info або photo
    }, [selectPhoto, userName, history]);

    const setData = async () => {
        try {
            const data = {
                userName,
                selectPhoto,
                history
            }
            const jsonData = JSON.stringify(data);
            await AsyncStorage.setItem("prifileData", jsonData);
            console.log('Дані збережено AsyncStorage на prifileData')
        } catch (e) {
            console.log('Помилка збереження даних:', e);
        }
    };

    const getData = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('prifileData');
            if (jsonData !== null) {
                const parsedData = JSON.parse(jsonData);
                console.log('parsedData==>', parsedData);
                setUserName(parsedData.userName);
                setSelectPhoto(parsedData.selectPhoto);
                setHistory(parsedData.history);
            }
        } catch (e) {
            console.log('Помилка отримання даних:', e);
        }
    };


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

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleAddToHistory = () => {

        let newHistory = {
            id: uid(),
            data: selectedData,
            casinoName,
            summa, // : isEnabled ? `-${summa}` : `+${summa}`,
            status: isEnabled ? 'win' : 'lost'

        };

        setHistory([newHistory, ...history]);
        setCasinoName('');
        setSumma('');
        setSelectedData('')
    };

    {/**Нагадування про щасливу дату */ }
    useEffect(() => {

        const currentDate = new Date().getDate();

        let enabalItem = history.find(item => item.data.day === currentDate);

        if (enabalItem) {
            Alert.alert(`Today is your lucky day, dont fogot to make a bat`)
        }
    }, []);
        

    function calculateBalance(history) {
        let totalBalance = 0;

        history.forEach((i) => {

            if (i.summa) {
                if (i.status === 'win') {
                    totalBalance += parseFloat(i.summa);
                } else if (i.status === 'lost') {
                    totalBalance -= parseFloat(i.summa);
                }
            }
            return

        });

        return totalBalance;
    };

    const total = calculateBalance(history);
    console.log('Total balance:', total); // Загальний баланс
    

    return (
        <View style={{ flex: 1, }}>
            <ImageBackground
                style={{ flex: 1 }}
                source={require('../accets/bgrImg.jpeg')}
            >
                <ScrollView style={{ marginTop: 40, marginHorizontal: 20 }}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                        <View style={{ position: 'relative' }}>

                            {/**History Modal BTN */}
                            <TouchableOpacity
                                style={{ position: 'absolute', right: 0, top: 100, flexDirection: 'row', borderTopWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: '#e9c860', borderRadius: 10, width: 120, height: 40, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', backgroundColor: '#0c1e3b', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}
                                onPress={() => { setModalAddHotelsVisible(true) }}
                            >
                                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#e9c860' }}>My history</Text>
                                           
                            </TouchableOpacity>


                            {/**Add PhotoBlock */}
                            <View style={{ position: 'relative', width: 150, marginBottom: 20 }}>
                                {!selectPhoto ? (
                                    <View><Image
                                        style={{ width: 150, height: 150 }}
                                        source={require('../accets/user.png')}
                                    />
                                        <TouchableOpacity
                                            onPress={() => { ImagePicer() }}
                                            style={{ position: 'absolute', right: 0, bottom: 0, backgroundColor: '#fff', borderRadius: 150 }}>
                                            <Entypo name='circle-with-plus' style={{ color: '#3157c9', fontSize: 35 }} />
                                        </TouchableOpacity></View>
                                ) : (
                                    <View>
                                        <Image
                                            source={{ uri: selectPhoto }}
                                            style={{ width: 150, height: 150, borderRadius: 150 }} />
                                        <TouchableOpacity
                                            onPress={() => { ImagePicer() }}
                                            style={{ position: 'absolute', right: 0, bottom: 0, backgroundColor: '#fff', borderRadius: 150 }}>
                                            <Entypo name='circle-with-plus' style={{ color: '#3157c9', fontSize: 35 }} />
                                        </TouchableOpacity>
                                    </View>
                                        
                                )}
                               
                                
                            </View>

                            {/**Content withaut photo block */}
                            <View style={{ marginBottom: 15 }}>

                               
                                <View style={{ flex: 1, backgroundColor: 'rgba(233, 200, 96, 0.8)', borderRadius: 15, padding: 10, shadowColor: '#e9c860', shadowOffset: { width: 2, height: 1, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}>
                                    
                                    {/** NAME block*/}
                                    {!userName ? (
                                        <View>
                                            <Text style={{ marginLeft: 5, marginBottom: 10, fontWeight: 'bold', fontSize: 25, color: '#0c1e3b' }}>Add name :</Text>
                                            <View style={{ position: 'relative', width: 250 }}>
                                                <TextInput
                                                    placeholderTextColor='#3c5477'
                                                    placeholder="Name..."
                                                    value={writingUsername}
                                                    onChangeText={setWritingUsername}
                                                    style={{
                                                        shadowOffset: { width: 3, height: 4 },
                                                        shadowOpacity: .8,
                                                        elevation: 9,
                                                        marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderColor: '#0c1e3b', color: '#000', borderRadius: 10, width: 250, height: 40
                                                    }}
                                                />
                                                <TouchableOpacity
                                                    style={{
                                                        position: 'absolute', right: 0, marginLeft: 4, borderTopWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: '#0c1e3b', borderRadius: 10, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', backgroundColor: '#e9c860', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.5, shadowRadius: 3.84,
                                                    }}
                                                    onPress={() => setUserName(writingUsername)}
                                                >
                                                    <AntDesign name='check' style={{ color: 'red', fontSize: 30 }} />
                    
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ) : (
                                        <View style={{ marginBottom: 10, position: 'absolute', top: -150, right: 0 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#e9c860' }}>{userName.toLocaleUpperCase()}</Text>
                                        </View>
                                    )}
                                    
                                    {/** Add plases where i'm been block*/}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 250, marginBottom: 15 }}>
                                        {/**  <TouchableOpacity
                                            style={{ flexDirection: 'row', borderTopWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: '#0c1e3b', borderRadius: 10, width: 120, height: 50, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', backgroundColor: '#0c1e3b', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}
                                        //onPress={() => setUserName(writingUsername)}
                                        >
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10, color: '#e9c860' }}>Add</Text>
                                            <MaterialIcons name='casino' style={{ color: '#e9c860', fontSize: 40 }} />
                    
                                        </TouchableOpacity>
                                      
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', borderTopWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: '#0c1e3b', borderRadius: 10, width: 120, height: 50, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', backgroundColor: '#0c1e3b', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}
                                        //onPress={() => setUserName(writingUsername)}
                                        >
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10, color: '#e9c860' }}>Add</Text>
                                            <FontAwesome5 name='hotel' style={{ color: '#e9c860', fontSize: 30 }} />
                    
                                        </TouchableOpacity> */}
                                    </View>

                                    <View>

                                        <TextInput
                                            placeholderTextColor='#3c5477'
                                            placeholder="Name..."
                                            value={casinoName}
                                            onChangeText={setCasinoName}
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderColor: '#0c1e3b', color: '#0c1e3b', borderRadius: 10, width: 250, height: 40
                                            }}
                                        />

                                        <TextInput
                                            placeholderTextColor='#3c5477'
                                            placeholder="Summa..."
                                            value={summa}
                                            onChangeText={setSumma}
                                            keyboardType="numeric"
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderColor: '#0c1e3b', color: '#0c1e3b', borderRadius: 10, width: 250, height: 40
                                            }}
                                        />

                                        {/**Switch Block */}
                                        <View style={{ flexDirection: 'row' }}>
                                            <Switch
                                                style={{ width: 100, borderWidth: 2, borderColor: '#0c1e3b', borderRadius: 15, width: 52 }}
                                                trackColor={{ false: '#e9c860', true: '#e9c860' }}
                                                thumbColor={!isEnabled ? 'red' : 'green'}
                                                onValueChange={toggleSwitch}
                                                value={isEnabled}
                                            />
                                            {isEnabled ? (
                                                <Text style={{ color: '#0c1e3b', fontSize: 25, marginLeft: 20 }}>win</Text>
                                            ) : (
                                                <Text style={{ color: '#0c1e3b', fontSize: 25, marginLeft: 20 }}>lost</Text>
                                            )}
                                        </View>

                                        {/**Caledar */}
                                        <View>
                                            <Calendar
                                                style={{
                                                    shadowOffset: { width: 3, height: 4 },
                                                    shadowOpacity: .8,
                                                    elevation: 9,
                                                    borderColor: '#ccc', marginBottom: 15, marginTop: 15, borderRadius: 10
                                                }}
                                                onDayPress={day => {
                                                    setSelectedData(day);//
                                                }}
                                                markingType={'custom'}
                                                markedDates={{
                                                    [selectedData.dateString]: {
                                                        customStyles: { container: { backgroundColor: '#33d33f', elevation: 2 }, text: { color: '#000' } }
                        
                                                    }
                                                }}
                                            />
                                        </View>

                                        <View style={{ alignItems: 'center', width: 300 }}>
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row', borderTopWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: '#0c1e3b', borderRadius: 10, width: 120, height: 40, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', backgroundColor: '#0c1e3b', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}
                                                onPress={() => { handleAddToHistory() }}
                                            >
                                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10, color: '#e9c860' }}>Save</Text>
                                           
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    
                                </View>

                            </View>
                            
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
                                        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>

                                           
                                            
                                            {/**Close Btn */}
                                            <TouchableOpacity
                                                style={{ position: 'absolute', right: 0 }}
                                                onPress={() => { setModalAddHotelsVisible(!modalAddHotelsVisible) }}
                                            >
                                                <Entypo name='circle-with-cross' style={{ color: '#e9c860', fontSize: 33 }} />
                                            </TouchableOpacity>

                                            <View
                                                style={{ position: 'absolute', backgroundColor: '#e9c860', padding: 5, borderRadius: 5 }}
                                            >
                                                <Text style={{ fontWeight: 'bold', color: 'red' }}>Total balabce: {total} $</Text>
                                            </View>

                                            <ScrollView style={{ marginTop: 50 }}>
                                                


                                                {history.map(({ id, data, status, summa, casinoName }) => {
                                                    return (
                                                        <View
                                                            style={{ marginLeft: 20, marginRight: 40, marginBottom: 5, padding: 10, borderRadius: 10, backgroundColor: '#e9c860' }}
                                                            key={id}
                                                        >
                                                            <Text style={{ color: '#0c1e3b' }}>{data.dateString}</Text>
                                                            <Text style={{ fontSize: 20, color: '#0c1e3b' }}>I {status} {summa} $ in the {casinoName}</Text>
                                                        </View>
                                                    )
                                                })}
                                                   
                                            </ScrollView>
                                            

                                        </View>

                                    </View>

                                </View>

                            </Modal>
                            
                            
                        </View>


                    </KeyboardAvoidingView>
                    
                </ScrollView>

            </ImageBackground>
        </View>
    );
};

export default Profile;