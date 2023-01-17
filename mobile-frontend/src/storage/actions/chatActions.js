import realm from "../models/databaseModel";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { addUserToDb } from "./addUserAction";

export const addChatToDb = (msg, loc) => {
  if (msg.user._id !== 1) {
    addUserToDb(msg.sender);
  }

  // console.log("db log", msg.user._id);
  // // let msg = JSON.parse(message);
  realm.write(() => {
    realm.create("Message", {
      _id: msg._id,
      text: msg.text,
      createdAt: msg.createdAt,
      from: msg.from,
      to: msg.to,
      self: msg.user._id === 1,
    });
  });
};

export const getChat = (user, receiver) => {
  // console.log(user, receiver);
  let query = `(from == "${user}" && to == "${receiver}") || (from == "${receiver}" && to == "${user}")`;
  let chat = realm.objects("Message").filtered(query);
  // console.log(chat);

  let chatArray = [];

  for (let i = 0; i < chat.length; i++) {
    let reformatedMsg = {
      _id: chat[i]._id,
      from: chat[i].from,
      to: chat[i].to,
      text: chat[i].text,
      image: chat[i].image,
      createdAt: chat[i].createdAt,
      user: {
        _id: chat[i].self ? 1 : chat[i].from,
      },
    };

    chatArray = [reformatedMsg, ...chatArray];
  }

  console.log(chatArray.length);

  return chatArray;
};
