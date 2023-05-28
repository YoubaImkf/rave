import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AudioLogic } from "../utils/AudioLogic";
import { Entypo, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { styles } from "../styles/RecordStyle";

const RecordScreen = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [savedAudios, setSavedAudios] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastRecordUri, setLastRecordUri] = useState("");

  const handleRecordingToggle = async () => {
    if (isRecording) {
      console.log("Pause");
      await handleStopRecording();
    } else {
      console.log("Start");
      await handleStartRecording();
    }
  };

  const handleStartRecording = async () => {
    try {
      const newRecording = await AudioLogic.startRecording();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const handleStopRecording = async () => {
    try {
      if (recording) {
        const recordingUri = await AudioLogic.stopRecording(recording);
        console.log("Recording stopped. URI:", recordingUri);
        setRecording(null);
        setIsRecording(false);
        setLastRecordUri(recordingUri);
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const saveRecording = async () => {
    try {
      const savedRecording = await AudioLogic.saveAudio(lastRecordUri);
      console.log("Recording saved", savedRecording);
    } catch (error) {
      console.error("Failed to save the recording", error);
    }
  };

  const deleteRecord = async () => {
    try {
      const audio = await AudioLogic.deleteAudio(lastRecordUri);
      setLastRecordUri("");
      console.log("Deleted audio :", audio);
    } catch (error) {
      console.error("Failed to delete the audio", error);
    }
  };

  const handlePlayAudio = async (recordingUri) => {
    try {
      if (isPlaying) {
        console.log("pause audio ...");
        await AudioLogic.pauseAudio();
        setIsPlaying(false);
      } else {
        console.log("playing audio ...");
        await AudioLogic.playAudio(recordingUri);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Failed to play/pause the audio", error);
    }
  };

  const playSoundBack = async () => {
    try {
      if (lastRecordUri != "") {
        if (isPlaying) {
          console.log("pause current record ...");
          await AudioLogic.pauseAudio();
          setIsPlaying(false);
        } else {
          console.log("playing back record ...");
          await AudioLogic.playAudio(lastRecordUri);
          setIsPlaying(true);
        }
      } else {
        ToastAndroid.show(
          "Please start a record before playing back",
          ToastAndroid.SHORT
        );
        console.log("Please start a record before playing back");
      }
    } catch (error) {
      console.error("Failed to play/pause the current audio", error);
    }
  };

  const _retrieveSavedAudios = async () => {
    try {
      const audios = await AudioLogic.getSavedAudio();
      setSavedAudios(audios);
    } catch (error) {
      console.error("Failed to retrieve audios", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      _retrieveSavedAudios();
    });

    return () => {
      unsubscribe;
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/jsrave_logo.png")}
        />
        <Text style={styles.title}>Record</Text>
        <Text style={styles.label}>Start recording</Text>
      </View>
      <View style={styles.audioList}>
        <FlatList
          data={savedAudios}
          keyExtractor={(item) => item.fileName}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePlayAudio(item.uri)}>
              <Text style={styles.file}>
                {item.fileName}
                <View style={styles.separator}></View>
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.recordContainer}>
        <TouchableOpacity
          style={styles.recordButton}
          onPress={handleRecordingToggle}
        >
          <View style={styles.square}></View>
        </TouchableOpacity>
      </View>

      <View style={styles.recordNav}>
        <TouchableOpacity style={styles.button} onPress={deleteRecord}>
          <MaterialIcons name="delete-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={playSoundBack}>
          <Entypo name="controller-play" size={34} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={saveRecording}>
          <AntDesign name="download" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordScreen;
