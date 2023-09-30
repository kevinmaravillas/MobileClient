import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import Navigation from './src/navigation';
// import HomseScreen from './src/screens/HomeScreen';

const App = () => {
  return(
    <SafeAreaView style={styles.root}>
      <Navigation/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#B0B3B8',

  },
});

export default App;

