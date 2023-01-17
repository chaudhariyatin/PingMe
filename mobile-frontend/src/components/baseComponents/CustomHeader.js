import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const CustomHeader = (props) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.constainer,
        props.customStyles,
        { backgroundColor: colors.surface },
      ]}
    >
      {props.children}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  constainer: {
    width: "100%",
    minHeight: 60,
    justifyContent: "center",
    // elevation: 2,
  },
});
