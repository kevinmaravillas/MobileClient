import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function OutlinedButtons({ onPress, icon }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons style={styles.icon} name={icon} size={45} color="#6699ff" />
    </Pressable>
  );
}

function SubmitButton({ onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.submitBtn, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.submitTxt}>{children}</Text>
    </Pressable>
  );
}
function SignoutButton({ onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.signout, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.submitTxt}>{children}</Text>
    </Pressable>
  );
}

export { OutlinedButtons, SubmitButton, SignoutButton };

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderRadius: 11,
    padding: 3,
    borderColor: "#6699ff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pressed: {
    opacity: 0.7,
  },
  submitBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#818589",
    borderRadius: 7,
  },
  submitTxt: {
    color: "white",
  },
  signout: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 4,
    backgroundColor: "red",
    borderRadius: 7,
  },
});
