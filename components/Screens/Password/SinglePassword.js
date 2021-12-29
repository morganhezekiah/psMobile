import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated, Dimensions } from "react-native";
import Style from "../../../styles/Auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { createAlert, handleCopyRequest } from "../../../__utils__";
import { useDispatch, useSelector } from "react-redux";
import { deletePassword } from "../../../redux/dispatchers/Password";
import CheckBox from "react-native-check-box";


const SCREEN_WIDTH = Dimensions.get("screen").width;

const SinglePassword = ({ password, deletePasswordRequest, handleShowEditPasswordModal }) => {
    const TouchableOpacityAnimated = Animated.createAnimatedComponent(TouchableOpacity);
    const deletedPasswordScale = new Animated.Value(0);
    const editPasswordScale = new Animated.Value(1);
    const dispatch = useDispatch();
    const addPasswordData = useSelector(state => state.AddUserPassword);
    const [ seeingPasswordValue, setSeeingPasswordValue ] = useState(false);
    const EditPasswordData = useSelector(state => state.EditPassword);


    const toggleSuccessScale = () => {
        Animated.spring(editPasswordScale, {
            toValue: 1.1,
            friction: 2,
            useNativeDriver: true
        }).start(() => {
            Animated.spring(editPasswordScale, {
                toValue: 1,
                friction: 2,
                useNativeDriver: true
            }).start()
        })
    }


    useEffect(() => {
        if (EditPasswordData.password.id === password.id) {
            toggleSuccessScale();
        }
    }, [EditPasswordData.password]);


    useEffect(() => {
        setTimeout(() => {
            if (addPasswordData.passwords.id === password.id) {
                toggleSuccessScale();
            }
        }, 1000);
    }, [addPasswordData.passwords]);

    const handleContinueDelete = async () => {
        await dispatch(deletePassword(password.id));
        Animated.spring(deletedPasswordScale, {
            toValue: (SCREEN_WIDTH / 2),
            useNativeDriver: true
        }).start();
        setTimeout(() => {
            deletePasswordRequest(password.id);
            createAlert("Password deleted successfully");
        }, 1);
    }

    const handleDeleteRequest = () => {
        Alert.alert("Confirmation", `Are you sure you want to delete password for '${password.acount_name}' account`, [
            { text: "CANCEL", },
            { text: "YES", onPress: () => { handleContinueDelete() } },

        ], {
            cancelable: true
        });
    }

    return (
        <TouchableOpacityAnimated onPress={() => { handleShowEditPasswordModal(password) }} style={{
            transform: [
                { translateX: deletedPasswordScale },
                { scale: editPasswordScale }
            ]
        }}>
            <View style={style.detailsWrapper}>
                <View>
                    <View>
                        <View style={{ display: "flex",flexDirection:"row", alignItems:"center" }}>
                            <Text style={[Style.heavyText, { "font-weight": "bold" }]}>{seeingPasswordValue ? password.value : "xxx-xxx-xxx"}</Text>
                            <CheckBox
                             isChecked={ seeingPasswordValue }
                             checkBoxColor ="#fbbc05"
                             uncheckedCheckBoxColor ="#4caf50"
                             onClick={()=>{ setSeeingPasswordValue(!seeingPasswordValue)}} style={{"marginLeft":10, borderRadius:1,borderColor:"#ffffff"}} />
                        </View>

                        <View style={style.flexDisplay}>
                            <View><Text style={Style.greyText}>{password.value_id == "" ?"__":password.value_id }</Text></View>
                            <View><Text style={[Style.greyText, { marginLeft: 10 }]}>{password.acount_name}</Text></View>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ display: "flex", alignItems: "space-between" }}>
                        <TouchableOpacity onPress={() => { handleCopyRequest(password) }}>
                            <FontAwesome5 name="copy" size={20} color="#00000067" />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 20 }} onPress={handleDeleteRequest}>
                            <FontAwesome5 name="ban" size={20} color="#00000067" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={style.underline}>
            </View>
        </TouchableOpacityAnimated>
    )
}


const style = StyleSheet.create({
    wrapper: {

    },
    detailsWrapper: {
        padding: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    underline: {
        width: "100%",
        height: 1,
        elevation: 1,
        backgroundColor: "#00000067"
    },
    flexDisplay: {
        display: "flex",
        flexDirection: "row",
    }
})


export default SinglePassword;



