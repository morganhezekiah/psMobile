import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, RefreshControl, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUserPassword } from "../../../redux/dispatchers/Password";
import { createAlert, refreshControlColor, userLogout } from "../../../__utils__";
import Style from "../../../styles/Auth";
import SinglePassword from "./SinglePassword";
import PasswordForm from "./PasswordForm";


const ListPassword = ({ navigation }) => {
    const dispatch = useDispatch();
    const passwords = useSelector(state => state.GetUserPassword);
    const [listPassword, setListPassword] = useState([]);
    const [loading, setLoading] = useState(true);
    const [passwordCurentlyEditting, setPasswordCurrentlyEditting] = useState({});
    const addPasswordData = useSelector(state => state.AddUserPassword);
    const editPasswordData = useSelector(state => state.EditPassword);
    const deletePasswordData = useSelector(state =>state.DeletePassword)
    const [editPassword, setEditPassword] = useState(false);
    const [refreshingPasswordList, setRefreshingPasswordList] = useState(false);

    useEffect(() => {
        dispatch(getUserPassword());
    }, []);

    
    useEffect(() => {
        if (passwords.success) {
            setListPassword(passwords.passwords);
            setLoading(false);
        
        } else {
            if (passwords.message.length > 0) {
                createAlert(passwords.message);
            }
        }
    }, [passwords]);



    //RUNS WHEN EDIT PASSWORD IS SUCCESSFULLY
    useEffect(() => {
        if (editPasswordData.success) {
            dispatch(getUserPassword());
            setEditPassword(false);
            createAlert("Password editted successfully");

        } else {
            if (editPasswordData.message.length > 0) {
                createAlert(editPasswordData.message);
            }
        }
    }, [editPasswordData]);

    useEffect(()=>{
        if(deletePasswordData.success){
        dispatch(getUserPassword());
        }
    }, [deletePasswordData]);

    useEffect(()=>{
        if(addPasswordData.success){
            dispatch(getUserPassword());
        }
    }, [addPasswordData]);



    const deletePasswordRequest = id => {
        setListPassword(listPassword.filter(p => p.id != id));
    }

    const handleRefreshPasswordList = () => {
        setRefreshingPasswordList(true);
        dispatch(getUserPassword());
        setRefreshingPasswordList(false);

    }

    const handleShowEditPasswordModal = password => {
        setPasswordCurrentlyEditting(password);
        setEditPassword(true);
    }

    

    return (
        loading ?
            <View style={style.wrapper}>
                <View>
                    <ActivityIndicator size="large" colors={ refreshControlColor } />
                </View>
            </View> :
            passwords.count > 0 ?
                <>
                    <Modal
                        transparent={true}
                        visible={editPassword}

                    >
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#00000067", padding: 20, }}>
                            <View style={{ width: "100%", padding: 20, borderRadius: 5, backgroundColor: "#ffffff", position: "relative" }}>

                                <PasswordForm
                                    hideModal={() => { setEditPassword(false) }}
                                    password={passwordCurentlyEditting}
                                     />
                            </View>
                        </View>
                    </Modal>
                    <View style={{ flex: 1 }}>
                        <View>
                            <Text style={[{ marginTop: 20, }, Style.title]}>{addPasswordData.count}Passwords</Text>
                            <FlatList
                                data={listPassword}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (<SinglePassword deletePasswordRequest={deletePasswordRequest}
                                    handleShowEditPasswordModal={handleShowEditPasswordModal}
                                    password={item}
                                    >

                                </SinglePassword>)}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshingPasswordList}
                                        colors={refreshControlColor}
                                        onRefresh={handleRefreshPasswordList}
                                    />
                                }
                            />



                        </View>
                        
                    </View>
                </> :
                <View style={style.wrapper}>
                    <TouchableOpacity  onPress={()=>{ navigation.navigate("addPassword")}}>
                        <Text style={[{ marginTop: 20, }, Style.title]}>You do not have any saved password, yet.</Text>
                    </TouchableOpacity>
                </View>
    )
}


const style = StyleSheet.create({
    wrapper: {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center"
    },
    floatBtn: {
        position: "absolute",
        bottom: 20,
        right: 10,
        padding: 20,
        backgroundColor: "#34a853",
        borderRadius: 40,
        elevation: 10
    }
})

export default ListPassword;