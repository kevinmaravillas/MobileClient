import * as FileSystem from "expo-file-system";
import * as tfNode from "@tensorflow/tfjs-node";
export const loadModel = async () => {
  await tf.ready();

  // if (currentValue == "Initial Model") {
  //   const model = await tf.loadGraphModel(startmodel);
  //   console.log("Initial Model loaded.");
  //   return model;
  // }

  // if (currentValue == "Old Model") {
  //   try {
  //     const modeljson = require("./web_model/model.json");
  //     const model = await tf.loadGraphModel(modeljson);
  //     console.log("Old Model loaded.");
  //     return model;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const modelurl =
  //   "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json";
  // const modelurlpath = FileSystem.documentDirectory + "assets/model/testmodel/";
  // console.log("Old Model loaded1.");

  // async function downloadmodel() {
  //   try {
  //     const { uri } = await FileSystem.downloadAsync(modelurl, modelurlpath);
  //     console.log("Model downloaded to:", uri);
  //   } catch (error) {
  //     console.error("Failed to download model:", error);
  //   }
  // }
  // downloadmodel();
  const model = await tf.loadGraphModel(
    "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
  );
  console.log("Old Model loaded.");

  const saveResult = await model.save(FileSystem.documentDirectory);
  console.log("Model saved.");
  console.log(saveResult);
  return model;

  // if (currentValue == "Current Model") {
  //   const model = await tf.loadGraphModel(
  //     "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
  //   );
  //   console.log("Model loaded.");
  //   return model;
  // }
};
