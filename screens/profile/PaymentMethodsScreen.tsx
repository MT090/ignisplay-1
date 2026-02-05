import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useStripeWrapper } from "@/hooks/useStripeWrapper";
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

interface Card {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

const MOCK_CARDS: Card[] = [
  { id: "1", brand: "Visa", last4: "4242", expMonth: 12, expYear: 2026 },
];

export default function PaymentMethodsScreen() {
  const insets = useSafeAreaInsets();
  const { initPaymentSheet, presentPaymentSheet } = useStripeWrapper();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState<Card[]>(MOCK_CARDS);

  // In a real app, you would fetch the clientSecret from your backend
  const fetchPaymentSheetParams = async () => {
    // This is a placeholder. You must implement a backend endpoint to:
    // 1. Create a Customer (if one doesn't exist)
    // 2. Create a SetupIntent
    // 3. Return the intent's clientSecret

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      setupIntent: "seti_placeholder_secret", // Real setup intent secret from backend
      customer: "cus_placeholder",
      ephemeralKey: "ek_placeholder",
    };
  };

  const initializePaymentSheet = async () => {
    setLoading(true);
    try {
      // NOTE: This will fail until you provide a REAL clientSecret from a backend.
      // We are setting it up so it's ready for your backend integration.
      const { setupIntent, customer, ephemeralKey } =
        await fetchPaymentSheetParams();

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Ignisplay",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        setupIntentClientSecret: setupIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: "Jane Doe",
        },
        style: "alwaysDark",
        appearance: {
          colors: {
            primary: Colors.dark.primary,
            background: Colors.dark.backgroundRoot,
            componentBackground: Colors.dark.surface,
            componentDivider: Colors.dark.backgroundSecondary,
            primaryText: Colors.dark.text,
            secondaryText: Colors.dark.textSecondary,
            placeholderText: Colors.dark.textTertiary,
            icon: Colors.dark.primary,
            error: Colors.dark.error,
          },
          shapes: {
            borderRadius: BorderRadius.md,
            borderWidth: 1,
          },
        },
      });

      if (!error) {
        openPaymentSheet();
      } else {
        Alert.alert(`Error: ${error.code}`, error.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code !== "Canceled") {
        Alert.alert(`Error: ${error.code}`, error.message);
      }
    } else {
      Alert.alert("Success", "Your payment method is successfully saved!");
      // In a real app, you would refresh the card list from your backend
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
        Payment Methods
      </ThemedText>

      <View style={styles.section}>
        <ThemedText type="small" style={styles.sectionTitle}>
          Saved Cards
        </ThemedText>
        {cards.map((card) => (
          <View key={card.id} style={styles.cardItem}>
            <View style={styles.cardLeft}>
              <View style={styles.cardIcon}>
                <Feather
                  name="credit-card"
                  size={20}
                  color={Colors.dark.primary}
                />
              </View>
              <View>
                <ThemedText type="body" style={styles.cardBrand}>
                  {card.brand} •••• {card.last4}
                </ThemedText>
                <ThemedText type="small" style={styles.cardExpiry}>
                  Expires {card.expMonth}/{card.expYear}
                </ThemedText>
              </View>
            </View>
            <Pressable>
              <Feather
                name="trash-2"
                size={18}
                color={Colors.dark.textTertiary}
              />
            </Pressable>
          </View>
        ))}

        <Pressable
          onPress={initializePaymentSheet}
          disabled={loading}
          style={({ pressed }) => [
            styles.addButton,
            { opacity: pressed || loading ? 0.7 : 1 },
          ]}
        >
          {loading ? (
            <ActivityIndicator color={Colors.dark.primary} />
          ) : (
            <>
              <View style={styles.addIcon}>
                <Feather name="plus" size={20} color={Colors.dark.primary} />
              </View>
              <ThemedText type="body" style={styles.addButtonText}>
                Add New Payment Method
              </ThemedText>
            </>
          )}
        </Pressable>
      </View>

      <View style={styles.notice}>
        <Feather
          name="shield"
          size={16}
          color={Colors.dark.textTertiary}
          style={styles.noticeIcon}
        />
        <ThemedText type="small" style={styles.noticeText}>
          Your payment information is encrypted and securely processed by
          Stripe. Ignisplay does not store your full card details.
        </ThemedText>
      </View>
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
    marginBottom: Spacing["2xl"],
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
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.dark.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(173, 43, 238, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  cardBrand: {
    color: Colors.dark.text,
    fontWeight: "600",
  },
  cardExpiry: {
    color: Colors.dark.textTertiary,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: "rgba(173, 43, 238, 0.3)",
    borderStyle: "dashed",
    marginTop: Spacing.md,
    justifyContent: "center",
  },
  addIcon: {
    marginRight: Spacing.sm,
  },
  addButtonText: {
    color: Colors.dark.primary,
    fontWeight: "600",
  },
  notice: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginTop: Spacing.xl,
  },
  noticeIcon: {
    marginRight: Spacing.sm,
    marginTop: 2,
  },
  noticeText: {
    flex: 1,
    color: Colors.dark.textTertiary,
    lineHeight: 18,
  },
});
