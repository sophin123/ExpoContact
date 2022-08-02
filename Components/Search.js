import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { width } from "../Styles/style";
import Button from "./Button";

export default function Search() {
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput placeholder="Search" style={styles.inputText} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  inputText: {
    borderWidth: 2,
    paddingLeft: 10,
    padding: 5,
    borderColor: "grey",
    marginTop: 30,
    borderRadius: 10,
  },
  textInputContainer: {
    width: width,
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: "blue",
  },
});
