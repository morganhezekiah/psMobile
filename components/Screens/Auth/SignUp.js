import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Style from "../../../styles/Auth";
import { createAlert, dispatchAppLoadingState } from "../../../__utils__";
import { signUp } from "../../../redux/dispatchers/Auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [seeingPassword, setSeeingPassword] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const signUpData = useSelector(state => state.SignUp);


  //IF THERE IS A CHANGE IN LOGIN REDUX ACTIONS
  useEffect(() => {
    setLoading(false);
    if (signUpData.message.length > 0) {
      createAlert(signUpData.message);
    }
    
  }, [signUpData]);

  useEffect(()=>{
    
    if(signUpData.success){
      setFormData({email:"", password:""});
    }
  }, [ signUpData.success ])





  const handleRegisterRequest = async () => {
    if (formData.email.length < 1) {
      createAlert("Please enter your email");
    } else if (formData.password.length < 1) {
      createAlert("Please enter your password");
    } else {
      setLoading(true);
      //SET APPLOADING STATE TO TRUE
      dispatch(dispatchAppLoadingState(true));
      //MAKE LOGIN REQUESTS
      await dispatch(signUp({ "email": formData.email, "password": formData.password }));
      //RESET APPLOADING STATE TO TRUE
      dispatch(dispatchAppLoadingState(false));
    }
  }

  return (
    <View style={Style.mainWrapper}>
      <View style={Style.subWrapper}>
        <View><Text style={Style.title}>SignUp now</Text></View>
        <View>
          <Text style={Style.form.text}>Email</Text>
          <TextInput
            style={Style.form.inputText}
            placeholder="eg.JohnDoe@gmail.com"
            keyboardType="email-address"
            onChangeText={text => { setFormData({ ...formData, email: text }) }}
          />
        </View>


        {/* VIEW PASSWORD DIV */}
        <View style={[Style.form.wrapper,]}>
          <Text style={Style.form.text}>Password</Text>
          <View style={Style.seePassword.wrapper}>
            <TextInput
              style={Style.form.inputText}
              placeholder="Password"
              secureTextEntry={seeingPassword}
              onChangeText={text => { setFormData({ ...formData, password: text }) }}
            />

            <TouchableOpacity style={Style.seePassword.icon} onPress={() => { setSeeingPassword(!seeingPassword) }}>
              <FontAwesome5 name="eye" size={20} color="#000000" />
            </TouchableOpacity>
          </View>

        </View>

        <TouchableOpacity style={[Style.form.btn.main, { padding: 10 }]} disabled={ loading } onPress={handleRegisterRequest}>
              <Text style={{ textAlign: "center", color: "#ffffff" }}>Register</Text>
        </TouchableOpacity>


        <View style={[style.otherFunctionsView.wrapper, {marginTop:10}]}>
          <TouchableOpacity onPress={() => { navigation.navigate("login") }}>
            <Text style={[style.otherFunctionsView.txt, {textAlign:"center"}]} >I already have an account?</Text>
          </TouchableOpacity>
        </View>


      </View>


    </View>
  )
}


const style = StyleSheet.create({
  otherFunctionsView: {
    wrapper: {
      display: "flex",
      marinTop: 30
    },
    txt: {
      color: "#4285f4",
      fontSize: 15,
    }
  },
  loadingSpinner: {
    wrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    }
  }

});

export default SignUp;