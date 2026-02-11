import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useAppData } from "@/src/context/AppDataContext";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AccountScreen = () => {
  const insets = useSafeAreaInsets();
  const { user, history, myList, subscription } = useAppData();

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + Spacing.xl }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText type="h3" style={styles.title}>
        Account
      </ThemedText>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Profile Information
        </ThemedText>
        <ThemedText type="body" style={styles.infoText}>
          Name: {user?.displayName || "Not set"}
        </ThemedText>
        <ThemedText type="body" style={styles.infoText}>
          Email: {user?.email || "Not set"}
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Activity
        </ThemedText>
        <ThemedText type="body" style={styles.infoText}>
          History items: {history.length}
        </ThemedText>
        <ThemedText type="body" style={styles.infoText}>
          Saved in My List: {myList.length}
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Subscription
        </ThemedText>
        <ThemedText type="body" style={styles.infoText}>
          {subscription
            ? `${subscription.name} • Active until ${new Date(
                subscription.activeUntil
              ).toLocaleDateString()}`
            : "No active subscription (up to 480p is free)."}
        </ThemedText>
      </View>

      <Pressable style={styles.button}>
        <ThemedText type="body" style={styles.buttonText}>
          Manage Account (Coming Soon)
        </ThemedText>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
    paddingHorizontal: Spacing.lg,
  },
  contentContainer: {
    paddingBottom: Spacing.xl,
  },
  title: {
    color: Colors.dark.text,
    marginBottom: Spacing.xl,
  },
  section: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    padding: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.dark.primary,
    marginBottom: Spacing.sm,
  },
  infoText: {
    color: Colors.dark.textTertiary,
    lineHeight: 22,
  },
  button: {
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(173, 43, 238, 0.35)",
  },
  buttonText: {
    color: Colors.dark.primary,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default AccountScreen;
