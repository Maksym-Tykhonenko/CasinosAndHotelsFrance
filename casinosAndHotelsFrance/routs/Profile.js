import React,{useState} from "react";
import {Switch, View, Text,TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, Image } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



const Profile = () => {

    const [writingUsername, setWritingUsername] = useState('');
    const [userName, setUserName] = useState('')

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

                        <View>

                            {/**Add PhotoBlock */}
                            <View style={{ position: 'relative', width: 150, marginBottom: 20 }}>
                                <Image
                                    style={{ width: 150, height: 150 }}
                                    source={require('../accets/user.png')}
                                />
                                <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0, backgroundColor: '#fff', borderRadius: 150 }}>
                                    <Entypo name='circle-with-plus' style={{ color: '#3157c9', fontSize: 35 }} />
                                </TouchableOpacity>
                                
                            </View>

                            {/**Content withaut photo block */}
                            <View style={{ marginBottom: 15 }}>

                                {/** NAME block*/}
                                <View style={{ flex: 1, backgroundColor: 'rgba(233, 200, 96, 0.8)', borderRadius: 15, padding: 10, shadowColor: '#e9c860', shadowOffset: { width: 2, height: 1, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}>
                                    
                                    {!userName ? (
                                        <View>
                                            <Text style={{ marginLeft: 5, marginBottom: 10, fontWeight: 'bold', fontSize: 25, color: '#000' }}>Add name :</Text>
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
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#000' }}>{userName.toLocaleUpperCase()}</Text>
                                        </View>
                                    )}
                                    
                                    {/** Add plases where i'm been block*/}
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 250, marginBottom: 15 }}>
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', borderTopWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: '#0c1e3b', borderRadius: 10, width: 120, height: 50, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', backgroundColor: '#e9c860', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}
                                        //onPress={() => setUserName(writingUsername)}
                                        >
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Add</Text>
                                            <MaterialIcons name='casino' style={{ color: '#0c1e3b', fontSize: 40 }} />
                    
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity
                                            style={{ flexDirection: 'row', borderTopWidth: 2, borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, borderColor: '#0c1e3b', borderRadius: 10, width: 120, height: 50, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', backgroundColor: '#e9c860', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.5, shadowRadius: 3.84, }}
                                        //onPress={() => setUserName(writingUsername)}
                                        >
                                            <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 10 }}>Add</Text>
                                            <FontAwesome5 name='hotel' style={{ color: '#0c1e3b', fontSize: 30 }} />
                    
                                        </TouchableOpacity>
                                    </View>

                                    <View>

                                        <TextInput
                                            placeholderTextColor='#3c5477'
                                            placeholder="Casino name..."
                                            //value={hotelAddress}
                                            //onChangeText={setHotelAddress}
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
                                            //value={hotelAddress}
                                            //onChangeText={setHotelAddress}
                                            style={{
                                                shadowOffset: { width: 3, height: 4 },
                                                shadowOpacity: .8,
                                                elevation: 9,
                                                marginBottom: 15, paddingLeft: 10, fontSize: 20, borderWidth: 2, borderColor: '#0c1e3b', color: '#0c1e3b', borderRadius: 10, width: 250, height: 40
                                            }}
                                        />

                                        <Switch
                                            style={{ width: 100, borderWidth: 2, borderColor: '#0c1e3b', borderRadius: 15, width: 52 }}
                                            trackColor={{ false: '#81b0ff', true: '#767577' }}
                                            thumbColor={'#f5dd4b'}
                                            
                                            //onValueChange={toggleSwitch}
                                            //value={isEnabled}
                                        />

                                    </View>
                                    
                                </View>


                               
                            </View>
                            
                            
                            
                        </View>


                    </KeyboardAvoidingView>
                    
                </ScrollView>

            </ImageBackground>
        </View>
    );
};

export default Profile;