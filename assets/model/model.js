import * as tf from "@tensorflow/tfjs";
import {asyncStorageIO} from '@tensorflow/tfjs-react-native'

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
    console.log(model);

    // const model = await tf.loadGraphModel(`${RNFS.DocumentDirectoryPath}/test_model/model.json`);
    // console.log("Model loaded.");

    // Save model to local storage
    const saved = await model.save(asyncStorageIO('customs'));
    console.log("Model saved");


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
