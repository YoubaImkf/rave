import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
      marginTop: 40,
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
      width: 350,
      height: 300,
      maxWidth: 500,
      maxHeight: 150,
      alignSelf: 'center',
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
      marginTop: 80,
      marginBottom: 0,
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      height: 60,
      width: 298,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000000',
      alignSelf: 'center',
    },
    button: {
  
    },
});