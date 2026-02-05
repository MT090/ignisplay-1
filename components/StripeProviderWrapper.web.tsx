import React from "react";

interface StripeWrapperProps {
  children: React.ReactElement;
  publishableKey: string;
  merchantIdentifier?: string;
}

/**
 * Web-compatible mock for StripeProvider.
 * On web, you typically use @stripe/stripe-js which follows a different pattern,
 * or logic is handled separately. This prevents the native SDK from crashing the web build.
 */
export const StripeProviderWrapper = ({ children }: StripeWrapperProps) => {
  return <>{children}</>;
};
