import { GET_USER_PASSWORDS_SUCCESS, GET_USER_PASSWORDS_ERROR, ADD_PASSWORD_SUCCESS, ADD_PASSWORD_ERROR, DELETE_PASSWORD_ERROR, DELETE_PASSWORD_SUCCESS, EDIT_PASSWORD_ERROR, EDIT_PASSWORD_SUCCESS, } from "../Action";
import { BACKENDURL, USER_TOKEN } from "../../__utils__";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "./AppLoading";
import ServerError from "./ServerError";

export const getUserPassword = () => dispatch => {
    let error;
    let url = `${BACKENDURL}password/`;
    dispatch(AppLoading(true));
    AsyncStorage.getItem(USER_TOKEN)
        .then(data => {
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${data}`
                },
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
                    dispatch(AppLoading(false));
                    if (error) {
                        dispatch({
                            type: GET_USER_PASSWORDS_ERROR,
                            payload: { "message": "Error retrieving user passwords, plase try again." }
                        });
                    } else {

                        dispatch({
                            type: GET_USER_PASSWORDS_SUCCESS,
                            payload: { "passwords": data.passwords, "count": data.count, "message": data.message }
                        });
                        
                    }
                })
                .catch(error => {
                    dispatch(ServerError());
                    console.log("There was an error");
                    throw error;
                })
        });

}




export const addPassword = data => dispatch => {
    let error;
    let url = `${BACKENDURL}password/`;
    dispatch(AppLoading(true));
    AsyncStorage.getItem(USER_TOKEN)
        .then(token => {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${token}`
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
                    dispatch(AppLoading(false));
                    if (error) {
                        dispatch({
                            type: ADD_PASSWORD_ERROR,
                            payload: { "message": data.message }
                        });
                    } else {
                        dispatch({
                            type: ADD_PASSWORD_SUCCESS,
                            payload: { "password": data.data.password, "message": data.message }
                        });

                       
                    }
                })
                .catch(error => {
                    dispatch(ServerError());
                    console.log("There was an error");
                    throw error;
                });
        });


}


export const deletePassword = id => dispatch => {
    let error;
    let url = `${BACKENDURL}password/${id}`;
    dispatch(AppLoading(true));
    AsyncStorage.getItem(USER_TOKEN)
        .then(token => {
            fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${token}`
                },
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
                    dispatch(AppLoading(false));
                    if (error) {
                        dispatch({
                            type: DELETE_PASSWORD_ERROR,
                            payload: { "message": data.message }
                        });
                    } else {
                        dispatch({
                            type: DELETE_PASSWORD_SUCCESS,
                            payload: { "password": data.password, "message": data.message }
                        });
                        
                    }
                })
                .catch(error => {
                    dispatch(ServerError());
                    console.log("There was an error");
                    throw error;
                });
        });
}


export const editPassword = (id, data) => dispatch => {
    let error;
    let url = `${BACKENDURL}password/${id}`;
    dispatch(AppLoading(true));
    AsyncStorage.getItem(USER_TOKEN)
        .then(token => {
            fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify({ "value": data.acct_pass, "acct": data.acct_name, "acct_id": data.acct_id })
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
                    dispatch(AppLoading(false));
                    if (error) {
                        dispatch({
                            type: EDIT_PASSWORD_ERROR,
                            payload: { "message": data.message }
                        });
                    } else {
                        dispatch({
                            type: EDIT_PASSWORD_SUCCESS,
                            payload: { "password": data.data.password, "message": data.message }
                        });
                    }
                })
                .catch(error => {
                    dispatch(ServerError());
                    console.log("There was an error");
                    throw error;
                });
        });
}