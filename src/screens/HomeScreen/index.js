// React/React Native
import React, { useState } from "react";
import { StyleSheet, View, Alert, Image, Text, TextInput } from "react-native";
// Expo
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
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
  // Stores images
  const [pickedImage, setPickedImage] = useState(null);
  // Stores labels
  const [selectedLabel, setSelectedLabel] = useState(0);
  // Stores model
  // const [model, setModel] = useState("");
  // Loading process
  // const [loading, setLoading] = useState(false);
  // Stores confidence number
  const [confidenceNumber, setConfidenceNumber] = useState(null);
  // Stores predictions
  // const [predictions, setPredictions] = useState([]);
  // Stores maxIndex of preditions
  // const [maxIndex, setMaxIndex] = useState(-1);

  // Handling Camera Functionality
  async function takeImageHandler() {
    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0]);
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
      setPickedImage(image.assets[0]);
    }
  }

  async function sendImageToServer(pickedImage) {
    const serverUrl = "http://54.215.250.216:5000/uploadV2";
    try {
      const filename = pickedImage.uri.split("/").pop();
      const formData = new FormData();
      formData.append("file", {
        uri: uri,
        name: filename,
        type: "image/jpeg",
      });

      // Match server requirements
      formData.append("Label", selectedLabel);
      formData.append("confidence", confidenceNumber);
      formData.append("id", filename);
      formData.append("imageUrl", filename);

      const response = await fetch(serverUrl, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response Status:", response.status);
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (response.ok) {
        // Handle a successful response from the server
        Alert.alert("Upload Success", "Image sent to the server successfully");
      } else {
        // Handle an error response from the server
        Alert.alert("Upload Failed", "Failed to send image to the server");
      }
    } catch (error) {
      // Handle network-related errors
      Alert.alert("Network error:", String(error));
    }
  }

  let imagePreview = <Text>No image taken yet</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImage.uri }} />
    );
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
          {/* Confidence Number Input */}
          <View style={{ alignItems: "center" }}>
            <TextInput
              placeholder="Confidence Number"
              keyboardType="numeric"
              value={confidenceNumber}
              onChangeText={(value) => setConfidenceNumber(value)}
            />
          </View>
          {/* Buttons Container */}
          <View style={styles.submitBtn}>
            {/* Upadte Button */}
            {/* <SubmitButton >Update</SubmitButton> */}
            {/* <View style={{ width: 50 }} /> */}
            {/* Classify Button */}
            <SubmitButton>Classify</SubmitButton>
            <View style={{ width: 50 }} />
            {/* Upload Button */}
            <SubmitButton onPress={() => sendImageToServer(pickedImage)}>
              Upload
            </SubmitButton>
          </View>
        </View>
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
    paddingTop: 15,
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
