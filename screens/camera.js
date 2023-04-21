import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "./Button";

const CameraFeature = ({ navigation }) => {
  const [hasCameraPermission, setHasCamerapermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCamerapermission(cameraStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Home");
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => {
      backHandler.remove();
    };
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data.uri);
        setImage(data.uri);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("Picture saved!");
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (hasCameraPermission == false) {
    return <Text>No Camera Access</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 30,
            }}
          >
            <Button
              icon={"retweet"}
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            ></Button>
            <Button
              color={
                flash === Camera.Constants.FlashMode.off ? "white" : "yellow"
              }
              icon={"flash"}
              onPress={() => {
                console.log("hello");
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                );
              }}
            ></Button>
          </View>
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <Button
              title={"Re-Take"}
              icon={"retweet"}
              onPress={() => {
                setImage(null);
              }}
            ></Button>
            <Button title={"Save"} icon={"check"} onPress={saveImage}></Button>
          </View>
        ) : (
          <Button
            title={"Take a Picture"}
            icon={"camera"}
            onPress={takePicture}
          ></Button>
        )}
      </View>
    </View>
  );
};

export default CameraFeature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    paddingBottom: 20,
    marginTop: StatusBar.currentHeight,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
});
