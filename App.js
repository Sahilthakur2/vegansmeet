

import React, { useState, useEffect } from 'react'
import { View, StyleSheet, StatusBar,AppState } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login";
import MainStack from "./src/router/mainStack";
import { Provider } from "react-redux";
import store from "./src/redux/Store";
import firestore from '@react-native-firebase/firestore';
import {AsyncStorage} from 'react-native';

 function App(params) {
   const [myid, setmyid] = useState("")
  async function getmyId(){
    const myId = await AsyncStorage.getItem('myid');
setmyid(myId)

   }
  const [userType, setUsertType] = useState('employe')
  
  const appState = React.useRef(AppState.currentState);
  React.useEffect(() => {
    const myId =  AsyncStorage.getItem('myid');
    AsyncStorage.getItem('myid', (err, item) => console.log(item,'===============', myId));
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
      // console.log('App has come to the foreground!');
      }
      appState.current = nextAppState;
    // console.log("appState.current",appState.current);
    
      
        
      
          AsyncStorage.getItem('myid', (err, item) => {
         
            if (item) {
              firestore()
          .collection('UsersStat')
          .doc(item)
          .set({
            onlineStatus: appState.current == 'active' ? 'Online' : 'Offline',
            id:item,
  
          });
            }
          })
          
       
       
      
    });
    return () => {
      subscription.remove();
    };
    
  }, []);


  return(
    <Provider store={store}>
<NavigationContainer>

<MainStack/>

</NavigationContainer>
    </Provider>
   
  )
  
}

export default App;
