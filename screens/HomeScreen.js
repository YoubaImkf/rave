import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  ToastAndroid,
  View,
  Image,
  Pressable,
} from "react-native";
import { ServerService } from "../services/ServerService";
import { styles } from "../styles/HomeStyle";
import { LoadCustomFonts } from "../font.config";

const HomeScreen = ({ navigation }) => {
  const [baseUrl, setBaseUrl] = useState("");
  const [port, setPort] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  /**
   * Lifecycle hook that runs when the component is rendered for the first time.
   * It loads the custom fonts asynchronously and updates the state when the fonts are loaded.
   * @function
   */
  useEffect(() => {
    const loadAsyncData = async () => {
      await LoadCustomFonts();
      setFontsLoaded(true);
    };

    loadAsyncData();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  /**
   * Test the connection to server and navigate to the next page.
   * @async
   */
  const connection = async () => {
    try {
      const isConnected = await ServerService.testConnection(baseUrl, port);

      if (isConnected) {
        ToastAndroid.show("Successfully connected", ToastAndroid.SHORT);
        navigation.navigate("Record");
      } else {
        ToastAndroid.show("Connection Failed", ToastAndroid.SHORT);
      }
    } catch (error) {
      ToastAndroid.show(
        "Error connecting to server:" + error.message,
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/rave_logo.png")}
        />
        <Text style={styles.title}>Connection</Text>
        <Text style={styles.label}>Welcome to rave</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.inputlabel}>Ip adress</Text>
        <TextInput
          style={styles.input}
          value={baseUrl}
          onChangeText={setBaseUrl}
          placeholder="192.168.1.22"
          placeholderTextColor={"#E0DFE0"}
        />
        <View style={styles.separator} />

        <Text style={styles.inputlabel}>Port</Text>
        <TextInput
          style={styles.input}
          value={port}
          onChangeText={setPort}
          placeholder="8000"
          placeholderTextColor={"#E0DFE0"}
        />
        <View style={styles.separator} />
      </View>

      <Pressable style={styles.submit} onPress={connection}>
        <Text style={styles.submitTitle}> CONNECT </Text>
        <Text style={styles.submitlabel}>test connection</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
