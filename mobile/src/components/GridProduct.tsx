import Icons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { MasonryFlashList } from "@shopify/flash-list";
import { BlurView } from "expo-blur";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Product } from "../types/product";
import useGetCategory from "../hooks/useGetCategory";

interface Props {
  onPress: (product: Product) => void;
  products: Product[];
}

const Grids = ({ products, onPress }: Props) => {
  const { colors } = useTheme();
  const { categoryMap } = useGetCategory();

  return (
    <MasonryFlashList
      data={products}
      numColumns={2}
      estimatedItemSize={200}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
      renderItem={({ item, index: i }) => (
        <TouchableOpacity style={{ padding: 6 }} onPress={() => onPress(item)}>
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
                uri: item.image,
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
                <BlurView
                  style={{
                    flexDirection: "row",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    alignItems: "center",
                    padding: 6,
                    overflow: "hidden",
                    borderRadius: 20,
                    flex: 1,
                    opacity: 0.4,
                  }}
                  intensity={20}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#fff",
                      textShadowColor: "rgba(0,0,0,0.5)",
                      textShadowOffset: {
                        height: 1,
                        width: 0,
                      },
                      textShadowRadius: 4,
                    }}
                  >
                    {item.categoryId
                      ? categoryMap?.[item.categoryId]?.name
                      : "Device"}
                  </Text>
                </BlurView>
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
                  ${item.sellPrice}
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
        </TouchableOpacity>
      )}
    />
  );
};

export default Grids;
