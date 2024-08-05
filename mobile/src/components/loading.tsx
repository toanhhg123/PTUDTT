import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "@react-navigation/native";

const Loading = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
};

export default Loading;
