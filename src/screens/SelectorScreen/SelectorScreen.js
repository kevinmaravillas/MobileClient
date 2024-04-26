import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton/CustomButton";
import { CheckVersionButton } from "../../components/Camera/OutlinedButtons";
import NetInfo from "@react-native-community/netinfo";

const SelectorScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [items, setItems] = useState([{ label: "v1.0.0", value: "1.0.0" }]);

  const [currentVersion, setCurrentVersion] = useState(""); // State to store current version
  const [wifiConnected, setWifiConnected] = useState(true);

  // useEffect(() => {
  //   const unsubscribeFocus = navigation.addListener("focus", () => {
  //     // Fetch the version only if the version list is empty
  //     if (items.length === 0) {
  //       fetchVersion();
  //     }
  //   });

  //   return unsubscribeFocus;
  // }, [navigation]);

  // Network Info
  useEffect(() => {
    // Subscribe to network connectivity changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setWifiConnected(state.isConnected && state.type === "wifi");
    });

    return () => {
      // Unsubscribe from network connectivity changes when component unmounts
      unsubscribe();
    };
  }, []);

  const fetchVersion = async () => {
    try {
      const response = await fetch("http://52.53.235.182/models/release/info");
      const data = await response.json();
      const newVersion = data.version;

      // Check if Wifi connected
      if (!wifiConnected) {
        Alert.alert(
          "No Wi-Fi Connection",
          "Please connect to Wi-Fi to check for new versions."
        );
s      }
      // Check items list if it doesn't exist, then add
      // with previous items
      if (!items.find((item) => item.value === newVersion)) {
        const newItems = [
          ...items,
          { label: `v${newVersion}`, value: newVersion },
        ];

        setItems(newItems);
      }

      if (newVersion !== currentVersion) {
        // If there's a current version and it's different from the fetched version, update and show alert
        setCurrentVersion(newVersion);
        Alert.alert("New Version Found", `New version: v${newVersion}`);
      } else {
        // If there's a current version and it's the same as the fetched version, just show alert
        Alert.alert("No New Version Found", "You're up-to-date!");
      }

      // Update version list
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  };

  // Selection button
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const onSubmitPress = () => {
    const selectedModel = value;
    console.log("Selected value:", selectedModel);
    navigation.navigate("Home", { modelValue: selectedModel });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <CheckVersionButton icon="refresh" onPress={fetchVersion} />

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          theme="DARK"
          multiple={false}
          mode="BADGE"
          onChangeValue={(item) => {
            setValue(item);
          }}
        />
        <View style={styles.submitButtonContainer}>
          <CustomButton text="Submit" onPress={handleSubmit(onSubmitPress)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B0B3B8",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 100,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  spinnerTextStyle: {
    color: "#FFFFFF",
  },
});
export default SelectorScreen;
