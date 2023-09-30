import React, {useState} from "react";
import { View,
         Text,
         StyleSheet,
         ScrollView} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"
import { useNavigation } from "@react-navigation/native";


const ForgotUsernameScreen = () =>{
    const [Email, setEmail] = useState('');
    const navigation = useNavigation();

    const onSendPress = () =>{
        navigation.navigate('NewUsername');
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Reset your Username</Text>

            <CustomInput
                placeholder="Email"
                value={Email}
                setValue={setEmail}
            />

            <CustomButton text="Send" onPress={onSendPress}/>
           
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

export default ForgotUsernameScreen;