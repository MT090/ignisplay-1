import { Colors, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import HomeStackNavigator from "@/navigation/HomeStackNavigator";
import MyListScreen from "@/screens/MyListScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import SearchScreen from "@/screens/SearchScreen";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type MainTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  MyListTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  const { theme, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.primary,
        tabBarInactiveTintColor: Colors.dark.tabIconDefault,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Platform.select({
            ios: "rgba(28, 16, 34, 0.9)",
            android: "rgba(28, 16, 34, 0.95)",
            web: "rgba(28, 16, 34, 0.95)",
          }),
          borderTopWidth: 0,
          elevation: 0,
          height: Spacing.tabBarHeight + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : Spacing.sm,
          paddingTop: Spacing.sm,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          marginBottom: Platform.OS === 'android' ? -Spacing.sm : 0,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView
              intensity={80}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          ) : null,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyListTab"
        component={MyListScreen}
        options={{
          title: "My List",
          tabBarIcon: ({ color, size }) => (
            <Feather name="bookmark" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
