// React/React Native
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
// Expo
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

// Getting UUID
import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";

// Tensorflow
import * as tf from "@tensorflow/tfjs";
import * as tfjs from "@tensorflow/tfjs-react-native";

// Others
import {
  OutlinedButtons,
  SignoutButton,
  SubmitButton,
} from "../../components/Camera/OutlinedButtons";
import ImageLabels from "../../components/Camera/ImageLabels";
import { loadModel } from "../../../assets/model/model";

import { Auth } from "aws-amplify";
import DropDownPicker from 'react-native-dropdown-picker';



import DropDownPicker from 'react-native-dropdown-picker';

const Index = () => {
  // Stores images
  const [pickedImage, setPickedImage] = useState(null);
  // Stores labels
  const [selectedLabel, setSelectedLabel] = useState(0);
  // Stores model
  const [model, setModel] = useState(null);
  // Loading process
  const [loading, setLoading] = useState(false);
  // Stores confidence number
  // const [confidenceNumber, setConfidenceNumber] = useState(null);
  // Stores predictions
  const [predictions, setPredictions] = useState(null);
  // Stores maxIndex of preditions
  // const [maxIndex, setMaxIndex] = useState(-1);

  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState('Current model');

  useEffect(() => {
    const loadTFModel = async () => {
      const loadedModel = await loadModel();

      //model select
      setModel(loadedModel);
    };
    loadTFModel();
  }, []);

  // Handling Camera Functionality
  async function takeImageHandler() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return Alert.alert("No Access to Camera");
    }

    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
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
      aspect: [1, 1],
    });

    if (!image.canceled) {
      setPickedImage(image.assets[0]);
    }
  }

  // Classifies the inputted image
  async function classifyImage(image) {
    if (!pickedImage) {
      Alert.alert("No image selected", "Please upload an image");
    } else {
      setLoading(true);

      try {
        const prediction = await getPrediction(image);
        console.log(prediction);

        const threshold = 0.5;
        // const result = prediction > threshold ? "dog" : "cat";
        // console.log(result);
        // setPredictions(result);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }

  // Calculates the prediction
  async function getPrediction(image) {
    try {
      const actions = [{ resize: { width: 160, height: 160 } }];
      const resizePhoto = ImageManipulator.manipulateAsync(image.uri, actions);
      // Resize the photo to a specific size
      const { uri } = await resizePhoto;

      // Read the resized photo as a base64 string
      const imgB64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Encode the base64 string to a buffer
      const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;

      // Create a Uint8Array from buffer
      const raw = new Uint8Array(imgBuffer);
      // Decode the JPEG imaged into a Tensorflow tensor
      const tensor = tfjs.decodeJpeg(raw);
      // Convert the tensor data to float32
      const tensorToFloat = tensor.toFloat();

      // Expand the dimensions of the tensor to match the model input shape
      const tensorExpandedDims = tensorToFloat.expandDims(0);
      const prediction = await model.predict(tensorExpandedDims).data();

      return prediction;
    } catch (e) {
      console.log(e);
    }
  }

  async function sendImageToServer(pickedImage) {
    if (!pickedImage) {
      Alert.alert("No image selected", "Please upload an image");
    } else {
      Alert.alert("Loading", "Uploading Image...");
      const serverUrl = "http://54.215.250.216:5000/uploadV2";
      try {
        const filename = pickedImage.uri.split("/").pop();
        const formData = new FormData();
        formData.append("file", {
          uri: pickedImage.uri,
          name: filename,
          type: "image/jpeg",
        });

        // Match server requirements
        formData.append("Label", selectedLabel);
        // formData.append("confidence", confidenceNumber);
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
          Alert.alert(
            "Upload Success",
            "Image sent to the server successfully"
          );
        } else {
          // Handle an error response from the server
          Alert.alert("Upload Failed", "Failed to send image to the server");
        }
      } catch (error) {
        // Handle network-related errors
        Alert.alert("Network error:", String(error));
      }
    }
  }

  const items = [
    {label: 'Initial Model', value: 'Initial model'},
    {label: 'Current Model', value: 'Current model'},
    {label: 'Newest Model', value: 'Newest model'},
  ]



  let imagePreview = <Text>No image taken yet</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImage.uri }} />
    );
  }

  const signOut = () => {
    Auth.signOut();
  };

  const items = [
    {label: 'Initial Model', value: 'Initial model'},
    {label: 'Current Model', value: 'Current model'},
    {label: 'Newest Model', value: 'Newest model'},
  ]

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
          {/* <View style={{ alignItems: "center" }}>
            <TextInput
              placeholder="Confidence Number"
              keyboardType="numeric"
              value={confidenceNumber}
              onChangeText={(value) => setConfidenceNumber(value)}
            />
          </View> */}
          {/* Buttons Container */}
          <View style={styles.submitBtn}>
            {/* Upadte Button */}
            {/* <SubmitButton >Update</SubmitButton> */}
            {/* <View style={{ width: 50 }} /> */}
            
            {/* Classify Button */}
            <SubmitButton onPress={() => classifyImage(pickedImage)}>
              Classify
            </SubmitButton>
            <View style={{ width: 20 }} />
            {/* Upload Button */}
            <SubmitButton onPress={() => sendImageToServer(pickedImage)}>
              Upload
            </SubmitButton>
            <View style={{ width: 20 }} />
            <View>
            {/* change Model dropdown list */}
            <DropDownPicker 
            items = {items} 
            open ={isOpen} 
            setOpen = {() => setIsOpen(!isOpen)}
            value = {currentValue}
            setValue={(val) => setCurrentValue(val)}
            maxHeight ={100}
            autoScroll
            style = {{width: 160}}
            />
          </View>
          </View>
          <View style={{ paddingTop: 15 }}></View>
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>
              Prediction:{" "}
              {loading ? (
                <ActivityIndicator size="large" color="#999999" />
              ) : (
                predictions
              )}
            </Text>
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
  predictionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
  },
  predictionText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default Index;
