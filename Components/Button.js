import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Button({ text, onPress }) {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress()}>
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
