import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerRoute } from "../../services/api";
import { STATUSES } from "./authSlice";
import { getUsers } from "../../storage/actions/addUserAction";
import { addChatToDb, getChat } from "../../storage/actions/chatActions";

const initialState = {
  users: [],
  messages: [],
  usersStatus: STATUSES.LOADING,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      //   state.token = action.payload.Authorization;
    },
    setUsersStatus(state, action) {
      state.usersStatus = action.payload;
    },
    addMessages(state, action) {
      state.messages = [action.payload, ...state.messages];
    },
    getMessages(state, action) {
      state.messages = action.payload;
    },
  },
});
export const { setUsers, setUsersStatus, addMessages, getMessages } =
  chatsSlice.actions;

export default chatsSlice.reducer;

//async tasks here

export const getUsersFromDb = (user) => {
  return async function getUsersFromDbThunk(dispatch, getState) {
    dispatch(setUsersStatus(STATUSES.LOADING));
    try {
      let users = await getUsers(user);
      dispatch(setUsers(users));
      dispatch(setUsersStatus(STATUSES.Idle));
    } catch (error) {
      dispatch(setUsersStatus(STATUSES.Idle));
    }
  };
};

export const addMessagesToDb = (msg, loc) => {
  return async function getUsersFromDbThunk(dispatch, getState) {
    try {
      addChatToDb(msg, loc);
      dispatch(addMessages(msg));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getChatFromDb = (user, receiver) => {
  return async function getChatFromDbThunk(dispatch, getState) {
    try {
      let chat = getChat(user._id, receiver._id);
      dispatch(getMessages(chat));
    } catch (error) {
      console.log(error);
    }
  };
};
