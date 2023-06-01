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
import { Entypo, MaterialIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/RecordStyle";

const RecordScreen = ({ navigation }) => {
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
      await _retrieveSavedAudios();
    } catch (error) {
      console.error("Failed to save the recording", error);
    }
  };

  const deleteLastRecord = async () => {
    try {
      if (lastRecordUri) {
        const fileName = lastRecordUri.substring(
          lastRecordUri.lastIndexOf("/") + 1
        );
        await AudioLogic.deleteAudio(fileName);
        setLastRecordUri("");
        console.log("Deleted audio:", fileName);
      } else {
        console.log("No audio to delete.");
      }
    } catch (error) {
      console.error("Failed to delete the audio", error);
    }
  };

  const deleteSpecificAudio = async (fileName) => {
    try {
      const deletedFileName = await AudioLogic.deleteAudio(fileName);

      if (deletedFileName) {
        setSavedAudios((prevAudios) => {
          const updatedAudios = prevAudios.filter(
            (audio) => audio.fileName !== deletedFileName
          );
          return updatedAudios;
        });

        console.log(
          `The audio ${deletedFileName} has been deleted successfully.`
        );
      } else {
        console.log(`Failed to delete the audio ${fileName}.`);
      }
    } catch (error) {
      console.error(`Failed to delete the audio ${fileName}.`, error);
    }
  };

  const handlePlayAudio = async (recordingUri) => {
    try {
      if (isPlaying) {
        console.log("pause audio ...");
        await AudioLogic.pauseAudio();
      } else {
        console.log("playing audio ...");
        await AudioLogic.playAudio(recordingUri);
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Failed to play/pause the audio", error);
    }
  };

  const playSoundBack = async () => {
    try {
      if (lastRecordUri !== "") {
        if (isPlaying) {
          console.log("pause current record ...");
          await AudioLogic.pauseAudio();
        } else {
          console.log("playing back record ...");
          await AudioLogic.playAudio(lastRecordUri);
          setIsPlaying(true);
        }
        setIsPlaying(false);
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

  // const clearAllData = async () => {
  //   try {
  //     await AudioLogic.clearAllData();
  //     setSavedAudios([]);
  //     console.log("All data has been cleared successfully.");
  //   } catch (error) {
  //     console.error("Failed to clear all data.", error);
  //   }
  // };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      _retrieveSavedAudios();
    });

    return unsubscribe;
  }, [navigation]);

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
              <View style={styles.file}>
                <Text style={styles.fileName}>{item.fileName}</Text>
                <View style={styles.iconContainer}>
                  <Ionicons
                    style={styles.removeIcon}
                    name="remove-circle-outline"
                    size={20}
                    color="#E71919"
                    onPress={() => deleteSpecificAudio(item.fileName)}
                  />
                </View>
              </View>
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
        <TouchableOpacity style={styles.button} onPress={deleteLastRecord}>
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
