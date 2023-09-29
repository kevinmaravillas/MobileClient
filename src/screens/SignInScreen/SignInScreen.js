import React, {useState} from "react";
import { View, 
         Image, 
         StyleSheet, 
         useWindowDimensions,
         ScrollView} from "react-native";
import Logo from '../../../assets/images/robotLogo.png';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"


const SignInScreen = () =>{
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const onSignInPress = () =>{
        console.warn("Sign In");
    }

    const onForgotPasswordPress = () => {
        console.warn("Forgot Password")
    }

    const onSignUpPress = () => {
        console.warn("Creating a new account!")
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain"
            />
            {/* <Text>Hello</Text> */}

            <CustomInput
                placeholder="Username"
                value={Username}
                setValue={setUsername}
            />
            <CustomInput
                placeholder="Password"
                value={Password}
                setValue={setPassword}
                secureTextEntry={true}
            />

            <CustomButton text="Sign In" onPress={onSignInPress}/>
            <CustomButton text="Forgot password?" onPress={onForgotPasswordPress} type="Tertiary"/>

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
    },
    logo: {
        width : '20%',
        maxWidth: 300,
        maxHeight: 150
    },
});

export default SignInScreen