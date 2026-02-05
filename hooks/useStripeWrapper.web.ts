/**
 * Web-compatible mock for useStripe.
 * This prevents the native SDK from crashing the web build.
 */
export const useStripeWrapper = () => {
  return {
    initPaymentSheet: async () => ({
      error: {
        code: "WebNotSupported",
        message:
          "Stripe Native PaymentSheet is not supported in the web browser. Please use a mobile device.",
      },
    }),
    presentPaymentSheet: async () => ({
      error: {
        code: "WebNotSupported",
        message:
          "Stripe Native PaymentSheet is not supported in the web browser. Please use a mobile device.",
      },
    }),
  };
};
