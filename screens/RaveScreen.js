import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from "react-native";
import { TabView, SceneMap, TabBar  } from "react-native-tab-view";
import { Octicons } from '@expo/vector-icons';
import { AudioLogic } from "../utils/AudioLogic";
import { useSelector, useDispatch } from "react-redux";
import {
  setSavedAudios,
} from "../slices/recordSlice";
import { ServerService } from "../services/ServerService";
import { Audio } from "expo-av";
import * as FileSystem from 'expo-file-system';

const RaveScreen = () => {
  const savedAudios = useSelector((state) => state.record.savedAudios);
  const [ transformedAudioPath, setTransformedAudioPath] = useState("");
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [routes] = useState([
    { key: "recorded", title: "Recorded" },
    { key: "default", title: "Default" },
    { key: "phone", title: "Phone" },
  ]);

  const dispatch = useDispatch();

  // a refractorer
  const _retrieveSavedAudios = async () => {
    try {
      const audios = await AudioLogic.getSavedAudio();
      dispatch(setSavedAudios(audios));
    } catch (error) {
      console.error("Failed to retrieve audios", error);
    }
  };

  const handleSendClip = async () => {
    setLoading(true);
    const file = selectedAudio;
    try {
      await ServerService.uploadAudio(file);
      const fileUri = await handleDownloadAndSaveAudio();
      setTransformedAudioPath(fileUri);
      setLoading(false);
    } catch (error) {
      console.error('Failed to send clip:', error);
      setLoading(false);
    }
  };

  const handleDownloadAndSaveAudio = async () => {
    try {
      const fileUri = await ServerService.downloadAndSaveAudio();
      return fileUri;
    } catch (error) {
      console.error('Failed to download and save audio:', error);
      throw error;
    }
  };

  
  // a refractorer
  const handlePlayOriginal = (audio) => {
    if (audio) {
      const audioUri = audio;
      if (audioUri) {
        AudioLogic.playAudio(audioUri)
          .then(() => {
            console.log("Audio started:", audio);
            ToastAndroid.show("Audio is playing", ToastAndroid.SHORT);
          })
          .catch((error) => {
            console.error("Failed to play audio:", error);
          });
      } else {
        console.log("Audio URI not found for the selected audio.");
      }
    } else {
      console.log("No audio selected.");
      ToastAndroid.show("No audio selected.", ToastAndroid.SHORT);

    }
  };
  
  const handlePlayTransformed = async () => {
    try {
      await AudioLogic.playAudio(transformedAudioPath);
    } catch (error) {
      console.error('An error occurred while playing the transformed audio.', error);
    }
  };

  useEffect(() => {
    _retrieveSavedAudios();
  }, []);

  
  const RecordedSounds = () => (
    <View style={styles.audioList}>
      {savedAudios.map((audio, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedAudio(audio.uri)}>
          <Text style={styles.file}>{audio.fileName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  

  
  const DefaultSound = () => (
    <View>
      <Text>DefaultSound ? pas compris </Text>
    </View>
  );
  
  const PhoneSounds = () => (
    <View>
      <Text>Phone Sounds</Text>
    </View>
  );

  const renderScene = SceneMap({
    recorded: RecordedSounds,
    default: DefaultSound,
    phone: PhoneSounds,
  });


  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image style={styles.tinyLogo} source={require("../assets/jsrave_logo.png")} />
        <Text style={styles.title}>Rave</Text>
        <Text style={styles.label}>Stamp transfer</Text>
      </View>

      <TabView
        style={styles.tabView}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 300 }}
        renderTabBar={renderTabBar}
      />
      {/*loading asset appear if true */}
      {loading && <ActivityIndicator size="large" color="#676B67" />}

      <View style={styles.playButtonsContainer}>

        <TouchableOpacity style={styles.button} 
         onPress={() => handlePlayOriginal(selectedAudio)}>
          <Text style={styles.textButton} >Play original</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.transferButton} onPress={handleSendClip}>
          <Octicons name="upload" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
        title="Play Transformed" onPress={handlePlayTransformed}>
          <Text style={styles.textButton} >Play output</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 30,
    backgroundColor: "#8BD0FC",
  },
  tinyLogo: {
    width: 84,
    height: 30,
    alignSelf: "flex-start",
    marginTop: 40,
    marginBottom: 67,
  },
  titleContainer: {
    marginBottom: 45,
  },
  title: {
    fontSize: 47,
    fontWeight: "900",
    fontFamily: "Montserrat-Bold",
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  tabView: {
    // backgroundColor: 'white',
  },
  tabBar: {
    backgroundColor:'#FCE76C', 
    borderRadius:20,
    width: 340,
    height: 50,
  },
  tabIndicator: {
    backgroundColor: '#FFFFFF',
  },
  tabLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
  },
  audioList: {
    alignItems: "center",
  },
  file: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding:10,
    margin: 5,
    minWidth:215,
    minHeight: 20,
  },
  playButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
  },
  transferButton: {
    width: 82,
    height: 72,
    backgroundColor: 'white',
    borderRadius: 45,
    alignItems: "center",
    justifyContent: 'center',
    elevation: 4,
    shadowColor: "#000000",
  },
  button:{
    backgroundColor: 'white',
    alignItems: "center",
    justifyContent: 'center',
    height: 60,
    width: 124 ,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000000",
  },
  textButton: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 13,
    
  }
});

export default RaveScreen;
