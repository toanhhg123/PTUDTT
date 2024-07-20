import { View, Text } from "react-native";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import Icons from "@expo/vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type TabNavigatorParams = {
  Home: undefined;
  Profile: undefined;
  cart: undefined;
  payment: undefined;
};

const TabStack = createBottomTabNavigator<TabNavigatorParams>();

export default function TabNavigator() {
  return (
    <TabStack.Navigator>
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
        name="Profile"
        component={ExampleComponent}
        options={{
          tabBarIcon(props) {
            return <Icons name="shopping-cart" {...props} />;
          },
        }}
      />
      <TabStack.Screen
        name="cart"
        component={ExampleComponent}
        options={{
          tabBarIcon(props) {
            return <Icons name="account-balance-wallet" {...props} />;
          },
        }}
      />
      <TabStack.Screen
        name="payment"
        component={ExampleComponent}
        options={{
          tabBarIcon(props) {
            return <Icons name="person" {...props} />;
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
