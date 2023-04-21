import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { requireNativeComponent } from "react-native";

const Scanner = ({ navigation }) => {
  const [scannerData, setSacnnerData] = useState(null);
  const MyCamera = requireNativeComponent("RNCamera");

  const handleRecordData = (data) => {
    setSacnnerData(data);
  };
  return (
    <View style={styles.container}>
      <MyCamera
        style={styles.preview}
        onBarCodeRead={handleRecordData}
        captureAudio={false}
      />
      <View style={styles.overlay}>
        {scannerData && <Text>{scannerData}</Text>}
      </View>
    </View>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 15,
    alignItems: "center",
  },
  scannedData: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
