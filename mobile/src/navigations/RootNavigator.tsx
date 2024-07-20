import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import TabNavigator from "./TabNavigator";

export type RootStackParamList = {
  TabStack: undefined;
  Details: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="TabStack"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Details" component={HomeScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
