import { StatusBar } from 'expo-status-bar';
import { Button,StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView} from 'react-native';
import { Camera } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';import {useRoute} from '@react-navigation/native';

import * as MediaLibrary from 'expo-media-library';
// import * as Permissions from 'expo-permissions';

export default function CaptureImage() {
  const [hascamperssion, sethascampermission] = useState(null);
  const [camera,setCamera] = useState(null);
  const [image,setImage] = useState(null);
  const [type,setType] = useState(Camera.Constants.Type.back)

  const cameraRef = useRef();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  useEffect(()=> {
    (
      async()=>{
        const camStatus = await Camera.requestCameraPermissionsAsync();
        const hasMediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        sethascampermission(camStatus.status === "granted")
        setHasMediaLibraryPermission(hasMediaLibraryPermission.status === "granted")
      }
    )();
  },[])

  if (hascamperssion === undefined) {
    return <Text>
      Requesting Permissions...
    </Text>
  } else if (!hascamperssion) {
    return <Text>Permission for Camera not granted.</Text>
  }


  const takePic = async ()=> {
    if(camera) {
      const data = await camera.takePictureAsync();
      setImage(data.uri)
      savePic(data.uri)
    }
  }

  async function savePic(data) {
      const assert = await MediaLibrary.createAssetAsync(data);
      MediaLibrary.createAlbumAsync('Tutorial',assert);
  }
  


  return (
    <View style={styles.container}>
      <View style={styles.CameraContainer}>
        <Camera style = {styles.camRatio} type={type} 
         ratio={'1:1'} ref={(ref) => setCamera(ref)}/>
      </View>
      <View style={{flex:0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={takePic}>
          <Image style={styles.icons} source ={require('.../image/camera.png')}/>
        </TouchableOpacity>
      </View>
      {image && <Image source={{uri:image}} style={{flex:1}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },CameraContainer:{flex:1},camRatio:{flex:1,aspectRatio:1},
  icons: {width:50, height:50, margin:30}

});
