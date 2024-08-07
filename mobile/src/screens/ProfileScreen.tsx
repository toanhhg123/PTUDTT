import React from "react";
import {
  View,
  Text,
  Image,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo for icons
import { TabsStackScreenProps } from "../navigations/TabNavigator";
import { authApi } from "../services/auth";
import useGetUser from "../hooks/useGetUser";
import useGetUserModel from "../hooks/useGetUserModel";
import Loading from "../components/loading";
import { URL_PROFILE } from "../base/consts";

interface SettingItemProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
  onPress?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  description,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.settingItem}>
    <Ionicons name={icon} size={24} color="#888" style={styles.icon} />
    <View style={styles.settingText}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const ProfileScreen = ({ navigation }: TabsStackScreenProps<"Profile">) => {
  const [isLightMode, setIsLightMode] = React.useState(true);
  const { user } = useGetUserModel();

  const handleLogout = () => {
    authApi.clearStore();
    navigation.navigate("Login");
  };

  if (!user) return <Loading />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <TouchableOpacity
        style={styles.accountInfo}
        onPress={() => {
          navigation.navigate("Information");
        }}
      >
        <Image
          source={{
            uri: URL_PROFILE,
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.header}>General</Text>
      <View style={styles.settingsContainer}>
        <SettingItem
          icon="flower-outline"
          title="Address"
          description="Change app looks"
          onPress={() => navigation.push("UserAddress")}
        />
        <SettingItem
          icon="notifications-outline"
          title="Notifications"
          description="Control how the app alerts you"
        />
        <SettingItem
          icon="shield-outline"
          title="Privacy"
          description="Manage how your data is handled and shared"
        />
        <SettingItem
          icon="lock-closed-outline"
          title="Security"
          description="Customize security feature to fit your needs"
        />
      </View>

      <View style={styles.lightModeContainer}>
        <Text style={styles.lightModeText}>Light mode</Text>
        <Switch
          value={isLightMode}
          onValueChange={setIsLightMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isLightMode ? "#f5dd4b" : "#f4f3f4"}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  accountInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#888",
  },
  settingsContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  icon: {
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 14,
    color: "#888",
  },
  lightModeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  lightModeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
