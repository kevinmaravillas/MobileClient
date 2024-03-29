import * as tf from "@tensorflow/tfjs";

export const loadModel = async () => {
  await tf.ready();
  const model = await tf.loadGraphModel(
    "https://cs3.calstatela.edu/~cs4962stu01/model/model.json"
  );
  console.log("Model loaded.");
  return model;
};
