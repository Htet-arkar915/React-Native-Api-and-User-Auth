import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CreateUser from "./screens/createUser";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckLogin from "./screens/checkLogin";
import CameraFeature from "./screens/camera";
import Scanner from "./screens/scanner";

const App = ({ navigation }) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="checkLogin">
        <Stack.Screen
          name="checkLogin"
          component={CheckLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={CreateUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Camera"
          component={CameraFeature}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Scanner" component={Scanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
});
