import React, { useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { USER_LOGGED_IN, createAlert } from "../__utils__";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../redux/dispatchers/Auth";
import { useDispatch, useSelector } from "react-redux";


const Splash = ({ navigation }) => {
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.Login);

    useEffect(() => {
        AsyncStorage.getItem(USER_LOGGED_IN)
            .then(data => {
                if (data) {
                    data = JSON.parse(data);
                    dispatch(login({ "email": data.email, "password": data.password }));
                } else {
                    setTimeout(() => {
                        navigation.replace("login");
                    }, 2000);
                }


            });

    }, []);

    useEffect(() => {
        if (loginData.success) {
            navigation.replace("dashboard");
        } else {
            if (loginData.message.length > 0) {
                navigation.replace("login");
                createAlert(loginData.message);
                AsyncStorage.removeItem(USER_LOGGED_IN);
            }
        }
    }, [loginData.message]);
    return (
        <View style={style.wrapper}>
            <View >
                <Image source={require("../assets/splash.png")} />
                <Text style={style.txt}>PS.</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginLeft: -40,
        backgroundColor: "#f6f7f9"

    },
    txt: {
        fontSize: 20,
        textAlign: "center",
        color: "#fbbc05",
        marginLeft: 40
    }
})

export default Splash;