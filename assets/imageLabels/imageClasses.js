export const imageLabels = async () => {
  const res = await fetch(
    "https://cs3.calstatela.edu/~cs4962stu01/imagenet_classes.json"
  );
  const data = await res.json();
  console.log("Labels loaded.");

  return data;
};
