import React, {useState} from "react";
import { View,
         Text,
         StyleSheet,
         ScrollView} from "react-native";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton"
import { useNavigation } from "@react-navigation/native";


const NewUsernameScreen = () =>{
    const [Code, setCode] = useState('');
    const [newUsername, setNewUsername] = useState('');

    const navigation = useNavigation();

    const onSubmitPress = () =>{
        navigation.navigate('Home');
    }
    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Reset your Username</Text>

            <CustomInput
                placeholder="Code"
                value={Code}
                setValue={setCode}
            />

            <CustomInput
                placeholder="Enter your new Username"
                value={newUsername}
                setValue={setNewUsername}
            />

            <CustomButton 
                text="Submit"
                onPress={onSubmitPress}
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

export default NewUsernameScreen;