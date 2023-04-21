import { StyleSheet, Text, View , StatusBar, TextInput, Button, BackHandler} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateUser = ({ navigation }) => {

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp()
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    
    return ()=> backHandler.remove()
  },[])





  const saveData = async (data) => {
    await AsyncStorage.setItem('name', data.name)
    await AsyncStorage.setItem('id', data.id)
    await AsyncStorage.setItem('job', data.job)
  }
  

  const createUser = (name, job) => {
    
    if (name == '' && job == '') {
      console.log('Enter Informations')
    } else {
      
      console.log('Your name  is ' + name + 'Your Job is ' + job)
    
      axios.post('https://reqres.in/api/users', {
        name,
        job
      }).then(response => {
        if (response.status == 201) {
          saveData(response.data);
          navigation.navigate('Home')
          console.log(response.data.id)
        }
      
      }).catch(error => {
        console.log(error)
      })
    }
    
  }

  const [name, setName] = useState('')
  const [job , setJob] = useState('')
  return (
    <View style ={styles.main}>
    <View style ={styles.container}>
      <Text style={styles.title}> Create User</Text>
      <TextInput style={styles.textInput} placeholder='Please Enter Name ' onChangeText={(text)=>setName(text)}/>
      <TextInput style={styles.textInput} placeholder='Please Enter Job Position ' onChangeText={(text) => setJob(text)} />
      <TouchableOpacity style ={styles.button} onPress= {()=>{ createUser(name , job)}}>
        <Text style ={{color : 'white', fontSize : 18, fontWeight : 'bold'}}> Create User</Text>
      </TouchableOpacity>
      
      </View>
      </View>
  )

}


export default CreateUser

const styles = StyleSheet.create({
  main: {
    backgroundColor : 'lightblue',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop : StatusBar.currentHeight
  },
  container: {
    width : '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 8,
    alignItems: 'center'
  },
  title: {
    color: 'lightblue',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
       fontSize: 30,
       textShadowColor: 'grey',
       textShadowOffset: { width: 1, height: 4 },
       textShadowRadius: 5,
       marginBottom : 20
  
  },
  textInput: {
    //backgroundColor: 'lightblue',
    width: '100%',
    padding: 10,
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20
  },
  button: {
    width : '50%',
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: 'lightblue',
    padding: 10,
    alignItems: 'center',
    elevation: 5,
    marginBottom : 20
  }
})