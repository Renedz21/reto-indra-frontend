import React from "react";
import { View, Text } from "react-native";

export const Item = ({ name }) => {
  return (
    <View
      style={{ padding: 20, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <Text>{name}</Text>
    </View>
  );
};
