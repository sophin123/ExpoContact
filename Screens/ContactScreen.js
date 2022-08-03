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

export default function ContactScreen() {
  const [contactDetails, setContactDetails] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [finalData, setFinalData] = useState([]);

  const [refresh, setRefresh] = useState(false);

  // console.log(contactDetails, "Contact Details");

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

    console.log("Use effect called");
  }, [refresh]);

  const buttonHandler = () => {
    setModalVisible(!modalVisible);
  };

  console.log(finalData, "Final Data");

  if (Object.keys(finalData).length > 0) {
    contactDetails.push(finalData);
  }

  const updateData = () => {
    setModalVisible(!modalVisible);
    console.log(Object.keys(finalData).length, "length");
  };

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    let promise = new Promise((resolve) => setTimeout(resolve, 2000));
    promise.then(() => setRefresh(false));
  }, []);

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
            finalData={finalData}
            setFinalData={setFinalData}
            updateData={() => updateData()}
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
        style={styles.flatListStyle}
        data={contactDetails}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <ListComponent
            key={item.id}
            username={item.firstName}
            // phoneNumber={item.phoneNumbers.map((data) => {
            //   return data.number;
            // })}
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
