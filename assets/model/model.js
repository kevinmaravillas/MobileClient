import * as tf from "@tensorflow/tfjs";
import {asyncStorageIO} from "@tensorflow/tfjs-react-native";

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
    const model = await tf.loadGraphModel(
      "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    );
    console.log("Model loaded.");
    
    // const saved = await model.save('file:///path/to/my-model');
    const saved = await model.save(asyncStorageIO('customs'));
    console.log("model saved");

    // const final = await tf.loadGraphModelSync(saved);
    // console.log(final == model);


    return model;
  } catch (e) {
    console.log(e);
  }
};
