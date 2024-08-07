import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useGetUserModel from "../hooks/useGetUserModel";
import { userAddressApi } from "../services/userAddress";
import Loading from "../components/loading";
import { UserAddress, UserAddressRequest } from "../types/userAddress";
import Toast from "react-native-toast-message";

const UserAddressScreen = () => {
  const { user } = useGetUserModel();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [userAddressApi.url, user?.id],
    enabled: !!user?.id,
    queryFn: () => userAddressApi.getByUserId(Number(user?.id)),
  });

  const userAddress = data?.data.data;

  if (!userAddress || isFetching || isLoading) return <Loading />;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <FormUserAddress userAddress={userAddress} />
    </ScrollView>
  );
};

const FormUserAddress = ({
  userAddress,
  disableUpdate,
}: {
  userAddress: UserAddress;
  disableUpdate?: boolean;
}) => {
  const queryClient = new QueryClient();
  const [data, setData] = useState(userAddress);

  const updateAddressMutation = useMutation({
    mutationFn: (body: UserAddressRequest) =>
      userAddressApi.update(body.userId, body),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [userAddressApi.url] });
      Toast.show({
        type: "success",
        text1: "success",
      });
    },
  });

  const handleUpdate = () => {
    updateAddressMutation.mutate({
      userId: data.userId,
      address: data.address || "",
      city: data.city || "",
      district: data.district || "",
      ward: data.ward || "",
      country: data.country || "",
      postalCode: data.postalCode || "",
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>Ward</Text>
      <TextInput
        style={styles.input}
        placeholder="Viet Nam"
        value={data.country || ""}
        onChangeText={(country) => setData({ ...data, country })}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Ha Noi"
        value={data.city || ""}
        onChangeText={(city) => setData({ ...data, city })}
      />

      <Text style={styles.label}>District</Text>
      <TextInput
        style={styles.input}
        placeholder="Tan Phu"
        value={data.district || ""}
        onChangeText={(district) => setData({ ...data, district })}
      />

      <Text style={styles.label}>Shipping Address</Text>
      <TextInput
        style={[styles.input, styles.addressInput]}
        placeholder="123 Main St, City, Country"
        value={data.address || ""}
        onChangeText={(address) => setData({ ...data, address })}
        multiline
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>ID</Text>
          <TextInput
            style={styles.input}
            placeholder="ID"
            value={data.userId.toString() || ""}
            onChangeText={() => {}}
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.input}
            placeholder="123"
            value={data.postalCode || ""}
            onChangeText={(postalCode) => setData({ ...data, postalCode })}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={{ flex: 1 }} />

      {disableUpdate ? null : (
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}
          disabled={updateAddressMutation.status === "pending"}
        >
          <Text style={styles.buttonText}>
            {updateAddressMutation.status === "pending"
              ? "loading..."
              : "update"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
  },
  backButton: {},
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 30,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  addressInput: {
    height: 100,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 18,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default UserAddressScreen;
