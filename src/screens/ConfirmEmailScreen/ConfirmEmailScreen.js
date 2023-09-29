import React, {useState} from "react";
import { View,
         Text,
         StyleSheet,
         ScrollView} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"


const ConfirmEmailScreen = () =>{
    const [Code, setCode] = useState('');

    const onConfirmPress = () =>{
        console.warn("onConfirmPress");
    }
    const onSignInPress = () => {
        console.warn("Sign In")
    }
    const onResendPress = () => {
        console.warn('resend')
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your Email</Text>

            <CustomInput
                placeholder="Enter the confirmation code"
                value={Code}
                setValue={setCode}
            />

            <CustomButton text="Confirm" onPress={onConfirmPress}/>
            
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