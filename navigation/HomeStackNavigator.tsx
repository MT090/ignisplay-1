import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import DetailScreen from "@/screens/DetailScreen";
import { HeaderTitle, HeaderActions } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";
import { Colors } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { MainTabParamList } from "@/navigation/MainTabNavigator";

export type HomeStackParamList = {
  Home: undefined;
  Detail: { 
    id: string;
    title: string;
    posterUrl: string;
    description: string;
    year?: string;
    rating?: string;
    duration?: string;
    type?: "movie" | "series";
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeScreenWithHeader() {
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  
  return (
    <HeaderActions 
      onSearchPress={() => navigation.navigate("SearchTab")}
      onProfilePress={() => navigation.navigate("ProfileTab")}
    />
  );
}

export default function HomeStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
        contentStyle: {
          backgroundColor: Colors.dark.backgroundRoot,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => <HeaderTitle title="Ignisplay" />,
          headerRight: () => <HomeScreenWithHeader />,
          headerTitleAlign: "left",
          headerStyle: {
            backgroundColor: "rgba(28, 16, 34, 0.8)",
          },
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ 
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: Colors.dark.text,
        }}
      />
    </Stack.Navigator>
  );
}
