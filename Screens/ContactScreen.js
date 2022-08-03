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

let STORAGE_KEY = "@contacts_details";

export default function ContactScreen() {
  const [contactDetails, setContactDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // const [filterData, setFilterData] = useState(contactDetails);

  // const [refresh, setRefresh] = useState(false);

  // console.log(storeValue, "Store Value");

  useEffect(() => {
    // (async () => {
    //   const { status } = await Contacts.requestPermissionsAsync();
    //   if (status === "granted") {
    //     const { data } = await Contacts.getContactsAsync({
    //       fields: [Contacts.Fields.PhoneNumbers],
    //     });
    //     if (data.length > 0) {
    //       for (let x = 0; x < data.length; x++) {
    //         setContactDetails((oldContacts) => [
    //           ...oldContacts,
    //           Object.values(data)[x],
    //         ]);
    //       }
    //     }
    //   }
    // })();
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
      alert("Contact added successfully");

      console.log(contactDetails, "save details");
    } catch (e) {
      alert("Faled to save the data");
    }
  };

  const readData = async () => {
    // console.log("read was called");
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

  const delHandler = async (id) => {
    const delUser = contactDetails.filter((item) => item.id !== id);
    setContactDetails(delUser);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(delUser));
      alert("User is being deleted");

      console.log(contactDetails, "save details");
    } catch (e) {
      alert("Faled to save the data");
    }

    // console.log(contactDetails, "Contact Details");
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
            firstName={item.firstName}
            lastName={item.lastName}
            phoneNumber={item.phoneNumbers.map((data) => {
              return data.number;
            })}
            onPress={() => delHandler(item.id)}
          />
        )}
      />

      <Button onPress={() => buttonHandler()}>Add New Contact</Button>
      {/* <Button onPress={() => getContactDetails()}>Sync Data</Button> */}
      <Button onPress={() => readData()}>Read Data</Button>
      {/* <Button onPress={() => saveData()}>Save Data</Button> */}
      <Button onPress={() => clearStorage()}>Clear Data</Button>
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
