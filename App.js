import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ContactScreen from "./Screens/ContactScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ContactScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
