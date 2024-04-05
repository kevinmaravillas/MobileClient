import * as tf from "@tensorflow/tfjs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from "expo-file-system";
import {bundleResourceIO, decodeJpeg} from '@tensorflow/tfjs-react-native'
import RNFS from 'react-native-fs';

// const modelJSON = require('./test_model/model.json');
// const weightPaths = [
//   require('./test_model/group1-shard1of4.bin'),
//   require('./test_model/group1-shard2of4.bin'),
//   require('./test_model/group1-shard3of4.bin'),
//   require('./test_model/group1-shard4of4.bin')
// ];

export const loadModel = async () => {
  try {
    await tf.ready();
    const model = await tf.loadGraphModel(
      "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    );
    console.log("Model loaded.");

    // const model = await tf.loadGraphModel(`${RNFS.DocumentDirectoryPath}/test_model/model.json`);
    // console.log("Model loaded.");

    // // Save model to local storage
    // const modelPath = `${FileSystem.documentDirectory}/my-model`;
    // const saved = await model.save(modelPath);
    // console.log("Model saved to:", modelPath);

    // Save model path to AsyncStorage
    // const saved  = await AsyncStorage.setItem('custom-model-path', model);
    // console.log("Model path saved to AsyncStorage.");

    //load model
    // const saved = await tf.loadGraphModel(bundleResourceIO(modelJSON));

    // await Promise.all(weightPaths.map((path, index) => {
    //   return tf.loadWeights(bundleResourceIO(null, [path]), model.weights[index]);
    // }));

    return model;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
};
