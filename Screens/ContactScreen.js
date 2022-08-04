import React, { useEffect, useRef, useState } from "react";
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
  ToastAndroid,
  Animated,
} from "react-native";

import { Button, IconButton, ToggleButton } from "react-native-paper";
import * as Contacts from "expo-contacts";
import Search from "../Components/Search";
import ListComponent from "../Components/ListComponent";
import AddContactScreen from "./AddContactScreen";
import { width } from "../Styles/style";

import * as FileSystem from "expo-file-system";

import AsyncStorage from "@react-native-async-storage/async-storage";
import EditContact from "../Components/EditContact";
import * as DocumentPicker from "expo-document-picker";

let STORAGE_KEY = "@contacts_details";

const { StorageAccessFramework } = FileSystem;

export default function ContactScreen() {
  useEffect(() => {
    readData();
  }, []);

  const [contactDetails, setContactDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [sendselectedEditData, setSendEditData] = useState([]);

  const [editModalView, setEditModalView] = useState(false);
  const [optionModalView, setOptionModalView] = useState(false);
  const [selectedEditData, setselectedEditData] = useState();

  const [newUserName, setNewUserName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  // const [filterData, setFilterData] = useState(contactDetails);

  // const [refresh, setRefresh] = useState(false);

  // console.log(storeValue, "Store Value");

  // console.log(newUserName, newPhoneNumber, "Contact Details");

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

  const saveData = async (id) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contactDetails));
      if (id === 2) {
        alert("Edited Succesfully");
      } else if (id === 3) {
        ToastAndroid.show("Contact Saved Successfully", ToastAndroid.SHORT);
      } else if (id === 4) {
        ToastAndroid.show("List Sorted", ToastAndroid.SHORT);
      } else {
        alert("Contact added successfully");
      }

      // console.log(contactDetails, "save details");
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

  const delHandler = async (id) => {
    const delUser = contactDetails.filter((item) => item.id !== id);
    setContactDetails(delUser);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(delUser));
      alert("User is being deleted");
    } catch (e) {
      alert("Faled to save the data");
    }
  };

  const editHandler = (id) => {
    setEditModalView(!editModalView);
    const result = contactDetails.filter((item) => item.id === id);

    setselectedEditData(Object.values(result)[0]);
  };

  const renderItem = ({ item }) => {
    if (searchText === "") {
      return (
        <ListComponent
          key={item.id}
          personName={item.name}
          phoneNumber={item.phoneNumbers.map((data) => {
            return data.number;
          })}
          onPressDel={() => delHandler(item.id)}
          onPressEdit={() => editHandler(item.id)}
        />
      );
    }

    if (
      item.name
        .toUpperCase()
        .includes(searchText.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return (
        <ListComponent
          key={item.id}
          personName={item.name}
          phoneNumber={item.phoneNumbers.map((data) => {
            data.number;
          })}
          onPressDel={() => delHandler(item.id)}
          onPressEdit={() => editHandler(item.id)}
        />
      );
    }
  };

  const exportFile = async () => {
    const permission =
      await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permission.granted) {
      let directoryUri = permission.directoryUri;
      let data = JSON.stringify(contactDetails);

      await StorageAccessFramework.createFileAsync(
        directoryUri,
        "TestingFileName",
        "application/json"
      )
        .then(async (fileUri) => {
          await FileSystem.writeAsStringAsync(fileUri, data, {
            encoding: FileSystem.EncodingType.UTF8,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Allow permission to save");
    }
  };

  const importFile = async () => {
    const result = await DocumentPicker.getDocumentAsync();

    if (result.type === "success") {
      if (!result.name.includes("TestingFileName.json")) {
        ToastAndroid.show(
          "You have selected TestingFileName.json",
          ToastAndroid.SHORT
        );
        return;
      } else {
        ToastAndroid.show(
          `You have picked the file : ${result.name}`,
          ToastAndroid.SHORT
        );
      }

      const { uri } = result;
      if (uri) {
        try {
          const jsonContacts = await FileSystem.readAsStringAsync(uri);
          const parsedContacts = JSON.parse(jsonContacts);

          const ExistingID = [];

          contactDetails.map((data) => {
            const { id } = data;
            ExistingID.push(id);
          });

          // const newContacts = [];

          parsedContacts.map((data) => {
            const { id } = data;
            const exist = ExistingID.find((currentID) => currentID === id);

            if (!exist) {
              setContactDetails((prev) => [...prev, data]);
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const syncData = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      try {
        const ExistingID = [];

        contactDetails.map((data) => {
          const { id } = data;
          ExistingID.push(id);
        });

        // console.log(ExistingID, "Existing ID");

        // data.map((data) => {
        //   const { id } = data;
        //   const exist = ExistingID.find((currentID) => currentID === id);

        //   if (!exist) {
        //     setContactDetails((prev) => [...prev, data[0]]);
        //   }
        // });
      } catch (e) {
        console.log(e);
      }

      const newContacts = [];

      // console.log(contactDetails);
      if (data.length > 0) {
        for (let x = 0; x < 2; x++) {
          newContacts.push(Object.values(data)[x]);
        }
      }

      newContacts.map((data) => {
        setContactDetails((prev) => [...prev, data]);
      });
    }
  };
  // console.log(contactDetails);

  const sortHandler = () => {
    contactDetails.sort((a, b) => a.name.localeCompare(b.name));
    saveData(4);
    setOptionModalView(!optionModalView);
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
            optionModalView={optionModalView}
            setOptionModalView={setOptionModalView}
          />
          <Button
            icon={require("../assets/close.png")}
            onPress={() => setModalVisible(!modalVisible)}
            style={{ position: "absolute", bottom: 20, left: width / 2.3 }}
          />
        </Modal>
      </View>
      <Search searchText={setSearchText} />
      <FlatList
        keyExtractor={(item) => item.id}
        style={styles.flatListStyle}
        data={contactDetails}
        // refreshControl={
        //   <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        // }
        renderItem={renderItem}
      />
      <EditContact
        visible={editModalView}
        onPressCancel={() => setEditModalView(!editModalView)}
        item={selectedEditData}
        contactDetails={contactDetails}
        saveData={(id) => saveData(id)}
        editModalHander={() => setEditModalView(!editModalView)}
      />

      <IconButton
        icon={require("../assets/arrow.png")}
        size={25}
        onPress={() => setOptionModalView(!optionModalView)}
      />

      <View>
        <Modal
          animationType="slide"
          visible={optionModalView}
          transparent={true}
          onRequestClose={() => setOptionModalView(!optionModalView)}
        >
          <View style={styles.optionModalView}>
            <IconButton
              style={{
                position: "relative",
                top: 0,
                left: width / 2.3,
                transform: [
                  {
                    rotate: "180deg",
                  },
                ],
              }}
              icon={require("../assets/arrow.png")}
              size={25}
              onPress={() => setOptionModalView(!optionModalView)}
            />
            <Button onPress={() => buttonHandler()}>Add New Contact</Button>
            <Button onPress={() => importFile()}>import Data</Button>
            <Button onPress={() => readData()}>Read Data</Button>
            <Button onPress={() => exportFile()}>Export File Data</Button>
            <Button onPress={() => clearStorage()}>Clear Data</Button>
            <Button onPress={() => saveData(3)}>Save Data</Button>
            <Button onPress={() => syncData()}>Sync Data</Button>
            <Button onPress={() => sortHandler()}>Sort Data</Button>
          </View>
        </Modal>
      </View>
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
  optionModalView: {
    position: "absolute",
    bottom: 0,
    width: width,

    backgroundColor: "yellow",
  },
});
