import React,{ useEffect } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";


const Loader = ({ navigation })=>{
    useEffect(()=>{
        setTimeout(() => {
            navigation.replace("auth");
        }, 3000);
    },[]);
    return (
        <View style={style.wrapper}>
            <Text style={style.text}>Loading...</Text>
        </View>
    )
}

const style = StyleSheet.create({
    wrapper :{
        flex: 1,
        justifyContent:"center",
        alignItems:"center"
    },
    text:{
        fontSize:25,
        fontFamily:"Poppins"
    }
});

export default Loader;