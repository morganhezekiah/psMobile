import { USER_LOGIN_SUCCESS, USER_LOGIN_ERROR, USER_SIGNUP_SUCCESS, USER_SIGNUP_ERROR } from "../Action";
import { BACKENDURL, saveUserToKen } from "../../__utils__";
import ServerError from "./ServerError";

export const signUp = data => dispatch => {
    let error;
    let url = `${BACKENDURL}user/signUp`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status > 299) {
                error = true;
            } else {
                error = false;
            }

            return res.json();
        })
        .then(data => {
            if (error) {
                dispatch({
                    type: USER_SIGNUP_ERROR,
                    payload: {"message":data.message}
                });
            } else { 
                dispatch({
                    type: USER_SIGNUP_SUCCESS,
                    payload: {"user":data.data.user,"message":data.message}
                })
            }
        })
        .catch(error => {
            dispatch(ServerError());
            console.log("There was an error");
            throw error;
        })
}


export const login = data => dispatch => {
    let error;
    let url = `${BACKENDURL}user/login`;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status > 299) {
                error = true;
            } else {
                error = false;
            }
            return res.json();
        })
        .then(data => {
            if (error) {
                dispatch({
                    type: USER_LOGIN_ERROR,
                    payload: {"message":data.message}
                });
            } else {
                saveUserToKen(data.data.token);
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: {"user":data.data.user,"message":data.message}
                })
            }
        })
        .catch(error => {
            dispatch(ServerError());
            console.log("There was an error");
            throw error;
        })
}
