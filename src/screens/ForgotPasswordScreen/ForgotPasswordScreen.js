import React, {useState} from "react";
import { View,
         Text,
         StyleSheet,
         ScrollView,
         Alert} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"
import { useNavigation } from "@react-navigation/native";
import {useForm} from 'react-hook-form';
import { Auth } from "aws-amplify";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const ForgotPasswordScreen = () =>{
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();

    const onSendPress = async(data) =>{
        try{
            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPassword');
        } catch (ex){
            Alert.alert(ex.message);
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Reset your Username</Text>

            <CustomInput
                name="username"
                control={control}
                placeholder="username"
                rules={'username is invalid'}
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

export default ForgotPasswordScreen;