import { useTheme } from "@react-navigation/native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardProduct from "../components/CardProduct";
import HeaderUser from "../components/HeaderUser";
import HomeSearch from "../components/HomeSearch";
import Icons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { MasonryFlashList } from "@shopify/flash-list";

import { MESONARY_LIST_DATA, CATEGORIES } from "../../data";

export default function HomeScreen() {
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
          data={CATEGORIES}
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
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <Grids />
      </SafeAreaView>
    </ScrollView>
  );
}

const Grids = () => {
  const { colors } = useTheme();

  return (
    <MasonryFlashList
      data={MESONARY_LIST_DATA}
      numColumns={2}
      estimatedItemSize={200}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      renderItem={({ item, index: i }) => (
        <View style={{ padding: 6 }}>
          <View
            style={{
              aspectRatio: i === 0 ? 1 : 2 / 3,
              position: "relative",
              overflow: "hidden",
              borderRadius: 24,
            }}
          >
            <Image
              source={{
                uri: item.imageUrl,
              }}
              resizeMode="cover"
              style={StyleSheet.absoluteFill}
            />
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  padding: 12,
                },
              ]}
            >
              <View style={{ flexDirection: "row", gap: 8, padding: 4 }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#fff",
                    opacity: 0.4,
                    textShadowColor: "rgba(0,0,0,0.2)",
                    textShadowOffset: {
                      height: 1,
                      width: 0,
                    },
                    textShadowRadius: 4,
                  }}
                >
                  {item.title}
                </Text>
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: 100,
                    height: 32,
                    aspectRatio: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icons name="favorite-border" size={20} color={colors.text} />
                </View>
              </View>
              <View style={{ flex: 1 }} />
              <BlurView
                style={{
                  flexDirection: "row",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  alignItems: "center",
                  padding: 6,
                  borderRadius: 100,
                  overflow: "hidden",
                }}
                intensity={20}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#fff",
                    marginLeft: 8,
                  }}
                  numberOfLines={1}
                >
                  ${item.price}
                </Text>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 100,
                    backgroundColor: "#fff",
                  }}
                >
                  <Icons name="add-shopping-cart" size={18} color="#000" />
                </TouchableOpacity>
              </BlurView>
            </View>
          </View>
        </View>
      )}
    />
  );
};
