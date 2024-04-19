// React/React Native
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
// Expo
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";

// Getting UUID
import "react-native-get-random-values";
// import { v4 as uuidv4 } from "uuid";
import * as jpeg from "jpeg-js";

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
import { SaveModel } from "../../../assets/model/saveModel";
import { imageLabels } from "../../../assets/imageLabels/imageClasses";

// import { Auth } from "aws-amplify";

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
  const [confidenceNumber, setConfidenceNumber] = useState(null);
  // Stores predictions
  const [predictedClass, setPredictedClass] = useState(null);
  const [classLabels, setClassLabels] = useState(null);

  useEffect(() => {
    SaveModel();
    const loadTFModel = async () => {
      const version = "New";
      const loadedModel = await loadModel(version);
      setModel(loadedModel);
    };
    const getClassLabels = async () => {
      const loadedLabels = await imageLabels();
      setClassLabels(loadedLabels);
    };
    loadTFModel();
    getClassLabels();
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
    const version = "Origenal";
    const loadedModel = await loadModel(version);
    setModel(loadedModel);
    if (!pickedImage) {
      Alert.alert("No image selected", "Please upload an image");
    } else {
      setLoading(true);

      try {
        const result = await getPrediction(image);
        console.log(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }

  async function imageToTensor(image) {
    // Fetch the image data from the provided URI
    const response = await fetch(image.uri, {}, { isBinary: true });
    // Fetch the raw binary data of the image
    const rawImageData = await response.arrayBuffer();

    // Decode the raw image data using a JPEG decoder
    // Specify that the decoded data should be returned as a Uint8Array
    const { width, height, data } = jpeg.decode(rawImageData, {
      Uint8Array: true,
    });

    // Create a new Uint8Array to hold RGB pixel data (3 channels per pixel)
    const buffer = new Uint8Array(width * height * 3);
    let offset = 0;
    // Loop through the buffer array in steps of 3 (for each RGB value)
    for (let i = 0; i < buffer.length; i += 3) {
      // Copy the color channel from data array to buffer array
      // Copy the red channel value
      buffer[i] = data[offset];
      // Copy the green channel value
      buffer[i + 1] = data[offset + 1];
      // Copy the blue channel value
      buffer[i + 2] = data[offset + 2];
      // Move to the next pixel by skipping the alpha channel (RGBA format)
      offset += 4;
    }

    // Transform the RGB pixel data into a tensor
    const img = tf.tensor3d(buffer, [width, height, 3]);

    // Resize the image tensor to the desired dimensions
    const resizedImg = tf.image.resizeBilinear(img, [224, 224]);

    // Add a fourth batch dimension to the tensor
    const expandedImg = resizedImg.expandDims(0);

    // Normalize the RGB values to the range -1 to +1
    return expandedImg.toFloat().div(tf.scalar(255).sub(tf.scalar(1)));
  }

  async function getPrediction(image) {
    try {
      const source = { uri: image.uri };
      const imageTensor = await imageToTensor(source);
      const prediction = await model.predict(imageTensor);
      console.log(prediction);
      const probabilities = await prediction.array();

      // Find the index of the class with the highest probability
      const predictedClassIndex = probabilities[0].indexOf(
        Math.max(...probabilities[0])
      );
      // Get the class name using the class index
      const predictedClassName = classLabels[predictedClassIndex];
      // Get the confidence score for the predicted class
      const confidence = probabilities[0][predictedClassIndex];
      // Round the confidence score and convert it to a percentage
      const roundedConfidence = Math.round(confidence * 100) + "%";

      setPredictedClass(predictedClassName);
      setConfidenceNumber(roundedConfidence);

      return {
        "Class Name": predictedClassName,
        "Confidence Number": roundedConfidence,
      };
    } catch (e) {
      console.log(e);
    }
  }

  async function sendImageToServer(pickedImage) {
    if (!pickedImage) {
      Alert.alert("No image selected", "Please upload an image");
    } else {
      Alert.alert("Loading", "Uploading Image...");
      const serverUrl = "http://54.215.250.216:5000/images/unverified";
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

  let imagePreview = <Text>No image taken yet</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image style={styles.image} source={{ uri: pickedImage.uri }} />
    );
  }

  // const signOut = () => {
  //   Auth.signOut();
  // };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.button}>
          <SignoutButton onPress={signOut}>Sign out</SignoutButton>
        </View> */}

        <StatusBar style="auto" />
        <View style={{ paddingTop: 50 }} />
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
            {/* Classify Button */}
            <SubmitButton onPress={() => classifyImage(pickedImage)}>
              Classify
            </SubmitButton>
            <View style={{ width: 50 }} />
            {/* Upload Button */}
            <SubmitButton onPress={() => sendImageToServer(pickedImage)}>
              Upload
            </SubmitButton>
          </View>
          <View style={{ paddingTop: 15 }}></View>
          <View style={styles.predictionContainer}>
            <Text style={styles.predictionText}>
              Prediction:{" "}
              {loading ? (
                <ActivityIndicator size="large" color="#999999" />
              ) : (
                predictedClass
              )}
              {"\n"}
              Confidence:{" "}
              {loading ? (
                <ActivityIndicator size="large" color="#999999" />
              ) : (
                confidenceNumber
              )}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Index;
