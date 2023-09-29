import React, {useState} from "react";
import { View,
         Text,
         StyleSheet,
         ScrollView} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"


const SignUpScreen = () =>{
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [PasswordRepeat, setPasswordRepeat] = useState('');

    const onRegisterPress = () =>{
        console.warn("Registering");
    }
    const onSignInPress = () => {
        console.warn("Sign In")
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
                placeholder="Username"
                value={Username}
                setValue={setUsername}
            />
            <CustomInput
                placeholder="Email"
                value={Email}
                setValue={setEmail}
            />
            <CustomInput
                placeholder="Password"
                value={Password}
                setValue={setPassword}
                secureTextEntry={true}
            />
            <CustomInput
                placeholder="Confirm Password"
                value={PasswordRepeat}
                setValue={setPasswordRepeat}
                secureTextEntry={true}
            />

            <CustomButton text="Register" onPress={onRegisterPress}/>
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