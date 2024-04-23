import * as tf from "@tensorflow/tfjs";
import { asyncStorageIO } from "@tensorflow/tfjs-react-native";
import { version } from "react";

export const SaveModel = async () => {
  try {
    await tf.ready();

    const modelURL = `http://54.177.43.205:5000/models/release/${version}`;
    const newModel = await tf.loadLayersModel(
      "https://cysun.org/public/layers_model2/model.json"
    );

    await newModel.save(asyncStorageIO("customs"));
    console.log("New model saved");

    const originalModel = await tf.loadLayersModel(
      "https://cysun.org/public/layers_model2/model.json"
    );

    await originalModel.save(asyncStorageIO("Original"));
    console.log("Original model saved");

    const oldModel = await tf.loadLayersModel(
      "https://cysun.org/public/layers_model2/model.json"
    );

    await oldModel.save(asyncStorageIO("Old"));
    console.log("Old model saved");
  } catch (e) {
    console.log(e);
  }
};
