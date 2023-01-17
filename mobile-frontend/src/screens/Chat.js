import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import ScreenWrapper from "../components/baseComponents/ScreenWrapper";
import CustomText from "../components/baseComponents/CustomText";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { addMessagesToDb, getChatFromDb } from "../redux/reducers/chatsSlice";
import { io } from "socket.io-client";
import { host } from "../services/api";
import { useRef } from "react";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { receiverUserData } = route.params;
  // const [messagesArray, setMessagesArray] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { messages } = useSelector((state) => state.chats);

  const socket = useRef();

  // console.log("socket", socket);

  useEffect(() => {
    dispatch(getChatFromDb(user, receiverUserData));
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  // useEffect(() => {
  //   // setMessages([
  //   //   // {
  //   //   //   _id: 111,
  //   //   //   text: "Hello developer",
  //   //   //   createdAt: new Date(),
  //   //   //   user: {
  //   //   //     _id: 333,
  //   //   //     name: "React Native",
  //   //   //     // avatar: "https://placeimg.com/140/140/any",
  //   //   //   },
  //   //   // },
  //   //   {
  //   //     _id: 333,
  //   //     text: "Hello developer",
  //   //     createdAt: new Date(),
  //   //     user: {
  //   //       _id: 111,
  //   //       // name: "React Native",
  //   //       // avatar: "https://placeimg.com/140/140/any",
  //   //     },
  //   //   },
  //   // ]);
  //   setMessages([
  //     {
  //       _id: "77947562-fe64-4c89-a106-3a63f8069817",
  //       createdAt: "2023-01-07T16:01:07.725Z",
  //       text: "bye",
  //       user: { _id: receiverUserData._id },
  //     },
  //     {
  //       _id: "77947562-fe64-4c89-a106-3a63f8069817",
  //       createdAt: "2023-01-07T15:56:37.326Z",
  //       text: "hii",
  //       user: { _id: receiverUserData._id },
  //     },
  //     {
  //       _id: 1,
  //       createdAt: "023-01-07T15:56:31.575Z",
  //       text: "Hello developer",
  //       image: "https://placeimg.com/140/140/any",
  //       user: { _id: 1 },
  //     },
  //   ]);
  // }, []);

  useFocusEffect(
    useCallback(() => {
      socket.current.on("msg-recieve", (msg) => {
        // setArrivalMessage({ fromSelf: false });
        // console.log("#######REceived", msg);

        let message = {
          _id: uuidv4(),
          createdAt: msg.createdAt,
          text: msg.message.text,
          from: msg.from,
          to: msg.to,
          user: {
            _id: msg.from,
          },
          sender: msg.sender,
        };

        // onReceived(message);
        // setMessagesArray((previousMessages) =>
        //   GiftedChat.append(previousMessages, message)
        // );

        dispatch(addMessagesToDb(message, "received"));
      });
      return () => {
        socket.current.off("msg-recieve");
      };
    }, [])
  );

  const onReceived = (message) => {
    setMessagesArray([message, ...messagesArray]);
  };

  // console.log("#######", messagesArray);

  const onSend = (messagesCopy) => {
    let message = {
      to: receiverUserData._id,
      from: user._id,
      message: {
        text: messagesCopy[0].text,
      },

      sender: user,
      createdAt: new Date().toISOString(),
    };

    socket.current.emit("send-msg", {
      // to: receiverUserData._id,
      // from: user._id,
      // msg: messages.text,
      ...message,
    });
    // console.log("<<<<<<<<<<<<<<<<<", messages[0]);
    // setMessagesArray((previousMessages) =>
    //   GiftedChat.append(previousMessages, messages)
    // );
    // setMessagesArray([messages[0], ...messagesArray]);

    let msg = {
      ...messagesCopy[0],
      from: user._id,
      to: receiverUserData._id,
      sender: null,
    };

    dispatch(addMessagesToDb(msg, "send"));
  };

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: colors.background,
        paddingTop: 6,
      }}
      textInputStyle={{ color: colors.text }}
      primaryStyle={{ alignItems: "center" }}
    />
  );

  return (
    <ScreenWrapper>
      {/* <CustomText text={receiverUserData.userName} /> */}
      <GiftedChat
        messages={messages}
        onSend={(message) => onSend(message)}
        user={{
          _id: 1,
        }}
        // renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderAvatar={null}
      />
    </ScreenWrapper>
  );
};

export default Chat;

const styles = StyleSheet.create({});
