import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";

import { Button, TextInput } from "react-native-paper";
import { width } from "../Styles/style";

import uuid from "react-native-uuid";

export default function AddContactScreen({ updateData, contactDetails }) {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitHandler = () => {
    contactDetails.push({
      contactType: "person",
      id: uuid.v4(),
      name: firstName + " " + secondName,
      phoneNumbers: [
        {
          id: uuid.v4(),
          number: phoneNumber,
        },
      ],
    });
    updateData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
          New Contact
        </Text>
        <View style={styles.firstNameContainer}>
          <TextContainer text="First Name" />
          <TextInputContainer
            onChangeText={(e) => setFirstName(e)}
            value={firstName}
            placeholder="FirstName"
          />
        </View>

        <View style={styles.firstNameContainer}>
          <TextContainer text="Last Name" />
          <TextInputContainer
            onChangeText={(e) => setSecondName(e)}
            value={secondName}
            placeholder="LastName"
          />
        </View>

        <View style={styles.firstNameContainer}>
          <TextContainer text="Phone Number" />
          <TextInputContainer
            onChangeText={(e) => setPhoneNumber(e)}
            value={phoneNumber}
            placeholder="Phone Number"
          />
        </View>

        <View style={{ padding: 10 }}>
          <Button mode="contained" onPress={() => submitHandler()}>
            Add
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

function TextInputContainer({ placeholder, onChangeText, value }) {
  return (
    <TextInput
      style={{
        width: width / 2,
      }}
      label={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
}

function TextContainer({ text }) {
  return (
    <Text
      style={{
        alignSelf: "center",
        fontSize: 20,
        paddingLeft: 5,
      }}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  formContainer: {
    marginTop: 20,
    width: width,
    paddingRight: 20,
  },
  firstNameContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
});
