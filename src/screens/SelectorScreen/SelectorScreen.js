import React, { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton/CustomButton";

export const modelSelect = (selectedModel) => {
  // Do whatever you want with the selected value
  return selectedModel;
};

const SelectorScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [items, setItems] = useState([
    //For New Model
    { label: "Newest Model", value: "New" },
    //For Previous Model
    { label: "Old Model", value: "Old" },
    // Original Model
    { label: "Original Model", value: "Original" },
  ]);

  // Selection button
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const onSubmitPress = () => {
    console.log("Selected value:", modelSelect(value));

    navigation.navigate("Home");
  };

  return (
    <View
      style={{
        backgroundColor: "#B0B3B8",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 50,
      }}
    >
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

      <CustomButton text="Submit" onPress={handleSubmit(onSubmitPress)} />
    </View>
  );
};
export default SelectorScreen;
