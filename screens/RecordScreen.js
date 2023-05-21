import React, { useState } from "react";
import {Text, View, Button, StyleSheet} from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
const RecordScreen = () => {

    // RECORDING PART
    const [recording, setRecording] = React.useState();

    async function startRecording() {
        try {
          console.log('Requesting permissions..');
          await Audio.requestPermissionsAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
    
          console.log('Starting recording..');
          const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecording(recording);
          console.log('Recording started');
        } catch (err) {
          console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });

        const uri = recording.getURI();
        // Create a file name for the recording
        const fileName = `recording-${Date.now()}.caf`;
        const directory = FileSystem.documentDirectory + 'recordings/';
        // Move the recording to the new directory with the new file name
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
        await FileSystem.moveAsync({
          from: uri,
          to: directory + fileName
        });
        // reset state
        setRecording(null);
        console.log('Recording stopped and stored at',  directory + fileName);
      }
    
    // PLAYING SOUND
    // const [sound, setSound] = React.useState();
    
    // async function playSound() {
    //     console.log('Loading Sound');
    //     const { sound } = await Audio.Sound.createAsync( require('./assets/Hello.mp3')
    //     );
    //     setSound(sound);
    
    //     console.log('Playing Sound');
    //     await sound.playAsync();
    //   }
    
    //   React.useEffect(() => {
    //     return sound
    //       ? () => {
    //           console.log('Unloading Sound');
    //           sound.unloadAsync();
    //         }
    //       : undefined;
    //   }, [sound]);



    return (
        <View>
            <Text>RecordScreen</Text>
            <Button
                title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}
            />

            {/* <Button title="Play Sound" onPress={playSound} /> */}

        </View>
    );
};

export default RecordScreen;