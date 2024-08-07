import Icons from "@expo/vector-icons/MaterialIcons";
import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import CustomBottomTabs from "../components/CustomBottomTabs";
import HomeScreen from "../screens/HomeScreen";
import { RootStackScreenProps } from "./RootNavigator";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UpdateUserInfoScreen from "../screens/InfomationScreen";
import PaymentScreen from "../screens/OrderScreen";

export type TabsStackParamList = {
  Home: undefined;
  Cart: undefined;
  Payment: undefined;
  Profile: undefined;
};

const TabStack = createBottomTabNavigator<TabsStackParamList>();

export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    RootStackScreenProps<"TabsStack">
  >;

export default function TabNavigator() {
  return (
    <TabStack.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <CustomBottomTabs {...props} />}
    >
      <TabStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="home" {...props} />;
          },
        }}
      />

      <TabStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon(props) {
            return <Icons name="account-balance-wallet" {...props} />;
          },
        }}
      />
      <TabStack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
          },
        }}
      />

      <TabStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon(props) {
            return <Icons name="shopping-cart" {...props} />;
          },
        }}
      />
    </TabStack.Navigator>
  );
}

export function ExampleComponent() {
  return (
    <View>
      <Text>ExampleComponent</Text>
    </View>
  );
}
