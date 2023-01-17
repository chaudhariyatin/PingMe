import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../components/baseComponents/CustomText";
import ScreenWrapper from "../components/baseComponents/ScreenWrapper";
import { ScrollView } from "react-native-gesture-handler";
import CustomInput from "../components/baseComponents/CustomInput";
import { useState } from "react";
import { ActivityIndicator, Button, useTheme } from "react-native-paper";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  register,
  setRegisterLaoding,
  STATUSES,
} from "../redux/reducers/authSlice";
import axios from "axios";
import { registerRoute } from "../services/api";

const Register = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState(false);
  const [passwordErrorText, setPasswordErrorText] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, registerLoading } = useSelector((state) => state.auth);

  const { colors } = useTheme();

  useEffect(() => {
    if (userName.length !== 0) {
      setNameError(false);
    }
    if (email.length !== 0) {
      setEmailError(false);
    }

    if (
      password === confirmPassword &&
      password.length >= 8 &&
      confirmPassword.length >= 8
    ) {
      setPasswordError(false);
    }
  }, [email, userName, password, confirmPassword]);

  const handleSetUser = async () => {
    if (userName.length === 0) {
      setNameError(true);
      setNameErrorText("User username is required");
      return;
    }
    if (email.length === 0) {
      setEmailError(true);
      setEmailErrorText("Email not valid");
      return;
    }

    if (password < 8 || confirmPassword < 8) {
      setPasswordError(true);
      setPasswordErrorText("Password must be greater than 8 charcters");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setPasswordErrorText("Password and confirm password must be equal");
      return;
    }

    let user = {
      password,
      userName: userName,
      email,
    };
    try {
      dispatch(setRegisterLaoding(STATUSES.LOADING));
      const data = await axios.post(registerRoute, {
        ...user,
      });
      // console.log(data.data);
      if (!data.data.status) {
        dispatch(setRegisterLaoding(STATUSES.ERROR));
      }
      dispatch(register(data.data.user));
    } catch (error) {
      console.log(error);
    }

    // dispatch(register(user));
  };

  return (
    <ScreenWrapper>
      {/* <ScrollView> */}
      <View style={styles.inputsCon}>
        <CustomInput
          label={"Username"}
          placeholder={"username"}
          text={userName}
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
          label={"Enter Email"}
          placeholder={"Enter Email"}
          text={email}
          setText={setEmail}
          customStyle={styles.inputCon}
          inputStyle={styles.input}
        />
        {emailError ? (
          <View style={styles.errorText}>
            <CustomText
              text={emailErrorText}
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

        <CustomInput
          label={"Confirm Name"}
          placeholder={"Confirm Name"}
          text={confirmPassword}
          setText={setConfirmPassword}
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
          Register
        </Button>

        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CustomText text={"Already a user ?"} />
          <Button onPress={() => navigation.navigate("Login")}>Login</Button>
        </View>
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

export default Register;

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
    height: 70,
    width: "100%",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "90%",
    borderRadius: 5,
    marginTop: 15,
  },
  errorText: { width: "90%", marginBottom: 5 },
});
