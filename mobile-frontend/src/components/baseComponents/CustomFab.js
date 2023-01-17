import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const CustomFab = ({ onPress }) => (
  <FAB
    icon="plus"
    style={styles.fab}
    onPress={() => {
      if (onPress) {
        onPress();
      }
    }}
  />
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default CustomFab;
