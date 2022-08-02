import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
  Pressable,
} from "react-native";

import { Button } from "react-native-paper";
import * as Contacts from "expo-contacts";
import Search from "../Components/Search";
import ListComponent from "../Components/ListComponent";
import AddContactScreen from "./AddContactScreen";
import { width } from "../Styles/style";

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
          <AddContactScreen />
          <Button
            icon={require("../assets/close.png")}
            onPress={() => setModalVisible(!modalVisible)}
            style={{ position: "absolute", bottom: 20, left: width / 2.3 }}
          />
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

      <Button onPress={() => buttonHandler()}>Add New Contact</Button>
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
