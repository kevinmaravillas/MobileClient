import React from "react";
import { View, Text, Image, StyleSheet} from "react-native";
import Logo from '../../../assets/images/robotLogo.png';

const SignInScreen = () =>{
    return(
        <View style={styles.root}>
            <Image source={Logo} style={styles.logo} resizeMode="contain"/>
        </View>
    )
}

const styles = StyleSheet.create({
    
    root:{
        alignItems: 'center',
        padding: 10
    },
    logo: {
        width : '20%',
        maxHeight: 300,
        height :300
    },

    
});

export default SignInScreen