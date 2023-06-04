import axios from "axios";
import * as FileSystem from 'expo-file-system';

export const ServerService = {

    testConnection: async (baseUrl, port) => {
        try{
            const response = await axios.get(`http://${baseUrl}:${port}/`);
            if (response.status === 200)
            {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error('Connection Failed');
        }
    },

    uploadAudio: async (file) => {
        try{
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post('http://192.168.1.22:8000/upload', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                console.log('Transformation successful');
            } else {
                console.error('Failed to transform audio');
            }   
        } catch (error) {
            throw new Error('Connection Failed');
        }

    },

    downloadAndSaveAudio: async () => {
        try {
          const response = await axios.get('http://192.168.1.22:8000/download', {
            responseType: 'blob', // Set the response type to 'blob' for downloading a file
          });
    
          const fileUri = `${FileSystem.documentDirectory}music/transformed_audio.wav`;
          await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}music`, { intermediates: true }); // Create the 'music' directory if it doesn't exist
          await FileSystem.writeAsStringAsync(fileUri, response.data, { encoding: FileSystem.EncodingType.Base64 }); // Save the audio file locally
    
          return fileUri; // Return the file path
        } catch (error) {
          console.error('Failed to download and save audio:', error);
          throw error; // Throw the error to handle it in the calling function
        }
      },

};
