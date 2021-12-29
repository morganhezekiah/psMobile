import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Style from "../../../styles/Auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



const UserDetails = ({ navigation })=>{
    return (
        <>
        <View>
            <Text>User Details</Text>
            
        </View>
        <TouchableOpacity  onLongPress={ ()=>{userLogout();navigation.navigate("login")} } onPress={()=>{ navigation.navigate("userDetails")}} style={Style.floatBtn}><Text style={{ color:"#ffffff"}}>Logout</Text></TouchableOpacity>
        </>
    )
}

export default UserDetails;