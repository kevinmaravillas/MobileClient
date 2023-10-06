import React, {useState} from "react";
import { View,
         Text,
         StyleSheet,
         ScrollView} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"
import { useNavigation } from "@react-navigation/native";
import {useForm} from 'react-hook-form';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const ForgotUsernameScreen = () =>{
    const {control, handleSubmit} = useForm();

    const navigation = useNavigation();

    const onSendPress = (data) =>{
        console.warn(data);
        navigation.navigate('NewUsername');
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Reset your Username</Text>

            <CustomInput
                name="Email"
                control={control}
                placeholder="Email"
                rules={{pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
            />

            <CustomButton
                text="Send"
                onPress={handleSubmit(onSendPress)}
            />
           
            <CustomButton 
                text="Back to Sign In"
                onPress={onSignInPress}
                type="Tertiary"
            />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    
    root:{
        alignItems: 'center',
        padding: 40,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text:{
        color:'black',
        marginVertical: 10
    },
    link: {
        color:'blue'
    }
});

export default ForgotUsernameScreen;