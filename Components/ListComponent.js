import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { width } from "../Styles/style";

export default function ListComponent({ username, phoneNumber }) {
  return (
    <View style={styles.listContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/user.png")}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{username}</Text>
        <Text style={styles.subText}>{phoneNumber}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: width,
    flexDirection: "row",
    marginTop: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 0.6,
    paddingBottom: 10,
  },
  imageContainer: {
    paddingLeft: 10,
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  subText: {
    color: "grey",
    fontSize: 14,
  },
  textContainer: {
    marginLeft: 10,
  },
});
