import * as tf from "@tensorflow/tfjs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from "expo-file-system";

export const loadModel = async () => {
  try {
    await tf.ready();
    const model = await tf.loadGraphModel(
      "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    );
    console.log("Model loaded.");

    // Save model to local storage
    const modelPath = `${FileSystem.documentDirectory}/my-model`;
    const saved = await model.save(modelPath);
    console.log("Model saved to:", modelPath);

    // Save model path to AsyncStorage
    // const saved  = await AsyncStorage.setItem('custom-model-path', model);
    // console.log("Model path saved to AsyncStorage.");

    return saved;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
};
