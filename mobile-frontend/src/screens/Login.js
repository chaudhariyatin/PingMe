import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../components/baseComponents/CustomText";
import ScreenWrapper from "../components/baseComponents/ScreenWrapper";
import { ScrollView } from "react-native-gesture-handler";
import CustomInput from "../components/baseComponents/CustomInput";
import { useState } from "react";
import { Button, useTheme } from "react-native-paper";
import { useEffect } from "react";
import { loginRoute } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  setRegisterLaoding,
  STATUSES,
} from "../redux/reducers/authSlice";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const { colors } = useTheme();
  const { user, registerLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (name.length !== 0) {
      setNameError(false);
    }

    if (password.length >= 8) {
      setPasswordError(false);
    }
  }, [name, password]);

  const handleSetUser = async () => {
    if (name.length === 0) {
      setNameError(true);
      setNameErrorText("User name is required");
      return;
    }

    if (password < 8) {
      setPasswordError(true);
      setPasswordErrorText("Password must be greater than 8 charcters");
      return;
    }

    let user = {
      userName: name,
      password: password,
    };

    try {
      dispatch(setRegisterLaoding(STATUSES.LOADING));
      const data = await axios.post(loginRoute, {
        ...user,
      });
      // console.log(data.data);
      if (!data.data.status) {
        dispatch(setRegisterLaoding(STATUSES.ERROR));
      }
      dispatch(login(data.data.user));
    } catch (error) {
      console.log(error);
    }

    // console.log("User is created");
  };

  return (
    <ScreenWrapper>
      {/* <ScrollView> */}
      <View style={styles.inputsCon}>
        <CustomInput
          label={"Username"}
          placeholder={"username"}
          text={name}
          setText={setName}
          customStyle={styles.inputCon}
          inputStyle={styles.input}
          error={nameError}
          errorText={nameErrorText}
        />
        {nameError ? (
          <View style={styles.errorText}>
            <CustomText
              text={nameErrorText}
              customStyle={{ color: colors.red }}
            />
          </View>
        ) : null}
        <CustomInput
          label={"Enter Password"}
          placeholder={"Enter Password"}
          text={password}
          setText={setPassword}
          customStyle={styles.inputCon}
          inputStyle={styles.input}
        />
        {passwordError ? (
          <View style={styles.errorText}>
            <CustomText
              text={passwordErrorText}
              customStyle={{ color: colors.red }}
            />
          </View>
        ) : null}
        <Button
          onPress={() => {
            handleSetUser();
          }}
          mode="contained"
          style={[styles.btn, { backgroundColor: colors.accent }]}
        >
          Login
        </Button>
      </View>
      {registerLoading === STATUSES.LOADING ? (
        <View style={{ position: "absolute", top: "50%", right: "45%" }}>
          <ActivityIndicator size={"large"} color={colors.accent} />
        </View>
      ) : null}
      {/* </ScrollView> */}
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputsCon: {
    width: "90%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    height: 50,
    width: "100%",
  },
  inputCon: {
    height: 60,
    width: "100%",
    marginBottom: 5,
  },
  btn: {
    width: "90%",
    borderRadius: 5,
    marginTop: 15,
  },
  errorText: { width: "90%", marginBottom: 5 },
});
