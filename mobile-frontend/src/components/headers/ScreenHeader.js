import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../baseComponents/CustomText";
import { useNavigation } from "@react-navigation/native";

import { useTheme } from "react-native-paper";

const ScreenHeader = ({ text, icon, thirdComponent }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <View
      style={[styles.container, { borderBottomColor: colors.secondBorder }]}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <CustomText text={text} customStyle={styles.screenTitle} />
      </View>
      <View style={styles.iconContainer}>{thirdComponent}</View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#F5F5F5",
  },
  screenTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  iconContainer: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "70%",
    // justifyContent: 'center',
    alignItems: "center",
    flexDirection: "row",
  },
});
