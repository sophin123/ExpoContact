import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button, IconButton } from "react-native-paper";

import { width } from "../Styles/style";

export default function ListComponent({
  personName,
  phoneNumber,
  onPressDel,
  onPressEdit,
}) {
  return (
    <View style={styles.listContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/user.png")}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>{personName}</Text>
        <Text style={styles.subText}>{phoneNumber}</Text>
      </View>
      <View style={styles.deleteIconStyle}>
        <TouchableOpacity onPress={onPressDel}>
          <IconButton icon="delete" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.editIconStyle}>
        <TouchableOpacity onPress={onPressEdit}>
          <Button icon={require("../assets/edit.png")} size={20} />
        </TouchableOpacity>
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
  deleteIconStyle: {
    position: "absolute",
    right: 20,
  },
  editIconStyle: {
    position: "absolute",
    right: 40,
    top: 5,
  },
});
