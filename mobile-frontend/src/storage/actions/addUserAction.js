import realm from "../models/databaseModel";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export const addUserToDb = (user) => {
  let users = getUsers();

  let present = users.find((u) => u._id === user._id);

  if (!present) {
    realm.write(() => {
      realm.create("Users", {
        _id: user._id,
        avatarImage: user.avatarImage,
        isAvatarImageSet: user.isAvatarImageSet,
        userName: user.userName,
        email: user.email,
      });
    });
  }
};

export const getUsers = (user) => {
  console.log(user);
  // let query = `_id == "${user._id}"`;
  return realm.objects("Users");
  // .filtered(query);
};
