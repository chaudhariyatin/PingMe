import Realm from "realm";

class UsersSchema extends Realm.Object {}
UsersSchema.schema = {
  name: "Users",
  primaryKey: "_id",
  properties: {
    _id: "string",
    avatarImage: "string",
    isAvatarImageSet: "bool",
    userName: "string",
    email: "string",
  },
};

class MessageSchema extends Realm.Object {}
MessageSchema.schema = {
  name: "Message",
  primaryKey: "_id",
  properties: {
    _id: "string",
    text: "string?",
    image: "string?",
    createdAt: "date?",
    from: "string",
    to: "string",
    self: "bool",
  },
};

let realm = new Realm({
  schema: [UsersSchema, MessageSchema],
  schemaVersion: 6,
});
export default realm;
