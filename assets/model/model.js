import * as tf from "@tensorflow/tfjs";
import {asyncStorageIO} from "@tensorflow/tfjs-react-native";

export const loadModel = async () => {
  try {
    await tf.ready();
    const model = await tf.loadGraphModel(
      "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    );
    console.log("Model loaded.");
    // const model = tf.sequential();
    // model.add(tf.layers.dense({units: 5, inputShape: [1]}));
    // model.add(tf.layers.dense({units: 1}));
    // model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
    // console.log("Model loaded.");

    await model.save(asyncStorageIO('customs'));
    console.log("model saved");

    const final = await tf.loadLayersModel(asyncStorageIO('customs'));

    return final;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
};
