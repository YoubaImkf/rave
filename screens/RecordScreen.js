import { Text, TouchableOpacity, View, StyleSheet, FlatList, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AudioLogic } from '../utils/AudioLogic';




const RecordScreen = ({ navigation }) => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [savedAudios, setSavedAudios] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastRecordUri, setLastRecordUri] = useState('')

  const handleRecordingToggle = async () => {
    if (isRecording) {
      console.log('Pause');
      await handleStopRecording();
    } else {
      console.log('Start');
      await handleStartRecording();
    }
  };

  const handleStartRecording = async () =>{
    try {
      const newRecording  = await AudioLogic.startRecording();
      setRecording(newRecording);
      setIsRecording(true);
    } catch(error) {
      console.error('Failed to start recording 2', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      if (recording) {
        const recordingUri  = await AudioLogic.stopRecording(recording);
        console.log('Recording stopped. URI:', recordingUri);
        setRecording(null);
        setIsRecording(false);
        setLastRecordUri(recordingUri);
      }
    } catch(error) {
      console.error('Failed to stop recording', error);
    }
  };

  const saveRecording = async () => {
    try {
      const savedRecording  = await AudioLogic.saveAudio(lastRecordUri);
      console.log('Recording saved', savedRecording );

    } catch(error) {
      console.error('Failed to save the recording', error);
    }
  };

  const handlePlayAudio = async (recordingUri) => {
    try {
      if (isPlaying) {
        console.log('pause audio ...');
        await AudioLogic.pauseAudio();
        setIsPlaying(false);
      } else {
        console.log('playing audio ...');
        await AudioLogic.playAudio(recordingUri);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Failed to play/pause the audio', error);
    }
  };

  const playSoundBack = async () => {
    try {
      if (lastRecordUri != ''){
        if (isPlaying) {
          console.log('pause current record ...');
          await AudioLogic.pauseAudio();
          setIsPlaying(false);
        } else {
          console.log('playing back record ...');
          await AudioLogic.playAudio(lastRecordUri);
          setIsPlaying(true);
        } 
      }
      else {
        console.log('Please start a record before playing back');
      }
    } catch (error) {
      console.error('Failed to play/pause the current audio', error);
    }
  };
  
  const _retrieveSavedAudios = async () => {
    try {
      const audios = await AudioLogic.getSavedAudio();
      setSavedAudios(audios);
    } catch(error) {
      console.error('Failed to retrieve audios', error);

    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AudioLogic.getPermission();
      _retrieveSavedAudios();
    });

   return () => {
    unsubscribe;
   } ;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/jsrave_logo.png')}
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
            <Text style={styles.file}>{item.fileName}
              <View style={styles.separator}></View>
            </Text>

          </TouchableOpacity>
        )}
      />
      </View>
      <View style={styles.recordContainer}>
        <TouchableOpacity style={styles.recordButton} onPress={handleRecordingToggle}>
          <View style={styles.square}></View>
        </TouchableOpacity>
      </View> 

      <View style={styles.recordNav}>
        <TouchableOpacity style={styles.button} onPress={''}>
          <Text>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={playSoundBack}>
          <Text>play</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={saveRecording}>
          <Text>save</Text>
        </TouchableOpacity>

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    padding: 30,
    backgroundColor: "#FCE76C",
  },
  tinyLogo:{
    width: 84,
    height: 30,
    alignSelf: 'flex-start',
    marginBottom: 67,
  },
  titleContainer: {
    marginBottom: 45
  },
  title: {
    fontSize: 47,
    fontWeight: '900',
    // fontFamily: 'Montserrat-Bold',
  },
  audioList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 40,
    width: 300,
    maxHeight: 150,

  },
  file: {
    marginBottom: 20,
  },
  separator: {
    width: 270,
    backgroundColor: '#000000',
    opacity: 0.5,
    height: 0.5,
    marginBottom: 10,
  },
  recordContainer: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  square:{
    width: 40,
    height: 40,
    backgroundColor: '#E71919',
    borderRadius: 5,
  },
  recordButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 64,
    backgroundColor: '#FFFFFF',
    marginBottom: 35,
    elevation: 5,
    shadowColor: '#000000',
  },
  recordNav: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    height: 60,
    width: 298,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000000',
  },
  button: {

  },
});

export default RecordScreen;