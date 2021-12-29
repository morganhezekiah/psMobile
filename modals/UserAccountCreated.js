import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { Text, View, TouchableOpacity,Linking, Image  } from "react-native"
import Style from "../styles/Modals";
import { useSelector } from "react-redux";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

const UserAccountCreated = () => {
    const  [ openModal, setOpenModal ] = useState(false);
    const signUpData = useSelector(state => state.SignUp);

    useEffect(()=>{
        setOpenModal(signUpData.success);
    }, [signUpData]);

    return (
        <Modal isVisible={ openModal } style={Style.modal} animationInTiming={600}>
            <View style={Style.modalContainer}>
                <FontAwesome5Icon onPress={()=>{ setOpenModal(false); }} style={{position:"absolute", top:15, right:30}} name="times" size={ 20 } color="#000000" />
                <Image  source={ require("../assets/success.png")} style={{ height:60, marginTop:20, marginBottom:20}} />
                <Text style={Style.txt} >Congrats, account created successfully.</Text>
                <Text style={Style.txt}>Please check your email to activate your account.</Text>
                <TouchableOpacity onPress={()=>{ Linking.openURL("http://google.com")}} style={[Style.button, {marginTop:5}]}>
                    <Text style={Style.buttonText}> Open Email</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}




export default UserAccountCreated;