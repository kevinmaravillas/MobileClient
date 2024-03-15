import React, { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import CustomButton from "../../components/CustomButton/CustomButton"

const SelectorScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    //For New Model
    { label: "Newest Model", value: "NewestModel" },
    { label: "1.0 (dummy version)", value: "1.0", parent: "NewestModel" },
    //For Previous Model
    { label: "Previous Model", value: "PreviousModel" },
    { label: "0.5 (dummy version)", value: "0.5", parent: "PreviousModel" },
    // Original Model
    { label: "Original Model", value: "OriginalModel" },
    { label: "First Model", value: "FirstModel", parent: "OriginalModel" },
  ]);

  // Selection button
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const onSubmitPress = () => {
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
      />

      <CustomButton text="Submit" onPress={handleSubmit(onSubmitPress)} />
    </View>
  );
};
export default SelectorScreen;
