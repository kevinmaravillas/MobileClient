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
  const [value, setValue] = useState("1.0.0");
  const [items, setItems] = useState([{ label: "v1.0.0", value: "1.0.0" }]);
  const [currentVersion, setCurrentVersion] = useState("");
  const [wifiConnected, setWifiConnected] = useState(true);
  const navigation = useNavigation();

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
      const latestVersion = data.version;

      // Check if Wifi connected
      if (!wifiConnected) {
        Alert.alert(
          "No Wi-Fi Connection",
          "Please connect to Wi-Fi to check for new versions."
        );
        return;
      }

      if (!items.find((item) => item.value === latestVersion)) {
        // Update the items array with the latest version
        const newItems = [
          ...items,
          { label: `v${latestVersion}`, value: latestVersion },
        ];
        setItems(newItems);
      }

      setCurrentVersion(latestVersion);

      if (latestVersion !== value) {
        // If the latest version is different from the currently selected version
        // Set the selected version to the latest version
        setValue(latestVersion);
        Alert.alert("New Version Found", `New version: v${latestVersion}`);
      } else {
        Alert.alert("No New Version Found", "You're up-to-date!");
      }
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  };

  const fetchAvailableVersions = async () => {
    try {
      const response = await fetch("http://52.53.235.182/models/release/info");
      const data = await response.json();
      const latestVersion = data.version;

      // Update the items array with all available versions
      const newItems = [
        ...items,
        { label: `v${latestVersion}`, value: latestVersion },
      ];
      setItems(newItems);

      // Set the currently selected version as the latest version
      setCurrentVersion(latestVersion);
    } catch (error) {
      console.error("Error fetching version:", error);
    }
  };

  // Selection button
  const { control, handleSubmit } = useForm();
  const onSubmitPress = () => {
    const selectedModel = value;
    console.log("Selected value:", value);
    navigation.navigate("Home", { modelValue: value });
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
});

export default SelectorScreen;
