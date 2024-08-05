import { NavigatorScreenParams } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import React from "react";
import DetailsScreen from "../screens/DetailsScreen";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator, { TabsStackParamList } from "./TabNavigator";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";

export type RootStackParamList = {
  TabsStack: NavigatorScreenParams<TabsStackParamList>;
  Details: {
    id: number;
  };
  Login: undefined;
  PlaceOrder: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="TabsStack"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <RootStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          headerShown: false,
        }}
      />

      <RootStack.Screen
        name="PlaceOrder"
        component={PlaceOrderScreen}
        options={{
          headerShown: false,
        }}
      />

      <RootStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
