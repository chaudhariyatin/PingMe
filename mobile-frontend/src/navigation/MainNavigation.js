import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DummySc from "../screens/DummySc";
import DummySc2 from "../screens/DummySc2";
import BottomTabNavigator from "./BottomTabNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Login from "../screens/Login";
import Register from "../screens/Register";
import UserSearchScreen from "../screens/UserSearchScreen";
import Chat from "../screens/Chat";

const MainNavigation = () => {
  const Stack = createStackNavigator();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  return !user ? (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        options={{ headerShown: false }}
        component={Register}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTab"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name="Addchat"
        options={{ headerShown: false }}
        component={UserSearchScreen}
      />
      <Stack.Screen
        name="Chat"
        options={{ headerShown: false }}
        component={Chat}
      />
      <Stack.Screen
        name="d1"
        options={{ headerShown: false }}
        component={DummySc}
      />
      <Stack.Screen
        name="d2"
        options={{ headerShown: false }}
        component={DummySc2}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
