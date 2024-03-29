import * as tf from "@tensorflow/tfjs";

export const loadModel = async () => {
  try {
    await tf.ready();
    const model = await tf.loadGraphModel(
      "https://cs3.calstatela.edu/~cs4962stu01/test_model/model.json"
    );
    console.log("Model loaded.");

    //save model.
    const saved = await model.save('file:///path/to/my-model');
    //error: [Error: Cannot find any save handlers for URL 'file:///path/to/my-model']

    console.log("model saved");
    return saved;

  } catch (e) {
    console.log(e);
  }
};
