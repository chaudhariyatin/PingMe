import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRoute } from "../../services/api";

export const STATUSES = Object.freeze({
  Idle: "idle",
  LOADING: "loading",
  ERROR: "error",
});

const initialState = {
  user: null,
  token: null,
  status: STATUSES.Idle,
  loading: STATUSES.LOADING,
  registerLoading: STATUSES.Idle,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      //   state.token = action.payload.Authorization;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setRegisterLaoding(state, action) {
      state.registerLoading = action.payload;
    },
    resmoveUser(state, action) {
      state.user = null;
      state.token = null;
    },
  },
});
export const {
  setUser,
  setStatus,
  setLoading,
  resmoveUser,
  setRegisterLaoding,
} = authSlice.actions;

export default authSlice.reducer;

//async tasks here

export const getUserDataFromLocal = () => {
  return async function getUserDataFromLocalThunk(dispatch, getState) {
    dispatch(setLoading(STATUSES.LOADING));
    try {
      let user = await AsyncStorage.getItem("@userData");
      let userInfo = JSON.parse(user);
      // await AsyncStorage.setItem('@userToken', response.data.Authorization);
      dispatch(setUser(userInfo));
      dispatch(setLoading(STATUSES.Idle));
    } catch (error) {
      dispatch(setLoading(STATUSES.Idle));
    }
  };
};

export const register = (userInfo) => {
  return async function registerFnsThunk(dispatch, getState) {
    // dispatch(setRegisterLaoding(STATUSES.LOADING));
    // console.log(userInfo);
    try {
      const stringyData = JSON.stringify(userInfo);
      await AsyncStorage.setItem("@userData", stringyData);
      // await AsyncStorage.setItem('@userToken', response.data.Authorization);
      dispatch(setUser(userInfo));
      dispatch(setRegisterLaoding(STATUSES.Idle));
    } catch (error) {
      dispatch(setRegisterLaoding(STATUSES.ERROR));
    }
  };
};

export const logOut = () => {
  return async function logoutFnThunk(dispatch, getState) {
    try {
      await AsyncStorage.removeItem("@userData");
      dispatch(setUser(null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (userInfo) => {
  return async function loginFnThunk(dispatch, getState) {
    try {
      const stringyData = JSON.stringify(userInfo);
      await AsyncStorage.setItem("@userData", stringyData);
      // await AsyncStorage.setItem('@userToken', response.data.Authorization);
      dispatch(setUser(userInfo));
      dispatch(setRegisterLaoding(STATUSES.Idle));
    } catch (error) {
      dispatch(setRegisterLaoding(STATUSES.ERROR));
    }
  };
};

export const getUserDataFromStorage = () => {
  return async function getUserThunk(dispatch, getState) {
    dispatch(setLoading(STATUSES.LOADING));
    try {
      //   const data = await AsyncStorage.getItem('@userData');
      //   const parsedData = JSON.parse(data);
      // loggger('line70', parsedData);
      //   if (parsedData) {
      //     dispatch(setUser(parsedData));
      //     dispatch(setLoading(STATUSES.Idle));
      //   } else {
      //     dispatch(resmoveUser(parsedData));
      //     dispatch(setLoading(STATUSES.Idle));
      //   }
    } catch (error) {
      dispatch(setLoading(STATUSES.Idle));
    }
  };
};

export const logOutUserFromStorage = () => {
  return async function removeUserThunk(dispatch, getState) {
    // dispatch(setLoading(STATUSES.LOADING));
    try {
      //   await AsyncStorage.removeItem('@userData');
      //   await AsyncStorage.removeItem('@userToken');
      //   dispatch(resmoveUser(null));
      //   dispatch(setLoading(STATUSES.Idle));
    } catch (error) {
      dispatch(setLoading(STATUSES.Idle));
    }
  };
};
