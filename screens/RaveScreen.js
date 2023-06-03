import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const RaveScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.tinyLogo}
          source={require("../assets/jsrave_logo.png")}
        />
        <Text style={styles.title}>Rave</Text>
        <Text style={styles.label}>Stamp transfer</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    padding: 30,
    backgroundColor: "#8BD0FC",
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
});

export default RaveScreen;
