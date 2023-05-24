import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    padding: 30,
    backgroundColor: "#8BD0FC",
  },
  tinyLogo:{
    width: 165,
    height: 79,
    alignSelf: 'center',
    marginBottom: 67,
  },
  titleContainer: {
    marginBottom: 45
  },
  title: {
    fontSize: 47,
    fontWeight: '900',
  },
  label: {
    fontSize: 16,
  },
  form: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingTop: 37,
    paddingBottom: 35,
    borderRadius:10,
    elevation: 5,
    shadowColor: '#000000',
  },
  inputlabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  input: {
    fontSize: 25,
    paddingVertical: 10,
    color: '#E0DFE0',
    fontWeight: '700',
  },
  submit: {
    marginTop: -20,
    alignSelf: 'center',
    borderRadius: 20,
    width: 270,
    height: 50,
    color: 'black',
    backgroundColor: '#FCE76C',
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000000',
  },
  submitTitle: {
    fontWeight: '900',
    fontSize: 20,
  },
  submitlabel: {
    fontSize: 10,
  },
  separator: {
    width: 270,
    backgroundColor: '#E0DFE0',
    opacity: 0.5,
    height: 1,
    marginBottom: 10,
  }
});
