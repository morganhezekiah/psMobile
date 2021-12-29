import React, { useEffect, } from "react";
import Login from "./components/Screens/Auth/Login";
import SignUp from "./components/Screens/Auth/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./components/Dashboard";
import UserDetails from "./components/Screens/user/UserDetails"
import Splash from "./components/Splash";
import PushNotification from "react-native-push-notification";
import { APP_NOTIFICATION_ID, APP_NOTIFICATION_NAME } from "./__utils__";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import NoNetworkConnection from "./modals/NoNetworkConnection";
import ServerError from "./modals/ServerError";
import UserAccountCreated from "./modals/UserAccountCreated";


const StackNavigation = createStackNavigator();
const App = () => {
  useEffect(() => {
    PushNotification.createChannel({
      channelId: APP_NOTIFICATION_ID,
      channelName: APP_NOTIFICATION_NAME
    })
  }, []);

  // NetInfo.addEventListener(networkState => {
  // });





  return (
    <>
      <NavigationContainer>
        <StackNavigation.Navigator
          screenOptions={{
            header: () => null
          }}
        >

          <StackNavigation.Screen
            component={Splash}
            name="splash"
          />
          <StackNavigation.Screen
            component={Login}
            name="login"
          />

          <StackNavigation.Screen
            component={SignUp}
            name="signUp"
          />

          <StackNavigation.Screen
            component={Dashboard}
            name="dashboard"
          />

          <StackNavigation.Screen
            component={UserDetails}
            name="userDetails"
          />

        </StackNavigation.Navigator>
      </NavigationContainer>


      {/* MODALS */}

      <NoNetworkConnection />
      <ServerError />
      <UserAccountCreated />
    </>
  )
}





export default App;