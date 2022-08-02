import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { width } from "../Styles/style";

export default function AddContactScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={{ textAlign: "center", fontSize: 20, marginBottom: 20 }}>
          New Contact
        </Text>
        <View style={styles.firstNameContainer}>
          <TextContainer text="First Name" />
          <TextInputContainer placeholder="FirstName" />
        </View>

        <View style={styles.firstNameContainer}>
          <TextContainer text="Last Name" />
          <TextInputContainer placeholder="LastName" />
        </View>

        <View style={styles.firstNameContainer}>
          <TextContainer text="Phone Number" />
          <TextInputContainer placeholder="Phone Number" />
        </View>

        <View style={{ padding: 10 }}>
          <Button mode="contained">Add</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

function TextInputContainer({ placeholder }) {
  return (
    <TextInput
      style={{
        width: width / 2,
      }}
      label={placeholder}
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
