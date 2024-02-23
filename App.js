import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Navigation from "./src/navigation";
import { Amplify } from "aws-amplify";
import config from "./src/aws-exports";

Amplify.configure(config);

const App = () => {
  return (
    <>
      <View style={styles.root}>
        <Navigation />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: '#B0B3B8',
  },
});

export default App;
