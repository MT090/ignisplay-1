import MainTabNavigator from "@/navigation/MainTabNavigator";
import VideoPlayerScreen from "@/screens/VideoPlayerScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export type RootStackParamList = {
    MainTabs: undefined;
    VideoPlayer: {
        videoUrl?: string;
        title?: string;
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen
                name="VideoPlayer"
                component={VideoPlayerScreen}
                options={{
                    animation: "fade",
                }}
            />
        </Stack.Navigator>
    );
}
