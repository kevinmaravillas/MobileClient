import * as tf from "@tensorflow/tfjs";
import { asyncStorageIO } from "@tensorflow/tfjs-react-native";

export const loadModel = async (version) => {
  try {
    await tf.ready();
    let final;

    if (version === "New") {
      final = await tf.loadLayersModel(asyncStorageIO("customs"));
      console.log("New load locally");
    }
    if (version === "Original") {
      final = await tf.loadLayersModel(asyncStorageIO("Original"));
      console.log("Original load locally");
    }
    if (version === "Old") {
      final = await tf.loadLayersModel(asyncStorageIO("Old"));
      console.log("Old load locally");
    }

    return final;
  } catch (e) {
    console.log(e);
  }
};
