import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import {  Text, View, TouchableOpacity } from "react-native"
import Style from "../styles/Modals";
import { useNetInfo } from "@react-native-community/netinfo";
import { GRAY_COLOR, PRIMARY_COLOR } from "../__colors__";

const NoNetworkConnection = ({ isVisible }) => {
    const netInfo = useNetInfo();
    const [isRetrying, setIsRetrying] = useState(false);
    useEffect(() => {
        if (isRetrying) {
            setTimeout(() => {
                setIsRetrying(false);
            }, 3000);
        }
    }, [isRetrying])
    return (
        <Modal isVisible={ !netInfo.isConnected } style={Style.modal} animationInTiming={600}>
            <View style={Style.modalContainer}>
                <Text style={Style.modalTitle}>Connection Error</Text>
                <Text style={Style.modalText}>
                    Oops! Looks like your device is not connected to the Internet.
                </Text>
                    <TouchableOpacity style={ [Style.button, { backgroundColor:isRetrying ? GRAY_COLOR : PRIMARY_COLOR }] }  onPress={() => { setIsRetrying(true) }} disabled={isRetrying}>
                        <Text style={ Style.buttonText }> {isRetrying ? " Retrying " : "Try Again"} </Text>
                    </TouchableOpacity>
            </View>
        </Modal>
    )
}




export default NoNetworkConnection;