import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Style from "../../../styles/Auth";
import { useDispatch, useSelector } from "react-redux";
import { createAlert, dispatchAppLoadingState, saveUserDataAsync } from "../../../__utils__";
import { login } from "../../../redux/dispatchers/Auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";



const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.Login);
  const [ loading, setLoading ] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [seeingPassword, setSeeingPassword] = useState(true);
  const AppLoading = useSelector(state => state.AppLoading);

  const handleRemeberUserOnDevice = async () => {
    await saveUserDataAsync({ ...loginData.user, "password": formData.password });
    navigation.replace("dashboard");
  }
  const handleDoNotRemeberUserOnDevice = () => {
    navigation.replace("dashboard");
    createAlert("Note, you will have to provide your login credentials next time you want to login")
  }

  useEffect(() => {
    if (loginData.success) {
      Alert.alert("", "Do You want your account to be remembered on this device",
        [
          { text: "Cancel", onPress: () => { handleDoNotRemeberUserOnDevice() } },
          { text: "OK", onPress: () => { handleRemeberUserOnDevice() } }

        ], {
        cancelable: false,
      });
    }
  }, [loginData.success]);

  //IF THERE IS A CHANGE IN LOGIN REDUX ACTIONS
  useEffect(() => {
    setLoading(false);
    if (loginData.message) {
      if (loginData.message.length > 0) {
        if (!loginData.success) {
          createAlert(loginData.message);
        }

      }
    }
  }, [loginData]);

  const handleLoginRequest = async () => {
    if (formData.email.length < 1) {
      createAlert("Please enter your email");
    } else if (formData.password.length < 1) {
      createAlert("Please enter your password");
    } else {
      setLoading(true);
      //SET APPLOADING STATE TO TRUE
      dispatch(dispatchAppLoadingState(true));
      //MAKE LOGIN REQUESTS
      await dispatch(login({ "email": formData.email, "password": formData.password }));
      //RESET APPLOADING STATE TO TRUE
      dispatch(dispatchAppLoadingState(false));
    }
  }


  return (
    <View style={Style.mainWrapper}>
      <View style={Style.subWrapper}>
        <View><Text style={Style.title}>Login now</Text></View>
        <View>
          <Text style={Style.form.text}>Email</Text>
          <TextInput
            style={Style.form.inputText}
            placeholder="eg.JohnDoe@gmail.com"
            keyboardType="email-address"
            onChangeText={text => { setFormData({ ...formData, email: text }) }}
          />
        </View>

        <View style={Style.form.wrapper}>
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

        <TouchableOpacity disabled={loading} style={[Style.form.btn.main, { padding: 10 }, loading && Style.disabled]} onPress={handleLoginRequest}>
          <Text style={{ textAlign: "center", color: "#ffffff" }}>Login</Text>
        </TouchableOpacity>

        <View style={[style.otherFunctionsView.wrapper, { marginTop: 10 }]}>
          <TouchableOpacity disabled={AppLoading.loading} onPress={() => { navigation.navigate("signUp") }}>
            <Text style={[style.otherFunctionsView.txt, { textAlign: "center" }]} >I do not have an account?</Text>
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

});

export default Login;