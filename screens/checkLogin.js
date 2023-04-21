import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CheckLogin = ({ navigation }) => {
  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem('name')
      //console.log(user)
      if (user != '') {
        navigation.navigate('Home')
        console.log('Home')
      } else {
        navigation.navigate('Login')
      }
    }
    checkUser()
  },[navigation])


  return (
    <View style={styles.container}>
      <Text style ={styles.logo}>Loading</Text>
    </View>
  )
}

export default CheckLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems : 'center'
  },
  logo: {
    color: 'blue',
    fontSize: 25,
    fontWeight : 'bold'
  }
})