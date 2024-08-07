import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackScreenProps } from "../navigations/RootNavigator";
import Toast from "react-native-toast-message";
import { authApi } from "../services/auth";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "../types/user";

export default function LoginScreen({
  navigation,
}: RootStackScreenProps<"Login">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }

    authApi
      .login(username, password)
      .then((res) => {
        const token = res.data.data;

        const dataToken = jwtDecode<UserToken>(token);

        //TODO save store
        authApi.saveAsyncStore(dataToken);

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Login successful",
        });

        navigation.navigate("TabsStack", { screen: "Home" });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Username and password not correct",
        });
      });
  };

  useValidAuth(navigation);

  return (
    <View style={styles.background}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.loginContainer}>
            <Ionicons
              name="phone-portrait-outline"
              size={80}
              color="#000"
              style={styles.logo}
            />
            <Text style={styles.title}>iPhone Store</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={24}
                color="#000"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={24}
                color="#000"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <Text style={styles.forgotPassword}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loginContainer: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f7",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#000",
    fontSize: 16,
    paddingVertical: 15,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPassword: {
    color: "#000",
    marginTop: 15,
  },
});

const useValidAuth = (navigation: any) =>
  useEffect(() => {
    authApi.getStore().then((res) => {
      if (res !== null) {
        navigation.navigate("TabsStack", { screen: "Home" });
      }
    });
  }, []);
