import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import SignInScreen from './src/screens/SignInScreen';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello</Text>
//       <StatusBar style="auto" />
//     </View>
//   );a
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const App = () => {
  return(
    <SafeAreaView style={styles.root}>
      <SignInScreen></SignInScreen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rooot: {
    flex: 1,
  },
});

export default App;

