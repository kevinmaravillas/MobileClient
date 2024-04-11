import * as tf from "@tensorflow/tfjs";
import {asyncStorageIO} from "@tensorflow/tfjs-react-native";

export const loadModel = async () => {
  try {
    await tf.ready();
    const model = await tf.loadGraphModel(
      "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    );
    console.log("Model loaded.");

    await model.save(asyncStorageIO('customs'));
    // console.log("model saved");

     const final = await tf.loadLayersModel(asyncStorageIO('customs'));
     console.log(final == model);


    return model;
  } catch (e) {
    console.error("Error:", e);
    return null;
  }
};
