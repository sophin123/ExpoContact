import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import ContactScreen from "./Screens/ContactScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ContactScreen />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
