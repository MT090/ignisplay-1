import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { ProfileStackParamList } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  "Profile"
>;

interface SettingItemProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  onPress: () => void;
  showArrow?: boolean;
  destructive?: boolean;
}

function SettingItem({
  icon,
  title,
  onPress,
  showArrow = true,
  destructive = false,
}: SettingItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => [
        styles.settingItem,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <View style={styles.settingLeft}>
        <View
          style={[styles.settingIcon, destructive && styles.destructiveIcon]}
        >
          <Feather
            name={icon}
            size={20}
            color={destructive ? Colors.dark.error : Colors.dark.text}
          />
        </View>
        <ThemedText
          type="body"
          style={[styles.settingTitle, destructive && styles.destructiveText]}
        >
          {title}
        </ThemedText>
      </View>
      {showArrow && (
        <Feather
          name="chevron-right"
          size={20}
          color={Colors.dark.textTertiary}
        />
      )}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleAccount = () => {
    navigation.navigate("Account");
  };

  const handleNotifications = () => {
    navigation.navigate("Notifications");
  };

  const handlePlayback = () => {
    navigation.navigate("Playback");
  };

  const handlePaymentMethods = () => {
    navigation.navigate("PaymentMethods");
  };

  const handleHelpCenter = () => {
    navigation.navigate("HelpCenter");
  };

  const handleAbout = () => {
    navigation.navigate("About");
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => {
          // Reset navigation to Login screen
          navigation
            .getParent()
            ?.getParent()
            ?.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top + Spacing.xl }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText type="h3" style={styles.title}>
        Profile
      </ThemedText>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Feather name="user" size={32} color={Colors.dark.primary} />
        </View>
        <View style={styles.profileInfo}>
          <ThemedText type="h4" style={styles.profileName}>
            Guest User
          </ThemedText>
          <ThemedText type="small" style={styles.profileEmail}>
            Sign in to sync your data
          </ThemedText>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="small" style={styles.sectionTitle}>
          Settings
        </ThemedText>
        <SettingItem icon="user" title="Account" onPress={handleAccount} />
        <SettingItem
          icon="bell"
          title="Notifications"
          onPress={handleNotifications}
        />
        <SettingItem
          icon="play-circle"
          title="Playback"
          onPress={handlePlayback}
        />
        <SettingItem
          icon="credit-card"
          title="Payment Methods"
          onPress={handlePaymentMethods}
        />
      </View>

      <View style={styles.section}>
        <ThemedText type="small" style={styles.sectionTitle}>
          Support
        </ThemedText>
        <SettingItem
          icon="help-circle"
          title="Help Center"
          onPress={handleHelpCenter}
        />
        <SettingItem icon="info" title="About" onPress={handleAbout} />
      </View>

      <View style={[styles.section, { marginBottom: 120 }]}>
        <SettingItem
          icon="log-out"
          title="Log Out"
          onPress={handleLogout}
          showArrow={false}
          destructive
        />
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
    paddingBottom: Spacing["3xl"],
  },
  title: {
    color: Colors.dark.text,
    marginBottom: Spacing.xl,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing["2xl"],
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.dark.backgroundDefault,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  profileName: {
    color: Colors.dark.text,
    marginBottom: Spacing.xs,
  },
  profileEmail: {
    color: Colors.dark.textTertiary,
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
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.backgroundDefault,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  destructiveIcon: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  settingTitle: {
    color: Colors.dark.text,
  },
  destructiveText: {
    color: Colors.dark.error,
  },
});
