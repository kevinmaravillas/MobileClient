import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreen';

const App = () => {
  return(
    <SafeAreaView style={styles.root}>
      {/* <SignInScreen/> */}
      {/* <SignUpScreen/> */}
      <ConfirmEmailScreen/>
    </SafeAreaView>
  );
}
//
//
//Testing 
//
//
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#B0B3B8',

  },
});

export default App;

