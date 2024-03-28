import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { SubmitButton } from "./OutlinedButtons";

const ImageLabels = ({ onLabelSelect }) => {
  const [value, setValue] = useState(0);
  const [customLabel, setCustomLabel] = useState("");
  const [data, setData] = useState([
    { label: "Select Item" },
  ]);
  const addCustomLabel = () => {
    if (customLabel && !data.find((item) => item.label === customLabel)) {
      const newOption = { label: customLabel, value: customLabel };
      setData((prevData) => [...prevData, newOption]);
      onLabelSelect(customLabel);
    }
    setCustomLabel("");
  };

  return (
    <>
      <Dropdown
        style={styles.dropdown}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
          onLabelSelect(item.value);
        }}
      />
      <View style={styles.inputLabel}>
        <TextInput
          style={styles.customLabelInput}
          placeholder="Enter custom label"
          value={customLabel}
          onChangeText={(text) => setCustomLabel(text)}
        />
        <View>
          <View style={styles.inputBtn}>
            <SubmitButton onPress={addCustomLabel}>Add Label</SubmitButton>
          </View>
        </View>
      </View>
    </>
  );
};

export default ImageLabels;

const styles = StyleSheet.create({
  dropdown: {
    margin: 5,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },

  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  inputLabel: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  customLabelInput: {
    width: 240,
    height: 50,

    margin: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
  },
});
