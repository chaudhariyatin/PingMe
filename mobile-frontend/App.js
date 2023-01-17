/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from "react-native/Libraries/NewAppScreen";
import MainNavigation from "./src/navigation/MainNavigation";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDataFromLocal, STATUSES } from "./src/redux/reducers/authSlice";
import CustomText from "./src/components/baseComponents/CustomText";

const App = () => {
  const dispatch = useDispatch();
  const { user, registerLoading, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserDataFromLocal());
  }, []);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      surfaceOne: "#F7F7F7",
      text: "#333333",
      surfaceTwo: "#efefef",
      // accent: '#1EC96B',
      accent: "#6070FF",
      accentGradient: "#9DC3FF",
      accentLight: "#C4F3B9",
      secondBorder: "#F5F5F5",
      red: "#EB5757",
      activeGreen: "#1EC96B",
    },
  };
  // console.log(loading);
  return (
    <PaperProvider theme={CustomDefaultTheme}>
      {loading !== STATUSES.LOADING ? (
        <NavigationContainer theme={CustomDefaultTheme}>
          <MainNavigation />
        </NavigationContainer>
      ) : (
        <CustomText text={"Loading..."} />
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
