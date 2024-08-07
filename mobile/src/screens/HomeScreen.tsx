import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardProduct from "../components/CardProduct";
import HeaderUser from "../components/HeaderUser";
import HomeSearch from "../components/HomeSearch";

import { useQuery } from "@tanstack/react-query";
import Grids from "../components/GridProduct";
import useGetCategory from "../hooks/useGetCategory";
import { TabsStackScreenProps } from "../navigations/TabNavigator";
import { productApi } from "../services/product";

export default function HomeScreen({
  navigation,
}: TabsStackScreenProps<"Home">) {
  const { data, error } = useQuery({
    queryKey: [productApi.url],
    queryFn: () => productApi.gets(),
  });

  const { categoryMap, categories } = useGetCategory();
  const products = data?.data.data || [];

  const { colors } = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(0);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
        <HeaderUser />
        <HomeSearch />

        <View style={{ paddingHorizontal: 24, gap: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 700 }}>
              New Collections
            </Text>
            <TouchableOpacity style={{ opacity: 0.7 }}>
              <Text style={{ color: colors.primary }}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", height: 200, gap: 12 }}>
            <CardProduct
              price={130}
              imageUrl="https://media.wired.com/photos/6500ad57fe61eb702d721b58/1:1/w_1800,h_1800,c_limit/Apple-iPhone-15-Pro-Hero-Gear.jpg"
            />
            <View style={{ flex: 1, gap: 12 }}>
              <CardProduct
                price={120}
                imageUrl="https://i.blogs.es/699e2a/analisis-iphone-15-pro-4/840_560.jpeg"
              />
              <CardProduct
                price={170}
                imageUrl="https://media.wired.com/photos/6332360740fe1e8870aa3bc0/master/pass/iPhone-14-Review-Gear.jpg"
              />
            </View>
          </View>
        </View>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
          }}
          renderItem={({ item, index }) => {
            const isSelected = categoryIndex === index;
            return (
              <TouchableOpacity
                onPress={() => setCategoryIndex(index)}
                style={{
                  backgroundColor: isSelected ? colors.primary : colors.card,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: colors.border,
                }}
              >
                <Text
                  style={{
                    color: isSelected ? colors.background : colors.text,
                    fontWeight: "600",
                    fontSize: 14,
                    opacity: isSelected ? 1 : 0.5,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {products.length > 0 && (
          <Grids
            onPress={(product) => {
              navigation.navigate("Details", {
                id: product.id,
              });
            }}
            products={products}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
