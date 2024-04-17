import * as tf from "@tensorflow/tfjs";
import { asyncStorageIO } from "@tensorflow/tfjs-react-native";

export const loadModel = async () => {
  try {
    // await tf.ready();
    // const model = await tf.loadGraphModel(
    //   "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    // );
    // console.log("Model loaded.");

    // // const saved = await model.save('file:///path/to/my-model');

    // // console.log("model saved");
    // return model;
    await tf.ready();
    // const model = await tf.loadGraphModel(
    //   "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    // );
    const model = await tf.loadLayersModel(
      "https://cysun.org/public/layers_model2/model.json"
    );

    console.log("Model loaded.");

      const saved = await model.save(asyncStorageIO("customs"));
    console.log("model saved");

    const final = await tf.loadLayersModel(asyncStorageIO('customs'));

    return final;
  } catch (e) {
    console.log(e);
  }
};
