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
        try {
          const uploadUrl = `http://192.168.1.22:8000/upload`;
          const formData = new FormData();
          formData.append("file", file);
          const uploadResponse = await axios.post(uploadUrl, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          
          if (uploadResponse.status !== 200) {
            throw new Error("Upload Failed");
          }
    
          console.log("Upload successful");
        } catch (error) {
          console.error("Upload Failed:", error);
          throw new Error("Upload Failed");
        }
      },
    
      downloadAndSaveAudio: async () => {
        try {
          const downloadUrl = `http://192.168.1.22:8000/download`;
          const downloadResponse = await axios.get(downloadUrl, {
            responseType: "blob",
          });
          
          if (downloadResponse.status !== 200) {
            throw new Error("Download Failed");
          }
    
          const uri = FileSystem.documentDirectory + "transformed_audio.wav";
          await FileSystem.writeAsStringAsync(uri, downloadResponse.data, {
            encoding: FileSystem.EncodingType.Base64,
          });
    
          console.log("Audio downloaded and saved:", uri);
          return uri;
        } catch (error) {
          console.error("Download and Save Failed:", error);
          throw new Error("Download and Save Failed");
        }
      },

};
