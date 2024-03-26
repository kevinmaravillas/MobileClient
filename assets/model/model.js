import * as tf from "@tensorflow/tfjs";
import { Platform } from "react-native";
export const loadModel = async () => {
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

  // async function download() {
  //   const filename = "model.json";
  //   const result = await FileSystem.downloadAsync(
  //     "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json",
  //     FileSystem.documentDirectory + filename
  //   );

  //   console.log(result);

  //   saveFile(result.uri, filename, result.headers["Content-Type"]);
  // }

  // async function saveFile(uri, filename, mimetype) {
  //   if (Platform.OS === "android") {
  //     const permissions =
  //       await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

  //     if (permissions.granted) {
  //       const base64 = await FileSystem.readAsStringAsync(uri, {
  //         encoding: FileSystem.EncodingType.Base64,
  //       });

  //       await FileSystem.StorageAccessFramework.createFileAsync(
  //         permissions.directoryUri,
  //         filename,
  //         mimetype
  //       )
  //         .then(async (uri) => {
  //           await FileSystem.writeAsStringAsync(uri, base64, {
  //             encoding: FileSystem.EncodingType.Base64,
  //           });
  //         })
  //         .catch((e) => console.log(e));
  //     } else {
  //       Sharing.shareAsync(uri);
  //     }
  //   } else {
  //     Sharing.shareAsync(uri);
  //   }
  // }

  // const fetch = require('node-fetch');
  // ,{ fetchFunc: fetch }
    try {
      await tf.ready();
      const model = await tf.loadGraphModel(
        "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
      );
      console.log("Model loaded.");
      console.log(model);

      // const save = await model.save('downloads://my-model');
      // console.log("Model saved.");
      // console.log(save);
       return model;
    } 
    catch (error) {
      console.log("save error:" + error);
    }

};
