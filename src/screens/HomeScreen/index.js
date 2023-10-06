import React from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import OutlinedButtons from "../../components/OutlinedButtons";

const Index = () => {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestCameraPermission] =
    useCameraPermissions();
  const [galleryPermissionInformation, requestGalleryPermission] =
    useCameraPermissions();

  async function verifyCameraPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const persmissionResponse = await requestPermission();

      return persmissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function verifyGalleryPermission() {
    if (galleryPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const persmissionResponse = await requestPermission();

      return persmissionResponse.granted;
    }

    if (galleryPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant gallery permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyCameraPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      quality: 1,
    });

    setPickedImage(image.assets[0].uri);
  }

  async function uploadImageHandler() {
    const hasPermission = await verifyGalleryPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    setPickedImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View>
          <View style={styles.imagePreview}>{imagePreview}</View>
          <OutlinedButtons icon="camera" onPress={takeImageHandler}>
            Take Image
          </OutlinedButtons>
          <OutlinedButtons icon="camera" onPress={uploadImageHandler}>
            Upload Image
          </OutlinedButtons>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"grey"
  },
  imagePreview: {
    width: 350,
    height: 300,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6699ff",
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Index;
