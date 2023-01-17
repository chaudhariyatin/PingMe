import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import ScreenWrapper from "../components/baseComponents/ScreenWrapper";
import CustomHeader from "../components/baseComponents/CustomHeader";
import { useNavigation } from "@react-navigation/native";
import CustomSearch from "../components/baseComponents/CustomSearch";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, useTheme } from "react-native-paper";
import axios from "axios";
import { getUsersByQuery } from "../services/api";
import ChatCard from "../components/chat/ChatCard";
import { addUserToDb } from "../storage/actions/addUserAction";

const UserSearchScreen = () => {
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const { colors } = useTheme();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [query]);

  const getUsers = async () => {
    if (query.length === 0) {
      setUsers([]);
      return;
    }

    if (query.length >= 2) {
      try {
        const usersData = await axios.get(`${getUsersByQuery}?name=${query}`);
        setUsers(usersData.data.users);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addNewUserChat = (userData) => {
    addUserToDb(userData);
    navigation.navigate("Chat", {
      receiverUserData: userData,
    });
  };

  return (
    <ScreenWrapper>
      <CustomHeader customStyles={styles.headerCon}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.sideCon}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={30}
            color={colors.text}
          />
        </TouchableOpacity>
        <View style={styles.searchCon}>
          <CustomSearch query={query} setQuery={setQuery} />
        </View>
      </CustomHeader>
      <ScrollView>
        {users.map((u) => (
          <ChatCard
            search={true}
            key={u._id}
            item={u}
            onPress={addNewUserChat}
          />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
};

export default UserSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  headerCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  sideCon: {
    width: "10%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  searchCon: {
    width: "80%",
  },
});
