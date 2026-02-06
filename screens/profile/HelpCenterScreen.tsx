import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";

interface HelpTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  content: string;
}

const helpTopics: HelpTopic[] = [
  {
    id: "account",
    title: "Account & Profile",
    description: "Manage your account settings and profile information",
    icon: "user",
    content:
      "You can manage your account settings from the Profile > Account section. Here you can update your display name, view your email, and manage your subscription.",
  },
  {
    id: "playback",
    title: "Playback Issues",
    description: "Troubleshoot video playback problems",
    icon: "play-circle",
    content:
      "If you are experiencing playback issues, try the following:\n\n1. Check your internet connection\n2. Restart the app\n3. Clear the app cache\n4. Update to the latest version\n5. Try lowering the video quality in Settings > Playback",
  },
  {
    id: "subscription",
    title: "Subscription & Billing",
    description: "Manage your subscription and payment methods",
    icon: "credit-card",
    content:
      "Manage your subscription from Profile > Payment Methods. You can view your current plan, update payment methods, and manage billing settings.",
  },
  {
    id: "downloads",
    title: "Downloads",
    description: "Learn how to download and watch offline",
    icon: "download",
    content:
      "To download content for offline viewing:\n\n1. Find a movie or show you want to download\n2. Tap the download button on the detail page\n3. Access your downloads from the My List tab\n\nNote: Downloads are available for select titles only.",
  },
  {
    id: "parental",
    title: "Parental Controls",
    description: "Set up and manage parental controls",
    icon: "shield",
    content:
      "Parental controls allow you to restrict content based on maturity ratings. You can set up a PIN and configure age restrictions from your account settings. Contact support for help setting this up.",
  },
];

const HelpCenterScreen = () => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const handleTopicPress = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "How would you like to reach us?", [
      {
        text: "Email",
        onPress: () => Linking.openURL("mailto:support@ignisplay.com"),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <ThemedText type="small" style={styles.sectionLabel}>
          Popular Topics
        </ThemedText>

        {helpTopics.map((topic, index) => (
          <React.Fragment key={topic.id}>
            <Pressable
              style={({ pressed }) => [
                styles.topicItem,
                expandedTopic === topic.id && styles.topicItemExpanded,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => handleTopicPress(topic.id)}
            >
              <View style={styles.topicHeader}>
                <View style={styles.topicIcon}>
                  <Feather
                    name={topic.icon as any}
                    size={20}
                    color={Colors.dark.primary}
                  />
                </View>
                <View style={styles.topicTextContainer}>
                  <ThemedText type="body" style={styles.topicTitle}>
                    {topic.title}
                  </ThemedText>
                  <ThemedText type="small" style={styles.topicDescription}>
                    {topic.description}
                  </ThemedText>
                </View>
                <Feather
                  name={
                    expandedTopic === topic.id ? "chevron-up" : "chevron-down"
                  }
                  size={20}
                  color={Colors.dark.textTertiary}
                />
              </View>
              {expandedTopic === topic.id && (
                <View style={styles.topicContent}>
                  <View style={styles.topicDivider} />
                  <ThemedText type="body" style={styles.topicContentText}>
                    {topic.content}
                  </ThemedText>
                </View>
              )}
            </Pressable>
            {index < helpTopics.length - 1 && <View style={{ height: Spacing.sm }} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.contactSection}>
        <ThemedText type="h4" style={styles.contactTitle}>
          Need more help?
        </ThemedText>
        <ThemedText style={styles.contactText}>
          Our support team is available 24/7 to assist you with any questions or
          issues.
        </ThemedText>
        <Pressable
          style={({ pressed }) => [
            styles.contactButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleContactSupport}
        >
          <Feather name="mail" size={18} color={Colors.dark.buttonText} />
          <ThemedText style={styles.contactButtonText}>
            Contact Support
          </ThemedText>
        </Pressable>
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
    paddingTop: Spacing.lg,
    paddingBottom: Spacing["3xl"],
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionLabel: {
    color: Colors.dark.textTertiary,
    marginBottom: Spacing.md,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  topicItem: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    overflow: "hidden",
  },
  topicItemExpanded: {
    borderWidth: 1,
    borderColor: "rgba(173, 43, 238, 0.2)",
  },
  topicHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  topicIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(173, 43, 238, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  topicTextContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  topicTitle: {
    color: Colors.dark.text,
    marginBottom: 2,
  },
  topicDescription: {
    color: Colors.dark.textTertiary,
  },
  topicContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  topicDivider: {
    height: 1,
    backgroundColor: Colors.dark.backgroundDefault,
    marginBottom: Spacing.md,
  },
  topicContentText: {
    color: Colors.dark.textSecondary,
    lineHeight: 22,
  },
  contactSection: {
    backgroundColor: "rgba(173, 43, 238, 0.08)",
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(173, 43, 238, 0.15)",
  },
  contactTitle: {
    color: Colors.dark.primary,
    marginBottom: Spacing.sm,
    textAlign: "center",
  },
  contactText: {
    color: Colors.dark.textTertiary,
    textAlign: "center",
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 24,
  },
  contactButtonText: {
    color: Colors.dark.buttonText,
    fontWeight: "600",
  },
});

export default HelpCenterScreen;
