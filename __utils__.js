import AsyncStorage from "@react-native-async-storage/async-storage";
import { Clipboard, ToastAndroid } from "react-native";
import { APP_NOT_LOADING, APP_LOADING } from "./redux/Action"
import PushNotification from "react-native-push-notification";



export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_TOKEN ="USER_TOKEN";
export const BACKENDURL = "http://10.0.2.2:8000/";
// export const BACKENDURL = "https://psappapi.herokuapp.com/";
export const APP_NOTIFICATION_ID ="APP_NOTIFICATION_ID";
export const APP_NOTIFICATION_NAME ="APP_NOTIFICATION_NAME";
export const refreshControlColor = ["#fbbc05", "#4caf50", "#4285f4", "#000000"];

export const userLogout = async ()=>{
    await AsyncStorage.removeItem(USER_LOGGED_IN).then(()=>{AsyncStorage.removeItem(USER_TOKEN)});
}

export const dispatchAppLoadingState = state => {
    return dispatch => {
        if (state) {
            dispatch({ type: APP_LOADING });
        } else {
            dispatch({ type: APP_NOT_LOADING });
        }
    }
}



export const saveUserDataAsync = async data => {
    console.log("data")
    await AsyncStorage.setItem(USER_LOGGED_IN, JSON.stringify(data))

}

export const saveUserToKen = async data =>{
    
    await AsyncStorage.setItem(USER_TOKEN, data);
}


export const createAlert = message => {
    ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);
};

export const handleCopyRequest = password => {
    

    Clipboard.setString(password.value);
    
    PushNotification.localNotification({
        channelId: APP_NOTIFICATION_ID,
        title: "PS.",
        message: "Password Copied.",
        smallIcon: "../../../assets/splash.png"
    });

}