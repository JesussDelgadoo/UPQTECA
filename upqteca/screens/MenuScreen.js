import { Text, StyleSheet, View, Button } from 'react-native'
import React, { useState } from 'react'
import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'

export default function MenuScreen() {

  const [screen,setScreen] = useState('menu');

  switch(screen){
      case 'home':
        return <LoginScreen/>
      case 'login':
        return <HomeScreen/>
      case 'menu':
        default:
          return (
              <View style={styles.botonesContainer}>
                <Text style = {styles.titulo}>Menu de UPQTeca</Text>
                <Button title='HomeScreen' onPress={()=>setScreen('home')}/>
                <Button title='LoginScreen' onPress={()=>setScreen('login')}/>
              </View>
          )
  }

}

const styles = StyleSheet.create({
  botonesContainer:{
      flex: 1,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 30,
      backgroundColor: '#2e2e2eff',
  },
  titulo:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
})