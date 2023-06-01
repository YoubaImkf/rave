import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Implémentez la logique pour démarrer et arrêter l'enregistrement,
// ainsi que pour jouer et mettre en pause l'enregistrement.

export const AudioLogic = {
  getPermission: async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      console.log("Permission Granted: " + permission.granted);
      return permission.granted;
    } catch (error) {
      console.error("Failed to get recording permission", error);
      return false;
    }
  },

  startRecording: async () => {
    try {
      const granted = await AudioLogic.getPermission();
      if (!granted) {
        console.log("Recording permission not granted");
        return;
      }

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      return recording;
    } catch (error) {
      console.error("Failed to start recording", error);
      return null;
    }
  },

  stopRecording: async (recording) => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        return recording.getURI();
      }
      return null;
    } catch (error) {
      console.error("Failed to stop recording", error);
      return null;
    }
  },

  playAudio: async (uri) => {
    try {
      soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri });
      await soundObject.playAsync();
    } catch (error) {
      console.error("An error occurred while playing the audio.", error);
    }
  },

  pauseAudio: async () => {
    try {
      if (soundObject) {
        await soundObject.pauseAsync();
      }
    } catch (error) {
      console.error("An error occurred while pausing the audio.", error);
    }
  },

  saveAudio: async (recordingUri) => {
    try {
      const fileName = `recording-${Date.now()}.caf`;
      const directory = FileSystem.documentDirectory + "recordings/";
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      const newPath = directory + fileName;
      await FileSystem.moveAsync({
        from: recordingUri,
        to: newPath,
      });

      // save audio in cache
      const audioDetails = { uri: newPath, fileName };
      const savedAudios = await AsyncStorage.getItem("audioList");
      const updatedAudios = savedAudios ? JSON.parse(savedAudios) : [];
      updatedAudios.push(audioDetails);
      await AsyncStorage.setItem("audioList", JSON.stringify(updatedAudios));

      return newPath;
    } catch (error) {
      console.error("Failed to save audio", error);
      return null;
    }
  },

  deleteAudio: async (fileName) => {
    try {
      const filePath = FileSystem.documentDirectory + "recordings/" + fileName;
      const fileInfo = await FileSystem.getInfoAsync(filePath);

      if (fileInfo.exists) {
        await FileSystem.deleteAsync(filePath);
        console.log(
          `The audio file ${fileName} has been deleted successfully.`
        );

        const savedAudios = await AsyncStorage.getItem("audioList");
        let updatedAudios = savedAudios ? JSON.parse(savedAudios) : [];

        updatedAudios = updatedAudios.filter(
          (audio) => audio.fileName !== fileName
        );
        await AsyncStorage.setItem("audioList", JSON.stringify(updatedAudios));

        return fileName;
      } else {
        console.log(`The audio file ${fileName} does not exist.`);
        return null;
      }
    } catch (error) {
      console.error(
        `An error occurred while deleting the audio file ${fileName}.`,
        error
      );
      return null;
    }
  },

  getSavedAudio: async () => {
    try {
      const savedAudios = await AsyncStorage.getItem("audioList");
      // if true = JSON.parse(savedAudios), else return []
      const audios = savedAudios ? JSON.parse(savedAudios) : [];

      return audios;
    } catch (error) {
      console.error("Failed to get saved audio", error);
      return [];
    }
  },

  clearAllData: async () => {
    try {
      // Supprimer tous les fichiers audio du répertoire des enregistrements
      const directory = FileSystem.documentDirectory + "recordings/";
      await FileSystem.deleteAsync(directory, { idempotent: true });

      // Supprimer les données du cache
      await AsyncStorage.removeItem("audioList");

      console.log("All data has been cleared successfully.");
    } catch (error) {
      console.error("Failed to clear all data.", error);
    }
  },
};
