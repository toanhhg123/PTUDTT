import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Loading from "../components/loading";
import useGetUser from "../hooks/useGetUser";
import { TabsStackScreenProps } from "../navigations/TabNavigator";
import { orderApi } from "../services/order";

const PaymentScreen = ({ navigation }: TabsStackScreenProps<"Payment">) => {
  const user = useGetUser();
  const queryClient = useQueryClient();

  const { data, isPending, isLoading } = useQuery({
    queryFn: () => orderApi.getByUserId(Number(user?.id!)),
    enabled: !!user?.id,
    queryKey: [orderApi.url],
  });

  const orders = data?.data.data || [];

  if (isPending || isLoading) return <Loading />;

  const renderItem = ({ item }: { item: (typeof orders)[0] }) => (
    <View style={styles.cartItem}>
      <Image
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#ddd",
          borderRadius: 10,
          marginRight: 10,
        }}
        width={20}
        source={{
          uri: item.orderDetails?.at(0)?.product?.image,
        }}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>
          {item.orderDetails?.at(0)?.product?.productName}
        </Text>
        <Text style={styles.itemPrice}>${item.totalPrice.toFixed(2)}</Text>
        <Text style={styles.itemUnitPrice}></Text>
      </View>
      <View style={styles.quantityControl}>
        <Text style={styles.quantityText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item, i) => i.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartIcon: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
  },
  cartItem: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemImage: {
    width: 50,
    height: 50,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "black",
    marginTop: 4,
  },
  itemUnitPrice: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    padding: 5,
    borderColor: "#ddd",
  },
  quantityText: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  backButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  backButtonText: {
    color: "#000",
  },
  placeOrderButton: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  placeOrderText: {
    color: "#fff",
  },
});

export default PaymentScreen;
