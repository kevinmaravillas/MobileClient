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

const SignUpScreen = () =>{

    const {control, handleSubmit, watch}= useForm();

    const pwd = watch('Password');

    const navigation = useNavigation();

    const onRegisterPress = () =>{
        navigation.navigate('ConfirmEmail');
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
                name="Username"
                control={control}
                placeholder="Username"
                rules={{required: 'Username is required'}}
            />
            <CustomInput
                name="Email"
                control={control}
                placeholder="Email"
                rules={{pattern: {value: EMAIL_REGEX, message: 'Email is invalid'}}}
            />
            <CustomInput
                name="Password"
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