import { View, Text } from "react-native";
import React from "react";
import { TextInput, useTheme } from "react-native-paper";

const CustomInput = ({
  label,
  placeholder,
  customStyle,
  inputStyle,
  text,
  setText,
  error,
  errorText,
}) => {
  const { colors } = useTheme();
  return (
    <View style={customStyle}>
      <TextInput
        mode="outlined"
        style={[inputStyle]}
        label={label}
        placeholder={placeholder}
        value={text}
        onChangeText={(text) => setText(text)}
        activeOutlineColor={colors.accent}
        error={error}
        errorText={errorText}
      />
    </View>
  );
};

export default CustomInput;
