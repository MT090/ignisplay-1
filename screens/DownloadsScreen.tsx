import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing } from "@/constants/theme";

export default function DownloadsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.xl }]}>
      <ThemedText type="h3" style={styles.title}>Downloads</ThemedText>
      <View style={styles.emptyState}>
        <View style={styles.iconContainer}>
          <Feather name="download-cloud" size={48} color={Colors.dark.textTertiary} />
        </View>
        <ThemedText type="body" style={styles.emptyText}>
          No downloads yet
        </ThemedText>
        <ThemedText type="small" style={styles.subText}>
          Downloaded movies and shows will appear here
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    color: Colors.dark.text,
    marginBottom: Spacing.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 100,
  },
  iconContainer: {
    marginBottom: Spacing.lg,
  },
  emptyText: {
    color: Colors.dark.textTertiary,
    textAlign: "center",
    marginBottom: Spacing.sm,
  },
  subText: {
    color: Colors.dark.textTertiary,
    textAlign: "center",
    opacity: 0.7,
  },
});
