import Icons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";

const AVATAR_URL =
  "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

export default function HeaderUser() {
  const { colors } = useTheme();

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
          uri: AVATAR_URL,
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
          Hi, James 👋
        </Text>
        <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
          Discover fashion that suit your style
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
