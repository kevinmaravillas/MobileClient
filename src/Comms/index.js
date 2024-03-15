// STILL IN PROGRESS - Posting for reference / still adapting to MobileClient
// some additions to the dependencies are needed in 
//  package.json and app.json
// see these in the link: https://blog.logrocket.com/build-object-classification-app-tensorflow-react-native/


import { View, Text, Image, Button, StyleSheet, SafeAreaView } from 'react-native';
import { decodeJpeg } from '@tensorflow/tfjs-react-native';
import * as mobilenet from '@tensorflow-models/mobilenet';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as tf from '@tensorflow/tfjs';

// send data to server
import axios from 'axios';


const serverComms = () => {
  const [isTfReady, setIsTfReady] = useState(false);
  const [result, setResult] = useState('');
  const [pickedImage, setPickedImage] = useState('');
  const [model, setModel] = useState(null); // Define the model variable

  // Load the MobileNet model when the component is mounted
  useEffect(() => {
    async function loadModel() {
      try {
        // Load MobileNet
        await tf.ready();
        const mobilenetModel = await mobilenet.load();
        setModel(mobilenetModel); // Set the model in state
        setIsTfReady(true);
      } catch (err) {
        console.log(err);
      }
    }
    loadModel();
  }, []);

  // select an image from photo gallery and set it
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  const classifyUsingMobilenet = async () => {
    try {
      if (model) { // Check if the model is loaded
        // Convert image to tensor
        const imgB64 = await FileSystem.readAsStringAsync(pickedImage, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
        const raw = new Uint8Array(imgBuffer)
        const imageTensor = decodeJpeg(raw);

        // Classify the tensor and show the result
        const prediction = await model.classify(imageTensor);
        if (prediction && prediction.length > 0) {
          // Get the top 3 predictions
          const top3Predictions = prediction.slice(0, 3);
          setResult(top3Predictions);
          // automatically send to server when you get your predictions without having to use buttons
          sendDataToServer(top3Predictions);
        }
      }
    } catch (err) {
      console.log(err);
    }      
  };

  useEffect(() => {
    classifyUsingMobilenet();
  }, [pickedImage, model]);

  


  /* Send Data to Server function */
  const sendDataToServer = async () => {
    try {
      if (pickedImage && result.length > 0) {
        const imageBase64 = await FileSystem.readAsStringAsync(pickedImage, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const dataToSend = {
          image: imageBase64,
          predictions: result,
        };
        const response = await axios.get(
          'http://54.215.250.216:5000/', 
          dataToSend
        );
        console.log('Response from the server:', response.data);
      } else {
        console.log('Please select an image and classify it first.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      {pickedImage ? (
        <Image source={{ uri: pickedImage }} style={styles.imagePreview} />
      ) : (
        <Text>No image selected</Text>
      )}

      {isTfReady && (
        <Button title="Pick an image" onPress={pickImage} />
      )}

      <View style={{ width: '100%', height: 20 }} />
      {!isTfReady && <Text>Loading TFJS model...</Text>}
      {isTfReady && result.length === 0 && <Text>Pick an image to classify!</Text>}
      
      {result.length > 0 && (
        <View>
          <Text>Top 3 Predictions:</Text>
          {result.map((prediction, index) => (
            <Text key={index}>
              {`${prediction.className} (${prediction.probability.toFixed(3)})`}
            </Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagePreview: {
      width: 350,
      height: 300,
      margin: 40,
      marginVertical: 8,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#6699ff",
      borderRadius: 4,
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });

export default serverComms;