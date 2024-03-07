import * as tf from "@tensorflow/tfjs";
import currentValue from '../../src/screens/HomeScreen/index.js'
import startmodel from './model.json';
import oldmodel from './Oldmodel.json';

export const loadModel = async () => {
  await tf.ready();

  if(currentValue == 'Initial Model'){
    const model = await tf.loadGraphModel(startmodel);
    console.log("Initial Model loaded.");
    return model;
  }

  if(currentValue == 'Old Model'){
    const model = await tf.loadGraphModel(oldmodel);
    console.log("Old Model loaded.");
    return model;
  }

  const model = await tf.loadGraphModel(
    "https://cs3.calstatela.edu/~cs4962stu01/model/model.json"
  );
  console.log("Model loaded.");
  return model;
};
