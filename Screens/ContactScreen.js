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
  RefreshControl,
} from "react-native";

import { Button } from "react-native-paper";
import * as Contacts from "expo-contacts";
import Search from "../Components/Search";
import ListComponent from "../Components/ListComponent";
import AddContactScreen from "./AddContactScreen";
import { width } from "../Styles/style";

import AsyncStorage from "@react-native-async-storage/async-storage";

let STORAGE_KEY = "@user_input";

export default function ContactScreen() {
  const [contactDetails, setContactDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [storeValue, setStoreValue] = useState("");

  // const [refresh, setRefresh] = useState(false);

  console.log(contactDetails, "Contact Details");

  useEffect(() => {
    readData();
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
    setModalVisible(!modalVisible);
  };

  const updateData = () => {
    setModalVisible(!modalVisible);
    saveData();
  };

  // const onRefresh = React.useCallback(() => {
  //   setRefresh(true);
  //   let promise = new Promise((resolve) => setTimeout(resolve, 2000));
  //   promise.then(() => setRefresh(false));
  // }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contactDetails));
      // alert("Data successfully saved");
    } catch (e) {
      alert("Faled to save the data");
    }
  };

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);

      if (value !== null) {
        setContactDetails(JSON.parse(value));
      }
    } catch (e) {
      alert("Failed to fetch the data from storage");
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Data is being reset");
    } catch (e) {
      alert("Failed to clear data");
    }
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
          <AddContactScreen
            updateData={() => updateData()}
            contactDetails={contactDetails}
          />
          <Button
            icon={require("../assets/close.png")}
            onPress={() => setModalVisible(!modalVisible)}
            style={{ position: "absolute", bottom: 20, left: width / 2.3 }}
          />
        </Modal>
      </View>
      <Search />
      <FlatList
        keyExtractor={(item) => item.id}
        style={styles.flatListStyle}
        data={contactDetails}
        // refreshControl={
        //   <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        // }
        renderItem={({ item }) => (
          <ListComponent
            key={item.id}
            username={item.firstName}
            phoneNumber={item.phoneNumbers.map((data) => {
              return data.number;
            })}
          />
        )}
      />

      <Button onPress={() => buttonHandler()}>Add New Contact</Button>
      <Button onPress={() => saveData()}>Save Data</Button>
      <Button onPress={() => readData()}>Read Data</Button>
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
