import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomCard from "../baseComponents/CustomCard";
import CustomText from "../baseComponents/CustomText";
import { useTheme } from "react-native-paper";
import { uppercaseFirstLetter } from "../../utilities/stringFns";

const ChatCard = ({ item, onPress, search }) => {
  const { colors } = useTheme();
  // console.log(item);
  return (
    <CustomCard
      customStyle={styles.container}
      onPress={() => {
        if (onPress) {
          onPress(item);
        }
      }}
    >
      <View style={styles.container}>
        <View style={styles.avatarCon}>
          <View
            style={[
              styles.headerIconCon,
              { backgroundColor: colors.secondBorder },
            ]}
          >
            <CustomText
              text={uppercaseFirstLetter(item.userName)}
              customStyle={styles.headerIcon}
            />
          </View>
        </View>
        <View style={styles.textCon}>
          <CustomText text={item.userName} customStyle={[styles.userText]} />
          <CustomText text={"Good Morning"} customStyle={[styles.prevText]} />
        </View>
        {search ? (
          <View style={styles.timeCon}>
            <CustomText text={"Just now"} customStyle={[styles.timeText]} />
          </View>
        ) : null}
      </View>
    </CustomCard>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "yellow",
    width: "100%",
    minHeight: 70,
    flexDirection: "row",
  },
  headerIconCon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    alignSelf: "center",
  },
  headerIcon: {
    fontSize: 20,
    fontWeight: "600",
  },
  avatarCon: {
    width: "20%",
    // height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textCon: {
    width: "60%",
    justifyContent: "center",
  },
  timeCon: {
    width: "20%",
    justifyContent: "center",
  },
  userText: {
    fontSize: 15,
    fontWeight: "600",
  },
  prevText: {
    fontSize: 13,
  },
  timeText: {
    fontSize: 13,
  },
});
