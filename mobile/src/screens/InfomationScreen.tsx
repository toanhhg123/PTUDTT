import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo
import { userApi } from "../services/user";
import Loading from "../components/loading";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import useGetUser from "../hooks/useGetUser";
import Toast from "react-native-toast-message";

interface UserInfo {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: string;
}

const UpdateUserInfoScreen = ({
  defaultValues,
  userId,
}: {
  defaultValues: UserInfo;
  userId: number;
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(defaultValues);
  const queryClient = useQueryClient();
  const updateUser = useMutation({
    mutationFn: (body: UserInfo) => userApi.update(userId, body),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [userApi.url] });
      Toast.show({
        type: "success",
        text1: "success",
      });
    },
  });

  const handleUpdateInfo = () => {
    updateUser.mutate(userInfo);
  };

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prevState) => ({ ...prevState, [field]: value }));
  };

  const renderInput = (
    field: keyof UserInfo,
    placeholder: string,
    icon: string,
    isPassword = false
  ) => (
    <View style={styles.inputContainer}>
      <Ionicons
        name={icon as any}
        size={24}
        color="#000"
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={userInfo[field]}
        onChangeText={(value) => handleInputChange(field, value)}
        secureTextEntry={isPassword}
        autoCapitalize={
          field === "email" || field === "username" ? "none" : "words"
        }
        keyboardType={
          field === "email"
            ? "email-address"
            : field === "phone"
            ? "phone-pad"
            : "default"
        }
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            {renderInput("name", "Full Name", "person-outline")}
            {renderInput("email", "Email Address", "mail-outline")}
            {renderInput("username", "Username", "at-outline")}
            {renderInput("password", "Password", "lock-closed-outline", true)}
            {renderInput("phone", "Phone Number", "call-outline")}
          </View>
          <View style={{ flex: 1 }} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                updateUser.status === "pending" && styles.buttonDisabled,
              ]}
              onPress={handleUpdateInfo}
            >
              <Text style={styles.buttonText}>Update </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  inputIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingRight: 15,
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    padding: 20,
  },

  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});

const InformationScreen = () => {
  const user = useGetUser();

  const { data, isFetching } = useQuery({
    queryFn: () => userApi.getUserById(Number(user?.id!)),
    queryKey: [userApi.url, user?.id],
    enabled: !!user?.id,
  });

  const userModel = data?.data.data;

  return isFetching || !userModel || !user ? (
    <Loading />
  ) : (
    <UpdateUserInfoScreen defaultValues={userModel} userId={userModel.id} />
  );
};

export default InformationScreen;
