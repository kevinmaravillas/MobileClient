import React from 'react';
import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import OutlinedButtons from '../../components/OutlinedButtons';


const Index = () => {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const persmissionResponse = await requestPermission();

      return persmissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions',
        'You need to grant camera permissions to use this app'
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
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
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0B3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: 350,
    height: 400,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6699ff',
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Index;