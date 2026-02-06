import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";

const APP_VERSION = "1.0.0";
const APP_BUILD = "1";

const AboutScreen = () => {

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  const aboutItems = [
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: "shield",
      onPress: () => openLink("https://example.com/privacy"),
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: "file-text",
      onPress: () => openLink("https://example.com/terms"),
    },
    {
      id: "licenses",
      title: "Open Source Licenses",
      icon: "code",
      onPress: () => {},
    },
    {
      id: "version",
      title: "Version",
      value: `${APP_VERSION} (${APP_BUILD})`,
      icon: "info",
      onPress: null,
    },
  ];

  const socialLinks = [
    {
      id: "twitter",
      name: "Twitter",
      icon: "twitter",
      url: "https://twitter.com/yourapp",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "instagram",
      url: "https://instagram.com/yourapp",
    },
    {
      id: "website",
      name: "Website",
      icon: "globe",
      url: "https://yourapp.com",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Feather name="film" size={48} color={Colors.dark.primary} />
        </View>
        <ThemedText type="h3" style={styles.title}>
          Ignisplay
        </ThemedText>
        <ThemedText style={styles.version}>Version {APP_VERSION}</ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.description}>
          Ignisplay is your ultimate streaming companion, offering a vast
          library of movies and TV shows at your fingertips. Enjoy high-quality
          streaming, personalized recommendations, and seamless playback across
          all your devices.
        </ThemedText>
      </View>

      <View style={styles.section}>
        {aboutItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <Pressable
              style={({ pressed }) => [
                styles.settingItem,
                { opacity: item.onPress ? (pressed ? 0.7 : 1) : 1 },
              ]}
              onPress={item.onPress || undefined}
              disabled={!item.onPress}
            >
              <View style={styles.settingLeft}>
                <View style={styles.settingIcon}>
                  <Feather
                    name={item.icon as any}
                    size={20}
                    color={Colors.dark.primary}
                  />
                </View>
                <ThemedText type="body" style={styles.settingTitle}>
                  {item.title}
                </ThemedText>
              </View>
              {item.value ? (
                <ThemedText style={styles.settingValue}>
                  {item.value}
                </ThemedText>
              ) : (
                <Feather
                  name="chevron-right"
                  size={20}
                  color={Colors.dark.textTertiary}
                />
              )}
            </Pressable>
            {index < aboutItems.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>
          Follow Us
        </ThemedText>
        <View style={styles.socialLinks}>
          {socialLinks.map((social) => (
            <Pressable
              key={social.id}
              style={({ pressed }) => [
                styles.socialButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => openLink(social.url)}
            >
              <Feather
                name={social.icon as any}
                size={24}
                color={Colors.dark.text}
              />
              <ThemedText style={styles.socialButtonText}>
                {social.name}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <ThemedText style={styles.copyright}>
          © {new Date().getFullYear()} Ignisplay. All rights reserved.
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
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl * 2,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  title: {
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  version: {
    color: Colors.dark.textTertiary,
    fontSize: 14,
  },
  section: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    marginBottom: Spacing.xl,
    overflow: "hidden",
  },
  description: {
    color: Colors.dark.textTertiary,
    lineHeight: 22,
    textAlign: "center",
    padding: Spacing.lg,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(99, 102, 241, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  settingTitle: {
    color: Colors.dark.text,
  },
  settingValue: {
    color: Colors.dark.textTertiary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.backgroundDefault,
    marginLeft: Spacing.lg,
  },
  sectionTitle: {
    color: Colors.dark.primary,
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  socialLinks: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: Spacing.lg,
    paddingTop: 0,
  },
  socialButton: {
    alignItems: "center",
  },
  socialButtonText: {
    marginTop: Spacing.xs,
    fontSize: 12,
    color: Colors.dark.textTertiary,
  },
  footer: {
    alignItems: "center",
    marginTop: Spacing.xl,
  },
  copyright: {
    color: Colors.dark.textTertiary,
    fontSize: 12,
    textAlign: "center",
  },
});

export default AboutScreen;
