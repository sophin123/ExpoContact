import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import * as Contacts from "expo-contacts";

export default function ContactScreen() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact, "Contacts");
        }
      }
    })();
  }, []);

  const buttonHandler = () => {
    console.log("Data is clicked");
  };

  return (
    <View style={styles.container}>
      <Text>ContactScreen</Text>
      <Button title="Button" onPress={() => buttonHandler()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
