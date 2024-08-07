import { Ionicons } from "@expo/vector-icons"; // Make sure to import this
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/loading";
import useGetUserModel from "../hooks/useGetUserModel";
import { RootStackScreenProps } from "../navigations/RootNavigator";
import { cartApi } from "../services/cart";
import { orderApi } from "../services/order";
import { paymentApi } from "../services/payment";
import { userAddressApi } from "../services/userAddress";

const PlaceOrderScreen = ({
  navigation,
}: RootStackScreenProps<"PlaceOrder">) => {
  const { user } = useGetUserModel();
  const queryClient = new QueryClient();

  const { data: dataAddress } = useQuery({
    queryKey: [userAddressApi.url, user?.id],
    enabled: !!user?.id,
    queryFn: () => userAddressApi.getByUserId(Number(user?.id)),
  });

  const orderMutation = useMutation({
    mutationFn: (id: number) => orderApi.createOrderSuccess(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [orderApi.url],
      });
      queryClient.invalidateQueries({
        queryKey: [cartApi.url],
      });
    },
    onError(e) {
      console.log(e);
    },
  });

  const userAddress = dataAddress?.data.data;

  const { data } = useQuery({
    queryFn: () => cartApi.getsByUserId(Number(user?.id!)),
    queryKey: [cartApi.url, user?.id],
  });
  const carts = data?.data.data || [];

  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    if (!user) throw new Error("");

    const price =
      carts.reduce(
        (total, cart) => total + cart.product.sellPrice * cart.quantity,
        0
      ) * 100;

    const {
      data: { data },
    } = await paymentApi.createPayment({
      userId: user.id.toString(),
      price,
    });

    return data;
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "",
    });
  };

  const openPaymentSheet = async () => {
    setLoading(true);
    try {
      await initializePaymentSheet().catch(console.log);
      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        orderMutation.mutate(Number(user?.id));
        Alert.alert("Success", "Your payment is confirmed!");
      }
    } catch (error) {}

    setLoading(false);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  if (!user) return <Loading />;

  return (
    <StripeProvider publishableKey="pk_test_51OO1FjCs190ReUaqBfPXcz302Oo3xoXlbR2EACu9HCv6OYIzEyCiPfmitEV7VLMa7cwOeixQKHTDAZUrZqKflcyj00Gqd1ULGb">
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.title}>Place Your Order</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            value={user.name}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="johndoe@example.com"
            value={user.email}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Shipping Address</Text>
          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="123 Main St, City, Country"
            value={userAddress?.address || ""}
            multiline
          />

          <Text style={styles.label}>Postal Code</Text>
          <TextInput
            style={styles.input}
            placeholder="1234 5678 9012 3456"
            value={userAddress?.postalCode || ""}
          />

          <TouchableOpacity style={styles.button} onPress={openPaymentSheet}>
            <Text style={styles.buttonText}>
              {loading ? "loading..." : "Place Order"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </StripeProvider>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
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

export default PlaceOrderScreen;
