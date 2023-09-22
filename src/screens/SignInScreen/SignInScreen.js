import React, {useState} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions} from "react-native";
import Logo from '../../../assets/images/robotLogo.png';
import CustomInput from "../../components/CustomInput/CustomInput";
import { useState } from "react";


const SignInScreen = () =>{
    const [Username, setUsername] = userState('');
    const [Password, setPassword] = userState('');

    const {height} = useWindowDimensions();


    return(
        <View style={styles.root}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain"
            />
            <Text>Hello</Text>

            <CustomInput
                placeholder="Username"
                value={Username}
                setValue={setUsername}
            />
            <CustomInput
                placeholder="Password"
                value={Password}
                setValue={setPassword}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    
    root:{
        alignItems: 'center',
        padding: 10,

    },
    logo: {
        width : '20%',
        maxWidth: 300,
        maxHeight: 150
    },

    
});

export default SignInScreen