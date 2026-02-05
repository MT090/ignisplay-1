import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing } from "@/constants/theme";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AccountScreen = () => {
  const insets = useSafeAreaInsets();

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
          Manage your profile information and account settings.
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Subscription
        </ThemedText>
        <ThemedText type="body" style={styles.infoText}>
          View and manage your subscription plan.
        </ThemedText>
      </View>
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
});

export default AccountScreen;
