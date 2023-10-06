import React, {useState} from "react";
import { View,
         Text,
         StyleSheet,
         ScrollView} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"
import { useNavigation } from "@react-navigation/native";
import {useForm} from 'react-hook-form';


const ConfirmEmailScreen = () =>{
    const {control, handleSubmit} = useForm();

    const navigation = useNavigation();

    const onConfirmPress = (data) =>{
        console.warn(data);
        navigation.navigate('Home');
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }
    const onResendPress = () => {
        console.warn('resend')
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your Email</Text>

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