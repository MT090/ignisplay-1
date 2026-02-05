import { StripeProvider } from "@stripe/stripe-react-native";
import React from "react";

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
  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier={merchantIdentifier}
    >
      {children}
    </StripeProvider>
  );
};
