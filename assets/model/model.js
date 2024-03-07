import * as tf from "@tensorflow/tfjs";

export const loadModel = async () => {
  const modeljson = await require("./model.json");
  await tf.ready();
  const model = await tf.loadGraphModel(modeljson);
  console.log("Model loaded.");
  return model;
};
