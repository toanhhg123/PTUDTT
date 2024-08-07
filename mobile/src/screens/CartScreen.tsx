import { Ionicons } from "@expo/vector-icons"; // Make sure to install this package
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TabsStackScreenProps } from "../navigations/TabNavigator";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartApi } from "../services/cart";
import Loading from "../components/loading";
import useGetUser from "../hooks/useGetUser";
import { CartForm } from "../types/cart";

const CartScreen = ({ navigation }: TabsStackScreenProps<"Cart">) => {
  const user = useGetUser();
  const queryClient = useQueryClient();

  const { data, isPending, isLoading } = useQuery({
    queryFn: () => cartApi.getsByUserId(Number(user?.id!)),
    enabled: !!user?.id,
    queryKey: [cartApi.url],
  });

  const mutationUpdateQuantity = useMutation({
    mutationFn: (body: { cardId: number; cart: Partial<CartForm> }) =>
      cartApi.update(body.cardId, body.cart),
    onSuccess: (res) => {
      console.log(res.data.data.quantity);
      queryClient.invalidateQueries({ queryKey: [cartApi.url] });
    },
  });

  const cartItems = data?.data.data || [];

  if (isPending || isLoading) return <Loading />;

  const renderItem = ({ item }: { item: (typeof cartItems)[0] }) => (
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
          uri: item.product.image,
        }}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.product.productName}</Text>
        <Text style={styles.itemPrice}>
          ${(item.product.sellPrice * item.quantity).toFixed(2)}
        </Text>
        <Text style={styles.itemUnitPrice}>
          ${(item.product.sellPrice / item.quantity).toFixed(2)} per unit
        </Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            const value = item.quantity - 1;
            if (value > 0) {
              mutationUpdateQuantity.mutate({
                cardId: item.id,
                cart: { quantity: value },
              });
            }
          }}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>
          {item.quantity.toString().padStart(2, "0")}
        </Text>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => {
            const value = item.quantity + 1;
            if (value <= item.product.stock) {
              mutationUpdateQuantity.mutate({
                cardId: item.id,
                cart: { quantity: value },
              });
            }
          }}
        >
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="star-outline" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.cartIcon}>
          <Ionicons name="cart-outline" size={24} color="black" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="menu-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, i) => i.toString()}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => {
            navigation.navigate("PlaceOrder");
          }}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
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

export default CartScreen;
