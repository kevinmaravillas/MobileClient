import * as tf from "@tensorflow/tfjs";
import { asyncStorageIO } from "@tensorflow/tfjs-react-native";

export const SaveModel = async (version, originalUrl) => {
  try {
    await tf.ready();
    //cont SaveModel = async(version) => {
    // const modelURL = `http://52.53.235.182/models/release`;
    //const model = await tf.loadLayersModel(modelURL);
    //await model.save(asyncStorageIO(version));
    //console.log(`Model with version ${version} saved`);
    //}
    //"https://cs3.calstatela.edu/~cs4962stu01/modelh5/model.json"

    if (version === "1.0.0") {
      const newModel = await tf.loadLayersModel(originalUrl);
      await newModel.save(asyncStorageIO("1.0.0"));
      console.log(`v1.0.0 model saved`);
    } else {
      const modelURL = `http://52.53.235.182/models/release`;
      const newModel = await tf.loadLayersModel(modelURL);
      await newModel.save(asyncStorageIO(version));
      console.log(`v${version} model saved`);
    }
    // const newModel = await tf.loadLayersModel(updateurl);
    // await newModel.save(asyncStorageIO(version));
    // console.log(`${version} model saved`);

    // const newModel = await tf.loadLayersModel(
    //   "https://cysun.org/public/layers_model2/model.json"
    // );

    // await newModel.save(asyncStorageIO("customs"));
    // console.log("New model saved");
    // //await newModel.save(asyncStorageIO("1.0.0"));
    // //console.log("v1.0.0 model saved");

    // const originalModel = await tf.loadLayersModel(
    //   "https://cysun.org/public/layers_model2/model.json"
    // );

    // await originalModel.save(asyncStorageIO("Original"));
    // console.log("Original model saved");
    // //await newModel.save(asyncStorageIO("1.1.0"));
    // //console.log("v1.1.0 model saved");

    // const oldModel = await tf.loadLayersModel(
    //   "https://cysun.org/public/layers_model2/model.json"
    // );

    // await oldModel.save(asyncStorageIO("Old"));
    // console.log("Old model saved");
    //await newModel.save(asyncStorageIO("1.2.0"));
    //console.log("v1.2.0 model saved");
  } catch (e) {
    console.log(e);
  }
};
