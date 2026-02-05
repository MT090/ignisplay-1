import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StripeProviderWrapper } from "@/components/StripeProviderWrapper";
import MainTabNavigator from "@/navigation/MainTabNavigator";
import LoginScreen from "@/screens/auth/LoginScreen";
import RegisterScreen from "@/screens/auth/RegisterScreen";
import VideoPlayerScreen from "@/screens/VideoPlayerScreen";
import { auth } from "@/src/firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.root}>
          <StripeProviderWrapper
            publishableKey="pk_test_51P..." // Replace with your actual Stripe Publishable Key
            merchantIdentifier="merchant.com.ignisplay" // Required for Apple Pay
          >
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={user ? "MainTabs" : "Login"}
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: "#1c1022" },
                }}
              >
                {!user ? (
                  <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                  </>
                ) : (
                  <>
                    <Stack.Screen
                      name="MainTabs"
                      component={MainTabNavigator}
                    />
                    <Stack.Screen
                      name="VideoPlayer"
                      component={VideoPlayerScreen}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </StripeProviderWrapper>
          <StatusBar style="light" />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
