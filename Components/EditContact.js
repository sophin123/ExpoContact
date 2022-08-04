import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { IconButton, TextInput, Button } from "react-native-paper";

export default function EditContact({
  item,
  onPressEdit,
  onPressCancel,
  visible,
}) {
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Contact</Text>

            <TextInput
              label="Username"
              type="flat"
              style={styles.textInputStyle}
              value={item != null ? item.name : "No Username"}
            />
            <TextInput
              label="Phone Number"
              type="flat"
              style={styles.textInputStyle}
              value={
                item != null
                  ? item.phoneNumbers
                      .map((item) => {
                        return item.number;
                      })
                      .toString()
                  : "No PhoneNumber"
              }
            />
            <View
              style={{
                marginTop: 10,

                flexDirection: "row",
              }}
            >
              <Button
                mode="contained"
                style={{ marginRight: 10 }}
                onPress={() => onPressEdit}
              >
                Save
              </Button>
              <Button mode="contained" onPress={onPressCancel}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    height: 250,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    elevation: 5,
    borderColor: "black",
    borderWidth: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  textInputStyle: {
    width: "100%",
  },
});
