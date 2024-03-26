import * as tf from "@tensorflow/tfjs";


export const loadModel = async () => {

  try {
    await tf.ready();
    const model = await tf.loadGraphModel(
      "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    );
    console.log("Model loaded.");
    return model;
  }
  catch(error)
  {
    console.log("load error:" +error);
  }

};
