import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useAppData } from "@/src/context/AppDataContext";
import { SUBSCRIPTION_PLANS } from "@/src/utils/subscription";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PaymentMethodsScreen() {
  const insets = useSafeAreaInsets();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { subscription, activateSubscription } = useAppData();

  const subscribeToPlan = async (plan: (typeof SUBSCRIPTION_PLANS)[number]) => {
    setLoadingPlan(plan.id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      activateSubscription(plan);
      Alert.alert(
        "Subscription Active",
        `You are now subscribed to the ${
          plan.name
        } plan for $${plan.price.toFixed(2)}.`
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: insets.bottom + Spacing.xl },
      ]}
    >
      <ThemedText type="h3" style={styles.title}>
        Payment & Subscription
      </ThemedText>

      <View style={styles.notice}>
        <Feather name="info" size={16} color={Colors.dark.primary} />
        <ThemedText type="small" style={styles.noticeText}>
          Movies are free up to 480p. Watching in 720p or 1080p requires an
          active subscription.
        </ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText type="small" style={styles.sectionTitle}>
          Subscription Plans
        </ThemedText>

        {SUBSCRIPTION_PLANS.map((plan) => {
          const active = subscription?.id === plan.id;
          const busy = loadingPlan === plan.id;
          return (
            <View key={plan.id} style={styles.planCard}>
              <View>
                <ThemedText type="body" style={styles.planName}>
                  {plan.name}
                </ThemedText>
                <ThemedText type="small" style={styles.planPrice}>
                  ${plan.price.toFixed(2)}
                </ThemedText>
              </View>
              <Pressable
                onPress={() => subscribeToPlan(plan)}
                disabled={busy}
                style={({ pressed }) => [
                  styles.subscribeButton,
                  active && styles.subscribeButtonActive,
                  { opacity: pressed || busy ? 0.75 : 1 },
                ]}
              >
                {busy ? (
                  <ActivityIndicator color={Colors.dark.text} />
                ) : (
                  <ThemedText type="small" style={styles.subscribeButtonText}>
                    {active ? "Active" : "Subscribe"}
                  </ThemedText>
                )}
              </Pressable>
            </View>
          );
        })}
      </View>

      <ThemedText type="small" style={styles.footnote}>
        Payment sheet integration is simulated in-app for now, and can be wired
        to your backend Stripe endpoint when available.
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
    paddingHorizontal: Spacing.lg,
  },
  contentContainer: {
    paddingTop: Spacing.xl,
  },
  title: {
    color: Colors.dark.text,
    marginBottom: Spacing.xl,
  },
  notice: {
    flexDirection: "row",
    gap: Spacing.sm,
    backgroundColor: "rgba(173, 43, 238, 0.12)",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xl,
  },
  noticeText: {
    flex: 1,
    color: Colors.dark.textSecondary,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    color: Colors.dark.textTertiary,
    marginBottom: Spacing.md,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  planCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.dark.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  planName: {
    color: Colors.dark.text,
    fontWeight: "600",
  },
  planPrice: {
    color: Colors.dark.textTertiary,
    marginTop: 4,
  },
  subscribeButton: {
    backgroundColor: Colors.dark.primary,
    borderRadius: BorderRadius.sm,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
    height: 36,
    paddingHorizontal: Spacing.md,
  },
  subscribeButtonActive: {
    backgroundColor: "rgba(34, 197, 94, 0.75)",
  },
  subscribeButtonText: {
    color: Colors.dark.text,
    fontWeight: "700",
  },
  footnote: {
    color: Colors.dark.textTertiary,
    lineHeight: 18,
  },
});
