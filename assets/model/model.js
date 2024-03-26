import * as tf from "@tensorflow/tfjs";


export const loadModel = async () => {

  try {
    await tf.ready();
    const model = await tf.loadGraphModel(
      "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    );
    console.log("Model loaded.");

    const saved_result = await model.save('file:///path/to/my-model');
    console.log(saved_result);
    console.log("Model saved.");
    return model;
  }
  catch(error)
  {
    console.log("load error:" +error);
  }

};
