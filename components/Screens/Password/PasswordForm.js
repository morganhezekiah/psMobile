import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";
import Style from "../../../styles/Auth";
import { handleCopyRequest, createAlert } from "../../../__utils__";
import { editPassword  } from "../../../redux/dispatchers/Password";




const PasswordForm = ({ password, hideModal }) => {
    const [formData, setFormData] = useState({ acct_name: "", acct_id: "", acct_pass: "" });
    const [ seePassword, setSeePassword ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const editPasswordData = useSelector(state => state.EditPassword);
    const dispatch = useDispatch();


    useEffect(() => {
        setFormData({ acct_name: password.acount_name, acct_id: password.value_id, acct_pass: password.value });

    }, []);

    useEffect(() => {
        setLoading(false);
    }, [editPasswordData]);

    const handleEditPassword = () => {
        setLoading(true);
        const { acct_id, acct_name, acct_pass } = formData;

        if (acct_name.length < 1) {
            createAlert("Please enter Account name");
        } else if (acct_pass.length < 1) {
            createAlert("Please enter Account password");
        }else {
            dispatch(editPassword(password.id, formData));
        }
    }
    return (
        <>
            <View ><Text style={Style.title}>Edit  Password</Text>

                <FontAwesome5 name="times" onPress={() => { hideModal() }} style={{ position: "absolute", top: 0, right: 10 }} size={25} color="#000000" />
            </View>
            <View>
                <Text style={Style.form.text}>Account Name</Text>
                <TextInput
                    style={Style.form.inputText}
                    placeholder="eg. Facebook, Google"
                    value={formData.acct_name}
                    onChangeText={text => { setFormData({ ...formData, acct_name: text }) }}
                />
            </View>


            <View >
                <Text style={Style.form.text}>Account ID</Text>
                <TextInput
                    style={Style.form.inputText}
                    placeholder="eg. Account Username"
                    value={formData.acct_id}
                    onChangeText={text => { setFormData({ ...formData, acct_id: text }) }}
                />
                
            </View>


            {/* VIEW PASSWORD DIV */}
            <View style={[Style.form.wrapper,{position:"relative"}]}>
                <Text style={Style.form.text}>Account Password</Text>
                <TextInput
                    style={Style.form.inputText}
                    placeholder="ie Account Password"
                    value={formData.acct_pass}
                    secureTextEntry={ !seePassword }
                    onChangeText={text => { setFormData({ ...formData, acct_pass: text }) }}
                />
                <FontAwesome5 onPress={()=>{ setSeePassword(!seePassword)}} style={{position:"absolute", top:"59%", right:10}} name="eye" size={ 20 } color="#000000" />
            </View>

            <TouchableOpacity style={[Style.form.btn.main, { padding: 10 }]} disabled={ loading } onPress={ handleEditPassword }>
                <Text style={{ textAlign: "center", color: "#ffffff" }}><FontAwesome5 name="pen" style={{ marginLeft: 10 }} size={20} color="#ffffff" /> Edit Password</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { handleCopyRequest(password) }} style={Style.form.btn.main, [{ backgroundColor: "#f2f2f2", marginTop: 10, padding: 10 }]}>
                <Text style={{ textAlign: "center", color: "#000000" }}><FontAwesome5 name="copy" style={{ marginLeft: 10 }} size={20} color="#000000" />COPY</Text>
            </TouchableOpacity>
        </>
    )


}

export default PasswordForm;