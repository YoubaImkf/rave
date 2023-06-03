import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AudioLogic = {
  /**
   * Gets the recording permission from the user.
   * @async
   * @returns {Promise<boolean>} A promise resolved with the granted permission status.
   */
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

  /**
   * Starts recording audio.
   * @async
   * @returns {Promise<Audio.Recording|null>} A promise resolved with the recording object or null if failed.
   */
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

  /**
   * Stops recording audio.
   * @async
   * @param {Audio.Recording} recording - The recording object to stop.
   * @returns {Promise<string|null>} A promise resolved with the recording URI or null if failed.
   */
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

  /**
   * Plays audio from a given URI.
   * @async
   * @param {string} uri - The URI of the audio to play.
   * @returns {Promise<void>} A promise resolved when audio playback is completed or an error occurs.
   */
  playAudio: async (uri) => {
    try {
      soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri });
      await soundObject.playAsync();
    } catch (error) {
      console.error("An error occurred while playing the audio.", error);
    }
  },

  /**
   * Pauses audio playback.
   * @async
   * @returns {Promise<void>} A promise resolved when audio playback is paused or an error occurs.
   */
  pauseAudio: async () => {
    try {
      if (soundObject) {
        await soundObject.pauseAsync();
      }
    } catch (error) {
      console.error("An error occurred while pausing the audio.", error);
    }
  },

  /**
   * Saves the recorded audio.
   * @async
   * @param {string} recordingUri - The URI of the recorded audio to save.
   * @returns {Promise<string|null>} A promise resolved with the new path of the saved audio file or null if failed.
   */
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

  /**
   * Deletes the audio file with the given fileName.
   * @async
   * @param {string} fileName - The name of the audio file to delete.
   * @returns {Promise<string|null>} A promise resolved with the deleted file name or null if failed.
   */
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

  /**
   * Gets the list of saved audio files.
   * @async
   * @returns {Promise<Array<Object>>} A promise resolved with the array of saved audio files.
   */
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

  /**
   * Clears all the recorded audio files and cache data.
   * @async
   * @returns {Promise<void>} A promise resolved when all data is cleared or an error occurs.
   */
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
