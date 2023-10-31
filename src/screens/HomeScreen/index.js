// React/React Native
import React, { useState } from "react";
import { StyleSheet, View, Alert, Image, Text } from "react-native";
// Expo
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// Firebase
// import { firebase, db } from "../config";
// import { push, ref, set } from "firebase/database";
// Getting UUID
import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";
// UI
import {
  OutlinedButtons,
  SignoutButton,
  SubmitButton,
} from "../../components/Camera/OutlinedButtons";
import ImageLabels from "../../components/Camera/ImageLabels";

import { Auth } from "aws-amplify";

const Index = () => {
  // Storing Images
  const [pickedImage, setPickedImage] = useState(null);
  // Uploading Alerts
  const [uploading, setUploading] = useState(false);
  // Stored Labels
  const [selectedLabel, setSelectedLabel] = useState("");
  // Handling Camera Functionality
  async function takeImageHandler() {
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
    }
  }

  // Handling Gallery Functionality
  async function galleryImageHandler() {
    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
    }
  }

  let imagePreview = <Text>No image taken yet</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  const signOut = () => {
    Auth.signOut();
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.button}>
          <SignoutButton onPress={signOut}>Sign out</SignoutButton>
        </View>

        <StatusBar style="auto" />
        <View>
          {/* Icons Container */}
          <View style={styles.icons}>
            {/* Camera Button */}
            <OutlinedButtons
              icon="camera"
              onPress={takeImageHandler}
            ></OutlinedButtons>
            <View style={{ width: 20 }} />
            {/* Gallery Button */}
            <OutlinedButtons
              icon="images-outline"
              onPress={galleryImageHandler}
            ></OutlinedButtons>
          </View>
          {/* Image Preview */}
          <View style={styles.imagePreview}>{imagePreview}</View>
          {/* Dropdown Menu */}
          <ImageLabels onLabelSelect={(label) => setSelectedLabel(label)} />
          {/* Buttons Container */}
          <View style={styles.submitBtn}>
            {/* Upadte Button */}
            {/* <SubmitButton >Update</SubmitButton> */}
            {/* <View style={{ width: 50 }} /> */}
            {/* Classify Button */}
            <SubmitButton>Classify</SubmitButton>
            <View style={{ width: 50 }} />
            {/* Upload Button */}
            <SubmitButton onPress={() => addData(selectedLabel)}>
              Upload
            </SubmitButton>
          </View>
        </View>
        {/* <View style={styles.signout}>
          <Text onPress={signOut} style={styles.signoutTxt}>
            Sign out
          </Text>
        </View> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    width: 300,
  },
  imagePreview: {
    width: 350,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6699ff",
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  submitBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 5,
  },
  button: {
    marginBottom: 15,
    marginLeft: 30,
    alignSelf: "flex-start",
  },
});

export default Index;
