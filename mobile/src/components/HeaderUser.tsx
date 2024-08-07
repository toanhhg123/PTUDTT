import Icons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import useGetUserModel from "../hooks/useGetUserModel";
import { URL_PROFILE } from "../base/consts";

export default function HeaderUser() {
  const { colors } = useTheme();
  const { user } = useGetUserModel();

  return (
    <View
      style={{
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      <Image
        source={{
          uri: URL_PROFILE,
        }}
        style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            marginBottom: 8,
            color: colors.text,
          }}
          numberOfLines={1}
        >
          Hi, {user?.name} 👋
        </Text>
        <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
          {user?.email}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: 52,
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 52,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <Icons name="notifications" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
