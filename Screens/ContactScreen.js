import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
  Pressable,
} from "react-native";

import * as Contacts from "expo-contacts";
import Search from "../Components/Search";
import ListComponent from "../Components/ListComponent";

export default function ContactScreen() {
  const [contactDetails, setContactDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Form Closed");
            setModalVisible(!modalVisible);
          }}
        >
          <Text>Hello from modal</Text>
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text>X</Text>
          </Pressable>
        </Modal>
      </View>
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

      <Button onPress={() => buttonHandler()} title="Add New Contact" />
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
