import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Style from "../../../styles/Auth";
import { useSelector, useDispatch } from "react-redux";
import { createAlert, dispatchAppLoadingState } from "../../../__utils__";
import { addPassword } from "../../../redux/dispatchers/Password";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const AddPassword = ({ navigation }) => {
    let BUTTON_LOADING = false;
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ acct_name: "", acct_id: "", acct_pass: "" });
    const addPasswordData = useSelector(state => state.AddUserPassword);
    const [ seePassword, setSeePassword ] = useState(false);
    const [ loading, setLoading ] = useState(false);


    const handleAddPassword = async () => {
        setLoading(true);
        if (formData.acct_name.length < 1) {
            createAlert("Please enter Account name");
        }  else if (formData.acct_pass.length < 1) {
            createAlert("Please enter Account Password");
        }
        else {
            //SET APPLOADING STATE TO TRUE
            dispatch(dispatchAppLoadingState(true));
            //MAKE LOGIN REQUESTS
            await dispatch(addPassword({ "value": formData.acct_pass, "acct": formData.acct_name, "acct_id": formData.acct_id }));
            //RESET APPLOADING STATE TO TRUE
            dispatch(dispatchAppLoadingState(false));
        }
    }

    useEffect(() => {
        if (addPasswordData.success) {
            setFormData({ "acct_name": '', "acct_id": "", "acct_pass": "" });
            navigation.navigate("listPassword");
        }
    }, [addPasswordData]);

    useEffect(() => {
        setLoading(false);
        if (addPasswordData.message.length > 0) {
            createAlert(addPasswordData.message);
        }
    }, [addPasswordData]);

    return (
        < View style={Style.mainWrapper} >

            <View style={Style.subWrapper}>
                <View><Text style={Style.title}>Add Password</Text></View>
                <View>
                    <Text style={Style.form.text}>Account Name</Text>
                    <TextInput
                        style={Style.form.inputText}
                        placeholder="eg. Facebook, Google"
                        value={formData.acct_name}
                        onChangeText={text => { setFormData({ ...formData, acct_name: text }) }}
                    />
                </View>


                <View>
                    <Text style={Style.form.text}>Account ID</Text>
                    <TextInput
                        style={Style.form.inputText}
                        placeholder="eg. Account Username (optional)"
                        value={formData.acct_id}
                        onChangeText={text => { setFormData({ ...formData, acct_id: text }) }}
                    />
                </View>


                {/* VIEW PASSWORD DIV */}
                <View style={[Style.form.wrapper,{ position:"relative"}]}>
                    <Text style={Style.form.text}>Account Password</Text>
                    <TextInput
                        style={Style.form.inputText}
                        placeholder="ie Account Password"
                        value={formData.acct_pass}
                        onChangeText={text => { setFormData({ ...formData, acct_pass: text }) }}
                        secureTextEntry= { !seePassword }
                    />
                    <FontAwesome5 name="eye" size={ 20 } color="#000000" style={{ position:"absolute", top:"57%", right:20}} onPress={()=>{ setSeePassword(!seePassword)}} />
                </View>

                <TouchableOpacity disabled={ loading } style={[Style.form.btn.main, { padding: 10 }]} disabled={ loading } onPress={handleAddPassword}>
                    <Text style={{ textAlign: "center", color: "#ffffff" }}>Add Password</Text>
                </TouchableOpacity>

            </View>
        </View >
    )
}



export default AddPassword;