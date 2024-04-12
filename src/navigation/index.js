import { View, Text, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import { Auth, Hub } from 'aws-amplify';



const Navigation = () => {

<<<<<<< Updated upstream
  const checkUser = async() => {
    try{
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
    } catch (ex){
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === 'signIn' || data.payload.event === "signOut"){
        checkUser();
      }
    }
    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  if (user === undefined){
    <view style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator/>
    </view>
  }

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {user ? (
            <Stack.Screen name="Home" component={HomeScreen} />
          ):(
            <>
              <Stack.Screen name="SignIn" component={SignInScreen}/>
              <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen}/>
              <Stack.Screen name='NewPassword' component={NewPasswordScreen}/>
              <Stack.Screen name="SignUp" component={SignUpScreen}/>
              <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
            </>
          )}
=======
const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="SelectorScreen"  component={SelectorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
>>>>>>> Stashed changes

            
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;