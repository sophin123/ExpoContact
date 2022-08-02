import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
} from "react-native";

import * as Contacts from "expo-contacts";
import Search from "../Components/Search";
import ListComponent from "../Components/ListComponent";

export default function ContactScreen() {
  const [contactDetails, setContactDetails] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContactDetails(data);
        }
      }
    })();
  }, []);

  const buttonHandler = () => {
    console.log("Data is clicked");
    console.log(contactDetails);
  };

  return (
    <View style={styles.container}>
      <Search />

      <FlatList
        style={styles.flatListStyle}
        data={contactDetails}
        renderItem={({ item }) => (
          <ListComponent
            username={item.name}
            phoneNumber={item.phoneNumbers.map((data) => {
              return data.number;
            })}
          />
        )}
      />

      <Button onPress={() => buttonHandler()} title="Button" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  flatListStyle: {
    padding: 10,
  },
});
