import React from "react";
import { RootStackScreenProps } from "../navigations/RootNavigator";
import { ScrollView, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { recommendProductApi } from "../services/recommendProduct";
import Grids from "../components/GridProduct";

const RecommendProductScreen = ({
  navigation,
  route: {
    params: { id },
  },
}: RootStackScreenProps<"RecommendProduct">) => {
  const { data: reResponse } = useQuery({
    queryFn: () => recommendProductApi.getByProductId(id),
    queryKey: [recommendProductApi.url, id],
  });

  const reProducts =
    reResponse?.data.data.map((rPro) => rPro.recommendProduct) || [];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ paddingTop: 10 }} />
      <Grids
        onPress={(product) => {
          navigation.navigate("Details", {
            id: product.id,
          });
        }}
        products={reProducts}
      />
    </ScrollView>
  );
};

export default RecommendProductScreen;
