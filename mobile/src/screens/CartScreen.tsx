import { Ionicons } from "@expo/vector-icons"; // Make sure to install this package
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TabsStackScreenProps } from "../navigations/TabNavigator";

const CartScreen = ({ navigation }: TabsStackScreenProps<"Cart">) => {
  const cartItems = [
    { id: "1", name: "Portable Stereo Speaker", price: 630.33, quantity: 3 },
    { id: "2", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
    { id: "3", name: "Rotargi Dining Chair", price: 630.33, quantity: 3 },
  ];

  const renderItem = ({ item }: { item: (typeof cartItems)[0] }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.itemUnitPrice}>
          ${(item.price / item.quantity).toFixed(2)} per unit
        </Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity style={styles.quantityButton}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>
          {item.quantity.toString().padStart(2, "0")}
        </Text>
        <TouchableOpacity style={styles.quantityButton}>
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
            <Text style={styles.cartBadgeText}>2</Text>
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
    backgroundColor: "#ddd",
    marginRight: 10,
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
    borderWidth: 1,
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
