import * as tf from "@tensorflow/tfjs";
import { asyncStorageIO } from "@tensorflow/tfjs-react-native";

export const SaveModel = async () => {
  try {
    await tf.ready();
    const Newmodel = await tf.loadLayersModel(
      "https://cysun.org/public/layers_model2/model.json"
    );

    await Newmodel.save(asyncStorageIO("customs"));
    console.log("New model saved");

    const Originalmodel = await tf.loadLayersModel(
      "https://cysun.org/public/layers_model2/model.json"
    );

    await Originalmodel.save(asyncStorageIO("Original"));
    console.log("Original model saved");

    const Oldmodel = await tf.loadLayersModel(
      "https://cysun.org/public/layers_model2/model.json"
    );

    await Oldmodel.save(asyncStorageIO("Old"));
    console.log("Old model saved");
  } catch (e) {
    console.log(e);
  }
};
