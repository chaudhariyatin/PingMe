import { StyleSheet, Text } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

const CustomText = ({ customStyle, text, adjusToFit, noOfLines }) => {
  const { colors } = useTheme();
  return (
    <Text
      adjustsFontSizeToFit={adjusToFit}
      numberOfLines={noOfLines}
      style={[{ color: colors.text }, customStyle]}
    >
      {text}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({});
