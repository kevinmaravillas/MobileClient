import * as tf from "@tensorflow/tfjs";
import { asyncStorageIO } from "@tensorflow/tfjs-react-native";

export const loadModel = async (Version) => {
  try {
    await tf.ready();
    let final;

    if(Version === "New") {
      final = await tf.loadLayersModel(asyncStorageIO("customs"));
      console.log("New load locally")
    }
    if(Version === "Original") {
      final = await tf.loadLayersModel(asyncStorageIO("Original"));
      console.log("Original load locally")
    }
    if(Version === "Old") {
      final = await tf.loadLayersModel(asyncStorageIO("Old"));
      console.log("Old load locally")
    }

    return final;
  } catch (e) {
    console.log(e);
  }
};

// export const SaveModel = async () => {
//   try {
//     await tf.ready();
//     const Newmodel = await tf.loadLayersModel(
//       "https://cysun.org/public/layers_model2/model.json"
//     );

//     await Newmodel.save(asyncStorageIO("customs"));
//     console.log("New model saved");

//     const Oldmodel = await tf.loadLayersModel(
//       "https://cysun.org/public/layers_model2/model.json"
//     );

//     await Oldmodel.save(asyncStorageIO("Old"));
//     console.log("Old model saved");

//     const Originalmodel = await tf.loadLayersModel(
//       "https://cysun.org/public/layers_model2/model.json"
//     );

//     await Originalmodel.save(asyncStorageIO("Original"));
//     console.log("Original model saved");
//   } catch (e) {
//     console.log(e);
//   }
// };