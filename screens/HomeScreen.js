import React, { useState } from "react";
import {Button, Text, TextInput, ToastAndroid, View, StyleSheet} from 'react-native';
import { ServerService } from "../services/ServerService";


const HomeScreen = ({navigation}) => {

    const [baseUrl, setBaseUrl] = useState('');
    const [port, setPort] = useState('');

    const connection = async () => {
        try {
          const isConnected = await ServerService.testConnection(baseUrl ,port);
          
          if (isConnected) {
            ToastAndroid.show('Successfully connected', ToastAndroid.SHORT);
            navigation.navigate('Record');
          } else {
            ToastAndroid.show('Connection Failed', ToastAndroid.SHORT);
          }
        } catch (error) {
            ToastAndroid.show('Error connecting to server:' + error.message, ToastAndroid.SHORT);
        }
      };
      

    return (
        <View style={{ flex: 1, backgroundColor: '#8BD0FC',}} >
            <Text>Connection</Text>
            <TextInput style={styles.input}
            value={baseUrl} 
            onChangeText={setBaseUrl}
            placeholder="192.168.1.22"
            />
            <TextInput style={styles.input}
            value={port} 
            onChangeText={setPort}
            placeholder="8000"
            />
            <Button
            title="connection"
            onPress={connection}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

export default HomeScreen;