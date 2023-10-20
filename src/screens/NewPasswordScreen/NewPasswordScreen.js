import React, {useState} from "react";
import { View,
         Text,
         StyleSheet,
         ScrollView,
         Alert} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"
import { useNavigation } from "@react-navigation/native";
import {useForm} from "react-hook-form";
import { Auth } from "aws-amplify";


const NewPasswordScreen = () =>{
    const {control, handleSubmit} = useForm();
    const navigation = useNavigation();

    const onSubmitPress = async(data) =>{
        try{
            await Auth.forgotPasswordSubmit(data.username, data.code, data.password);
            navigation.navigate('SignIn');
        } catch (ex){
            Alert.alert(ex.message);
        }
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Reset your Password</Text>

            <CustomInput
                name="username"
                control={control}
                placeholder="Username"
                rules={{
                    required: 'Username is required'
                }}
            />

            <CustomInput
                name="code"
                control={control}
                placeholder="Code"
                rules={{
                    required: 'Code is required'
                }}
            />

            <CustomInput
                name="password"
                control={control}
                placeholder="Enter your new Password"
                rules={{
                    required: 'A new password is required'
                }}
            />

            <CustomButton 
                text="Submit"
                onPress={handleSubmit(onSubmitPress)}
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

export default NewPasswordScreen;