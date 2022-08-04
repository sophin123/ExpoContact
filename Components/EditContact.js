import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { IconButton, TextInput, Button } from "react-native-paper";

export default function EditContact({
  item,
  onPressSave,
  onPressCancel,
  visible,
  contactDetails,
  saveData,
  editModalHander,
}) {
  const [newName, setNewName] = useState();
  const [newNumber, setNewNumber] = useState();

  //   console.log(item, "chaging values");

  const saveEditedHandler = (id) => {
    const result = contactDetails.filter((item) => item.id === id);

    if (result) {
      result.map(
        (data) => (
          (data.name = newName),
          data.phoneNumbers.map((data) => (data.number = newNumber))
        )
      );
    }

    saveData(2);
    editModalHander();
    setNewName("");
    setNewNumber("");
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Edit Contact</Text>
            <Text
              style={{
                fontWeight: "bold",
                paddingBottom: 10,
              }}
            >
              {!item ? "No Contact Found" : item.name}
            </Text>

            <TextInput
              label="Username"
              type="flat"
              style={styles.textInputStyle}
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              label="Phone Number"
              type="flat"
              style={styles.textInputStyle}
              value={newNumber}
              onChangeText={setNewNumber}
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
                onPress={() => saveEditedHandler(item.id)}
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
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  textInputStyle: {
    width: "100%",
  },
});
