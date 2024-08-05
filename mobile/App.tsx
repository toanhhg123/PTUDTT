import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  Theme,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigations/RootNavigator";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  const colorScheme = useColorScheme();

  const theme: Theme = useMemo(
    () =>
      colorScheme === "dark"
        ? {
            ...DarkTheme,
            colors: {
              ...DarkTheme.colors,
              primary: "#fff",
              text: "#fff",
            },
          }
        : {
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: "#f5f5f5",
              text: "#191919",
              border: "#D9D9D9",
              primary: "#191919",
            },
          },
    [colorScheme]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <GestureHandlerRootView style={styles.container}>
          <NavigationContainer theme={theme}>
            <BottomSheetModalProvider>
              <RootNavigator />
            </BottomSheetModalProvider>
            <StatusBar style="dark" />
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
