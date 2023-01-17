import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DummySc from "../screens/DummySc";
import DummySc2 from "../screens/DummySc2";
import Chats from "../screens/Chats";

const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        headerShown: false,
      }}
      // activeColor={colors.primary}
      barStyle={{ backgroundColor: colors.surface }}
    >
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="chat"
              color={focused ? colors.accent : colors.text}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rooms"
        component={DummySc2}
        options={{
          tabBarLabel: "Rooms",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="people-alt"
              color={focused ? colors.accent : colors.text}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
