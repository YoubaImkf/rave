import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 30,
    backgroundColor: "#FCE76C",
  },
  tinyLogo: {
    width: 84,
    height: 30,
    alignSelf: "flex-start",
    marginTop: 40,
    marginBottom: 67,
  },
  titleContainer: {
    marginBottom: 45,
  },
  title: {
    fontSize: 47,
    fontWeight: "900",
    fontFamily: "Montserrat-Bold",
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  audioList: {
    backgroundColor: 'white',
    paddingHorizontal: 18,
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius:10,
    marginBottom:30,
  },
  file: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fileName: {
    borderBottomColor: "#585858",
    borderBottomWidth: 0.5,
    marginBottom: 20,
    fontFamily: "Montserrat-Regular",
    flex: 1,
  },
  iconContainer: {
    marginBottom: 20,
    marginLeft: 10,
  },
  recordContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 40,
    height: 40,
    backgroundColor: "#E71919",
  },
  recordButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 64,
    backgroundColor: "#FFFFFF",
    marginBottom: 35,
    elevation: 5,
    shadowColor: "#000000",
    position: "relative",
  },
  recordNav: {
    alignItems: "center",
    justifyContent: "space-around",
    position: "absolute",
    marginBottom: 0,
    bottom: 40,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    height: 60,
    width: 298,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000000",
    alignSelf: "center",
  },
});
