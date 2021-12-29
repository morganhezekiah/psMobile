import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddPassword from "./Screens/Password/AddPassword";
import ListPassword from "./Screens/Password/ListPassword";
import UserDetails from "./Screens/user/UserDetails";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";



const BottomTab = createBottomTabNavigator();
const DashBoard = ({ navigation }) => {
  const ServerErrorData = useSelector(state => state.ServerError);
  const passwords = useSelector(state => state.GetUserPassword);


  useEffect(() => {
    if (ServerErrorData.error) {
      navigation.replace("serverError");
    }
  }, [ServerErrorData.error])

  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => (
        {
          tabBarIcon: ({ focused, size, color }) => {
            let iconName, iconSize, iconColor;

            if (route.name === "listPassword") {
              iconName = "list";
            } else if (route.name === "addPassword") {
              iconName = "plus";
            }
            else if (route.name === "userDetail") {
              iconName = "user";
            }
            iconSize = focused ? 30 : 20;
            iconColor = focused ? "#fbbc05" : "";
            return (<FontAwesome5 name={iconName} size={iconSize} color={iconColor} />)
          },
          header: () => null,
          "tabBarShowLabel": false,
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
        }
      )}

    >
      <BottomTab.Screen
        name="listPassword"
        component={ListPassword}
        options={{
          tabBarBadge:passwords.count
        }}
      />

      <BottomTab.Screen
        name="addPassword"
        component={AddPassword}

      />

      <BottomTab.Screen
        name="userDetail"
        component={UserDetails}

      />
    </BottomTab.Navigator>
  );
}

export default DashBoard;