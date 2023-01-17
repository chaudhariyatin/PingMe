import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";

const CustomCard = ({ onPress, onLongPress, children, customStyle }) => {
  return (
    <Card
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
      onLongPress={() => {
        if (onLongPress) {
          onLongPress();
        }
      }}
      style={customStyle}
    >
      {children}
    </Card>
  );
};

export default CustomCard;

const styles = StyleSheet.create({});
