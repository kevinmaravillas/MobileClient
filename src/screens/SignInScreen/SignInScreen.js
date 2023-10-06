import React, {useState} from "react";
import { View, 
         Image, 
         StyleSheet, 
         useWindowDimensions,
         ScrollView,
         Alert,
         TextInput} from "react-native";
import Logo from '../../../assets/images/robotLogo.png';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"
import { useNavigation } from "@react-navigation/native";
import {useForm, Controller} from 'react-hook-form';
import { Auth } from "aws-amplify";


const SignInScreen = () =>{
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const{
        control,
        handleSubmit,
        formState: {errors}
    }= useForm();

    const onSignInPress = async(data) =>{
        if(loading){
            return;
        }

        setLoading(true);
        try{
            const response = await Auth.signIn(data.Username, data.Password);
            console.log(response);

        }catch(ex){
            Alert.alert('Ooops', ex.message);
        }
        setLoading(false);


        //Validate User
        // navigation.navigate('Home');
    }

    const onForgotUsernamePress = () => {
        navigation.navigate('ForgotUsername');
    }

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain"
            />

            <CustomInput
                name="Username"
                placeholder="Username"
                control={control}
                rules={{required: 'Username is required'}}
            />
            <CustomInput
                name="Password"
                placeholder="Password"
                secureTextEntry={true}
                control={control}
                rules={{required: 'Password is required'}}
            />

            <CustomButton 
                text={loading ? "Loading..." : "Sign In"}
                onPress={handleSubmit(onSignInPress)}
            />
            <CustomButton 
                text="Forgot Username?"
                onPress={onForgotUsernamePress}
                type="Tertiary"
            />

            <CustomButton 
                text="Dont have an account? Create one"
                onPress={onSignUpPress}
                type="Tertiary"/>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    
    root:{
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'grey'
    },
    logo: {
        width : '20%',
        maxWidth: 300,
        maxHeight: 150
    },
});

export default SignInScreen