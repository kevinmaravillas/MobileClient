import * as tf from "@tensorflow/tfjs";
import {useState, useEffect} from 'react';
import RNFS from 'react-native-fs';

export const loadModel = async () => {
  await tf.ready();

  // const modelPath = '/path/assets/model/model1/model.json';
  // const handler = tf.io.fileSystem(modelPath);

  // if(currentValue == 'Initial Model'){
  //   const model = await tf.loadLayersModel('file://MobileClient/assets/model/model1/model.json');
  //   console.log("Initial Model loaded.");
  //   return model;
  // }

  // if(currentValue == 'Old Model'){
  //   const model = await tf.loadLayersModel('file://MobileClient/assets/model/model1/model.json');
  //   console.log("Old Model loaded.");
  //   return model;
  // }

  // const model = await tf.loadLayersModel(handler);
  // console.log("Old Model loaded.");
  // return model;

  const model = await tf.loadGraphModel(
    "https://cs3.calstatela.edu/~cs4962stu01/model/model.json"
  );
  console.log("Model loaded.");
  //download this model and save it.
  const saveResult = await model.save('localstorage://my-model-1');
  console.log("Model saved.");
  console.log(saveResult);

  return model;
};
