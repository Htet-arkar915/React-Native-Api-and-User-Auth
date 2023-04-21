import {
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Image,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);

  const [postTitle, setPostTitle] = useState("");
  const [postDetail, setPostDetail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "https://insurancenode.onrender.com/insurance/alldata"
        );
        setData(result.data);
        console.log("API Data" + result.data[0].day);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const backAction = () => {
      visible ? setVisible(false) : BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const click = (item) => {
    console.log(item.age61to75);
    visible ? setVisible(false) : setVisible(true);
    setPostTitle(item.age61to75);
    setPostDetail(item.ageabove75);
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are You Sure Want To Logout?",
      [
        {
          text: "Cancel",
          onPress: () => {
            console.log("cancel");
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await AsyncStorage.removeItem("name");
            await AsyncStorage.removeItem("id");
            await AsyncStorage.removeItem("job");
            navigation.navigate("Login");
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              handleLogout();
            }}
          >
            <Image
              source={require("../assets/log.png")}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 10,
            }}
            onPress={() => {
              navigation.navigate("Camera");
            }}
          >
            <Entypo name="camera" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        bouncesZoom={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <TouchableOpacity onPress={() => click(item)}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}
              >
                Days : {item.day}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 15, marginBottom: 10 }}>
                  Age 1 to 60 :
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 10 }}>
                  {item.age1to60} $
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 15, marginBottom: 10 }}>
                  Age 61 to 75 :
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 10 }}>
                  {item.age61to75} $
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 15, marginBottom: 10 }}>
                  Age above 75 :
                </Text>
                <Text style={{ fontSize: 15, marginBottom: 10 }}>
                  {item.ageabove75} $
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      {visible ? (
        <View style={styles.overlayView}>
          <View style={styles.alertHeader}>
            <View></View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "grey",
              }}
            >
              Post Details
            </Text>
            <TouchableOpacity
              styles={styles.closeAlert}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Entypo name="cross" size={24} color="grey" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 18,
              textAlign: "justify",
              fontWeight: "bold",
              color: "white",
              marginTop: 20,
            }}
          >
            ${postTitle}
          </Text>
          <Text style={{ fontSize: 16, textAlign: "justify", marginTop: 10 }}>
            ${postDetail}
          </Text>
        </View>
      ) : null}
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "lightblue",
    height: 50,
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    justifyContent: "space-between",
  },
  post: {
    backgroundColor: "white",
    elevation: 5,
    margin: 5,
    borderRadius: 5,
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
  },
  overlayView: {
    flex: 1,
    position: "absolute",
    top: null,
    right: null,
    left: null,
    bottom: 10,
    height: "50%",
    width: "100%",
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginLeft: "3%",
    padding: 10,
  },
  alertHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 5,
  },
});
