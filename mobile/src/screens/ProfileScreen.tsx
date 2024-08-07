import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabsStackScreenProps } from "../navigations/TabNavigator";
import { authApi } from "../services/auth";

const ProfileScreen = ({ navigation }: TabsStackScreenProps<"Profile">) => {
  const handleLogout = () => {
    authApi.clearStore().then(() => {
      navigation.navigate("Login");
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            padding: 15,
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={handleLogout}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreen;
