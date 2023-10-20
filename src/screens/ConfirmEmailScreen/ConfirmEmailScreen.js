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
import {useRoute} from '@react-navigation/native';
import { Auth } from "aws-amplify";

const ConfirmEmailScreen = () =>{
    const route = useRoute();
    const {control, handleSubmit, watch} = useForm({
        defaultValues: {username: route?.params?.username},
    });

    const username = watch('username');

    const navigation = useNavigation();

    const onConfirmPress = async(data) =>{
        try{
            await Auth.confirmSignUp(data.username, data.code);
            navigation.navigate('SignIn');
        } catch (ex){
            Alert.alert(ex.message);
        }
    };
    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };
    const onResendPress = async() => {
        try{
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'Code was resent to your email.');
        } catch (ex){
            Alert.alert(ex.message);
        }
    };

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your Email</Text>

            <CustomInput
                name="username"
                control={control}
                placeholder="Enter Username"
                rules={{
                    required: 'Username is required'
                }}
            />

            <CustomInput
                name="code"
                control={control}
                placeholder="Enter the confirmation code"
                rules={{
                    required: 'Confirmation code is required'
                }}
            />

            <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPress)}/>
            
            <CustomButton 
                text="Resend Code"
                onPress={onResendPress}
                type="Secondary"
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

export default ConfirmEmailScreen