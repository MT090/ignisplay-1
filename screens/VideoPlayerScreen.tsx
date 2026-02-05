import type { RootStackParamList } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect } from "react";
import {
  BackHandler,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function VideoPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "VideoPlayer">>();
  const insets = useSafeAreaInsets();

  // Default to 'movie' if not specified, but usually it should be.
  const { id, type } = route.params || {};

  const getVidsrcUrl = () => {
    // If an ID is provided, use Vidsrc
    if (id) {
      if (type === "series") {
        // Defaulting to Season 1 Episode 1 for now
        // In a full app, you'd pass season/episode in params
        return `https://vidsrc.xyz/embed/tv/${id}/1/1`;
      }
      return `https://vidsrc.xyz/embed/movie/${id}`;
    }

    // Fallback to the passed videoUrl or a default sample if absolutely nothing exists
    // This keeps backward compatibility if needed
    return route.params?.videoUrl || "https://vidsrc.xyz/embed/movie/550"; // Fight Club as fallback
  };

  const uri = getVidsrcUrl();

  useEffect(() => {
    // Lock to Landscape on mount
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Handle hardware back button
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleBack();
        return true;
      }
    );

    return () => {
      // Unlock orientation on unmount
      ScreenOrientation.unlockAsync();
      backHandler.remove();
    };
  }, []);

  const handleBack = async () => {
    await ScreenOrientation.unlockAsync();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <WebView
        source={{ uri }}
        style={styles.webview}
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        backgroundColor="black"
      />

      <Pressable
        onPress={handleBack}
        style={[
          styles.closeButton,
          { top: insets.top + 16, left: insets.left + 16 },
        ]}
      >
        <Feather name="x" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  webview: {
    flex: 1,
    backgroundColor: "black",
  },
  closeButton: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
  },
});
