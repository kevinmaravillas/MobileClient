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
import {useRoute} from '@react-navigation/native';

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const SignUpScreen = () =>{

    const {control, handleSubmit, watch}= useForm();

    const pwd = watch('password');

    const navigation = useNavigation();



    const onRegisterPress = async(data) =>{
        const {username, password, email, name} = data;
        try{
            await Auth.signUp({
                username,
                password,
                attributes: {email, name, preferred_username: username}
            });
            navigation.navigate('ConfirmEmail', {username});
        } catch(ex){
            Alert.alert('Ooops', ex.message);
        }

    
    }


    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }
    const onTermsofUsePress = () => {
        console.warn("Terms Of Use")
    }
    const onPrivacyPolicyPress = () => {
        console.warn("Privacy Policy")
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>
            
            <CustomInput
                name="name"
                control={control}
                placeholder="Name"
                rules={{required: 'Name is required'}}
            />

            <CustomInput
                name="username"
                placeholder="Username"
                control={control}
                rules={{required: 'Username is required'}}
            />
            <CustomInput
                name="email"
                control={control}
                placeholder="Email"
                rules={{pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
            />
            <CustomInput
                name="password"
                control={control}
                placeholder="Password"
                secureTextEntry={true}
                rules={{required: 'Password is required', 
                        minLength: {
                            value: 8,
                            message: 'Password should be at least 8 Characters long'
                        }}}
            />
            <CustomInput
                name="Password-Repeat"
                control={control}
                placeholder="Confirm Password"
                secureTextEntry={true}
                rules={{
                    validate: value => value == pwd || 'Password does not match'
                }}
            />

            <CustomButton text="Register" onPress={handleSubmit(onRegisterPress)}/>

            <Text style={styles.text}>
                By registering, you confirm that you accept our{' '}
                <Text style={styles.link} onPress={onTermsofUsePress}>
                    Terms of Use
                </Text>
                {' '}and{' '}
                <Text style={styles.link} onPress={onPrivacyPolicyPress}>
                    Privacy Policy
                </Text>
            </Text>
            <CustomButton 
                text="Have an account? Sign In"
                onPress={onSignInPress}
                type="Tertiary"/>
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

export default SignUpScreen