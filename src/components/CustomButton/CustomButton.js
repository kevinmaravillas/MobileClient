import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const CustomButton = ({onPress, text, type = "Primary"}) =>{
    return(
        <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
            <Text style={[styles.text, styles[`text_${type}`]]}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_Primary:{
        backgroundColor: '#3B71F3',
    },
    container_Secondary:{
        borderColor: '#3B71F3',
        borderWidth: 2,
    },
    container_Tertiary:{

    },
    text: {
        fontWeight: 'bold',
        color: 'white'
    },
    text_Secondary:{
        color: '#3B71F3'
    },
    text_Tertiary:{
        color: 'black'
    },
});

export default CustomButton;