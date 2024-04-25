import * as tf from "@tensorflow/tfjs";
import { asyncStorageIO } from "@tensorflow/tfjs-react-native";

export const loadModel = async (version) => {
  try {
    await tf.ready();
    let final;

    // Load the model using the provided version number as the AsyncStorage key
    // const final = await tf.loadLayersModel(asyncStorageIO(version));
    // console.log(`${version} model loaded locally`);

    if(version) {
      final = await tf.loadLayersModel(asyncStorageIO(version));
      console.log(`${version} load locally`);
    }

    // if (version === "New") {
    //   final = await tf.loadLayersModel(asyncStorageIO("customs"));
    //   console.log("New load locally");
    //   //console.log("v1.0.0 load locally");
    // }
    // if (version === "Original") {
    //   final = await tf.loadLayersModel(asyncStorageIO("Original"));
    //   console.log("Original load locally");
    //   //console.log("v1.1.0 load locally");
    // }
    // if (version === "Old") {
    //   final = await tf.loadLayersModel(asyncStorageIO("Old"));
    //   console.log("Old load locally");
    //   //console.log("v1.2.0 load locally");
    // }

    return final;
  } catch (e) {
    console.log(e);
  }
};
