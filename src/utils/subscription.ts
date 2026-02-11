export const RESOLUTION_OPTIONS = ["480p", "720p", "1080p"] as const;

export type ResolutionOption = (typeof RESOLUTION_OPTIONS)[number];

export const SUBSCRIPTION_PLANS = [
  { id: "basic-3", name: "3 Months", months: 3, price: 14.99 },
  { id: "standard-6", name: "6 Months", months: 6, price: 26.99 },
  { id: "premium-9", name: "9 Months", months: 9, price: 35.99 },
] as const;

export const FREE_RESOLUTION: ResolutionOption = "480p";

export const isPremiumResolution = (resolution: ResolutionOption) =>
  resolution !== FREE_RESOLUTION;
