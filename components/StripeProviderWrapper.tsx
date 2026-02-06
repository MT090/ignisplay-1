import React from "react";
import { Platform } from "react-native";

interface StripeWrapperProps {
  children: React.ReactElement;
  publishableKey: string;
  merchantIdentifier?: string;
}

export const StripeProviderWrapper = ({
  children,
  publishableKey,
  merchantIdentifier,
}: StripeWrapperProps) => {
  // On web, the native StripeProvider is not available. Just render children.
  if (Platform.OS === "web") {
    return children;
  }

  try {
    // Dynamically require so the web bundler does not try to resolve the native module.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { StripeProvider } = require("@stripe/stripe-react-native");
    return (
      <StripeProvider
        publishableKey={publishableKey}
        merchantIdentifier={merchantIdentifier}
      >
        {children}
      </StripeProvider>
    );
  } catch {
    // If the native module is not linked (e.g. Expo Go without dev-client),
    // silently skip and just render the app.
    return children;
  }
};
