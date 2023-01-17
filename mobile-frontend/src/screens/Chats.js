import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScreenWrapper from "../components/baseComponents/ScreenWrapper";
import ScreenHeader from "../components/headers/ScreenHeader";
import CustomText from "../components/baseComponents/CustomText";
import { Button, useTheme } from "react-native-paper";
import SearchIcon from "../assets/svgIcons/searchicon.svg";
import ChatCard from "../components/chat/ChatCard";
import { useDispatch, useSelector } from "react-redux";
import { logOut, STATUSES } from "../redux/reducers/authSlice";
import { uppercaseFirstLetter } from "../utilities/stringFns";
import { io } from "socket.io-client";
import { host } from "../services/api";
import CustomInput from "../components/baseComponents/CustomInput";
import CustomFab from "../components/baseComponents/CustomFab";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { addMessagesToDb, getUsersFromDb } from "../redux/reducers/chatsSlice";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const Chats = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { user } = useSelector((state) => state.auth);
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [text, setText] = useState("");

  const [isReceived, setIsReceived] = useState();

  const { usersStatus, users } = useSelector((state) => state.chats);

  // console.log("@@@@", user.userName);

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

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

        dispatch(addMessagesToDb(message));
        setIsReceived(true);
      });
      return () => {
        socket.current.off("msg-recieve");
      };
    }, [])
  );
  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       setArrivalMessage({ fromSelf: false });
  //       console.log("#######REceived", msg);
  //       dispatch(addMessagesToDb(msg));
  //     });
  //   }
  // }, []);

  const handleSendMsg = async (sender, text) => {
    // setText(msg);
    socket.current.emit("send-msg", {
      to: sender._id,
      from: user._id,
      msg: text,
    });
  };

  useFocusEffect(
    useCallback(() => {
      dispatch(getUsersFromDb(user));
    }, [isReceived])
  );

  const addNewUserChat = (userData) => {
    navigation.navigate("Chat", {
      receiverUserData: userData,
      // socket: socket,
    });
  };

  // console.log(users, usersStatus);
  return (
    <ScreenWrapper>
      <ScreenHeader
        icon={
          <TouchableOpacity
            onPress={async () => dispatch(logOut())}
            style={[
              styles.headerIconCon,
              { backgroundColor: colors.secondBorder },
            ]}
          >
            <CustomText
              text={uppercaseFirstLetter(user.userName)}
              customStyle={styles.headerIcon}
            />
          </TouchableOpacity>
        }
        text="PingMe"
        thirdComponent={
          <SearchIcon width={25} height={25} fill={colors.text} />
        }
      />

      {usersStatus !== STATUSES.LOADING ? (
        <ScrollView>
          {users.map((el) => (
            <ChatCard item={el} key={el._id} onPress={addNewUserChat} />
          ))}
        </ScrollView>
      ) : (
        <CustomText text={"Loading..."} customStyle={styles.indicator} />
      )}

      {/* <CustomInput
        label={"Chat here"}
        placeholder={"Chat here"}
        text={text}
        setText={setText}
        customStyle={styles.inputCon}
        inputStyle={styles.input}
      />
      <Button onPress={handleSendMsg}>Send</Button> */}

      {/* <CustomText text={`${arrivalMessage.}`} /> */}
      <CustomFab onPress={() => navigation.navigate("Addchat")} />
    </ScreenWrapper>
  );
};

export default Chats;

const styles = StyleSheet.create({
  headerIconCon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  headerIcon: {
    fontSize: 20,
    fontWeight: "600",
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
  indicator: {
    textAlign: "center",
  },
});
