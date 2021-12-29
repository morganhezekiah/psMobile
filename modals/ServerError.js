import React, { useEffect, useReducer } from "react";
import Modal from "react-native-modal";
import { Text, View, BackHandler } from "react-native"
import Style from "../styles/Modals";
import { useSelector, useDispatch } from "react-redux";
import { SERVER_ERROR_RESTART } from "../redux/Action";

let DECREASE_SHUTDOWN_TIME ="DECREASE_SHUTDOWN_TIME";
const initialState = 6;
const reducer = (state, action ) =>{
    switch(action.type){
        case DECREASE_SHUTDOWN_TIME:
            return state-1;
        default: return initialState;
            
    }
}

const NoNetworkConnection = () => {
    const ServerErrorData = useSelector(state => state.ServerError);
    const dispatch = useDispatch();
    const [ shutDownTime, dispatchShutDownTime ] = useReducer(reducer, initialState);
    useEffect(()=>{
        if(ServerErrorData.error){
            setInterval(() => {
                dispatchShutDownTime({type:DECREASE_SHUTDOWN_TIME});
            }, 1000);
            setTimeout(() => {
                dispatch({type:SERVER_ERROR_RESTART});
                BackHandler.exitApp();
            }, 5000);
            
        }
        
    }, [ServerErrorData]);

    useEffect(()=>{
        return ()=>{
            window.clearInterval();
        }
    })

    return (
        <Modal isVisible={ ServerErrorData.error } style={Style.modal} animationInTiming={600}>
            <View style={ Style.modalContainer }>
                <Text style={ Style.h4 }>500</Text>
                <Text style={ Style.txt } >Sorry, there was a server error </Text>
                <Text style={ Style.txt }>Application will short down after { shutDownTime } seconds</Text>
            </View>
        </Modal>
    )
}




export default NoNetworkConnection;