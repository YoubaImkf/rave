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
import { useSelector, useDispatch } from "react-redux";
import {
  setIsRecording,
  setSavedAudios,
  setIsPlaying,
  setLastRecordUri,
} from "../slices/recordSlice";

const RecordScreen = ({ navigation }) => {
  const [recording, setRecording] = useState(null);
  const isRecording = useSelector((state) => state.record.isRecording);
  const savedAudios = useSelector((state) => state.record.savedAudios);
  const isPlaying = useSelector((state) => state.record.isPlaying);
  const lastRecordUri = useSelector((state) => state.record.lastRecordUri);

  const dispatch = useDispatch();

  const handleRecordingToggle = async () => {
    if (isRecording) {
      console.log("Pause");
      await handleStopRecording();
    } else {
      console.log("Start");
      await handleStartRecording();
    }
  };

  /**
   * Handles the start recording button click event.
   * @async
   */
  const handleStartRecording = async () => {
    try {
      const newRecording = await AudioLogic.startRecording();
      setRecording(newRecording);
      dispatch(setIsRecording(true));
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  /**
   * Handles the stop recording button click event.
   * @async
   */
  const handleStopRecording = async () => {
    try {
      if (recording) {
        const recordingUri = await AudioLogic.stopRecording(recording);
        console.log("Recording stopped. URI:", recordingUri);
        setRecording(null);
        dispatch(setIsRecording(false));
        dispatch(setLastRecordUri(recordingUri));
      }
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  /**
   * Saves the recording to the audio list.
   * @async
   */
  const saveRecording = async () => {
    try {
      const savedRecording = await AudioLogic.saveAudio(lastRecordUri);
      console.log("Recording saved", savedRecording);
      await _retrieveSavedAudios();
    } catch (error) {
      console.error("Failed to save the recording", error);
    }
  };

  /**
   * Deletes the last recorded audio.
   * @async
   */
  const deleteLastRecord = async () => {
    try {
      if (lastRecordUri) {
        const fileName = lastRecordUri.substring(
          lastRecordUri.lastIndexOf("/") + 1
        );
        await AudioLogic.deleteAudio(fileName);
        dispatch(setLastRecordUri(""));
        console.log("Deleted audio:", fileName);
      } else {
        console.log("No audio to delete.");
      }
    } catch (error) {
      console.error("Failed to delete the audio", error);
    }
  };

  /**
   * Deletes a specific audio file.
   * @async
   * @param {string} fileName - The name of the audio file to delete.
   */
  const deleteSpecificAudio = async (fileName) => {
    try {
      const deletedFileName = await AudioLogic.deleteAudio(fileName);
  
      if (deletedFileName) {
        const updatedAudios = savedAudios.filter(
          (audio) => audio.fileName !== deletedFileName
        );
        dispatch(setSavedAudios(updatedAudios));
  
        console.log(`The audio ${deletedFileName} has been deleted successfully.`);
      } else {
        console.log(`Failed to delete the audio ${fileName}.`);
      }
    } catch (error) {
      console.error(`Failed to delete the audio ${fileName}.`, error);
    }
  };
  

  /**
   * Handles the play/pause audio button click event.
   * @async
   * @param {string} recordingUri - The URI of the audio to play/pause.
   */
  const handlePlayAudio = async (recordingUri) => {
    try {
      if (isPlaying) {
        console.log("pause audio ...");
        await AudioLogic.pauseAudio();
      } else {
        console.log("playing audio ...");
        await AudioLogic.playAudio(recordingUri);
      }
      dispatch(setIsPlaying(!isPlaying));
    } catch (error) {
      console.error("Failed to play/pause the audio", error);
    }
  };

  /**
   * Plays the recorded audio.
   * @async
   */
  const playSoundBack = async () => {
    try {
      if (lastRecordUri !== "") {
        if (isPlaying) {
          console.log("pause current record ...");
          await AudioLogic.pauseAudio();
        } else {
          console.log("playing back record ...");
          await AudioLogic.playAudio(lastRecordUri);
          dispatch(setIsPlaying(true));
        }
        dispatch(setIsPlaying(false));
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

  /**
   * Retrieves the saved audio files.
   * @async
   */
  const _retrieveSavedAudios = async () => {
    try {
      const audios = await AudioLogic.getSavedAudio();
      dispatch(setSavedAudios(audios));
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

  /**
   * Retrieves the saved audio files.
   * @async
   */
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
