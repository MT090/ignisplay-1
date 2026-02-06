import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { auth, db } from "@/src/firebase";
import { Feather } from "@expo/vector-icons";
import { updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const AccountScreen = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email] = useState(user?.email || "");
  const [memberSince, setMemberSince] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      // Get creation date
      const creationTime = user.metadata.creationTime;
      if (creationTime) {
        setMemberSince(
          new Date(creationTime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
      }
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    if (!displayName.trim()) {
      Alert.alert("Validation", "Display name cannot be empty");
      return;
    }

    Keyboard.dismiss();
    setIsSaving(true);
    try {
      await updateProfile(user, { displayName: displayName.trim() });

      // Also update Firestore user doc
      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          await updateDoc(userRef, { name: displayName.trim() });
        }
      } catch (dbErr) {
        console.warn("Failed to update Firestore user doc:", dbErr);
      }

      setIsEditing(false);
      Alert.alert("Success", "Profile updated successfully");
    } catch (e: any) {
      Alert.alert("Error", e?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Feather name="user" size={40} color={Colors.dark.primary} />
          </View>
          <Pressable
            onPress={() => setIsEditing(!isEditing)}
            style={({ pressed }) => [
              styles.editButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Feather
              name={isEditing ? "x" : "edit-2"}
              size={16}
              color={Colors.dark.primary}
            />
            <ThemedText type="small" style={styles.editButtonText}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </ThemedText>
          </Pressable>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <ThemedText type="small" style={styles.sectionTitle}>
            Profile Information
          </ThemedText>

          <View style={styles.fieldContainer}>
            <ThemedText type="small" style={styles.fieldLabel}>
              Display Name
            </ThemedText>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={displayName}
                onChangeText={setDisplayName}
                placeholder="Enter your name"
                placeholderTextColor={Colors.dark.textTertiary}
                autoCapitalize="words"
              />
            ) : (
              <ThemedText type="body" style={styles.fieldValue}>
                {displayName || "Not set"}
              </ThemedText>
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldContainer}>
            <ThemedText type="small" style={styles.fieldLabel}>
              Email
            </ThemedText>
            <ThemedText type="body" style={styles.fieldValue}>
              {email}
            </ThemedText>
          </View>

          <View style={styles.divider} />

          <View style={styles.fieldContainer}>
            <ThemedText type="small" style={styles.fieldLabel}>
              Member Since
            </ThemedText>
            <ThemedText type="body" style={styles.fieldValue}>
              {memberSince || "Unknown"}
            </ThemedText>
          </View>
        </View>

        {isEditing && (
          <Pressable
            onPress={handleSave}
            disabled={isSaving}
            style={({ pressed }) => [
              styles.saveButton,
              { opacity: pressed || isSaving ? 0.7 : 1 },
            ]}
          >
            {isSaving ? (
              <ActivityIndicator color={Colors.dark.buttonText} />
            ) : (
              <ThemedText type="body" style={styles.saveButtonText}>
                Save Changes
              </ThemedText>
            )}
          </Pressable>
        )}

        {/* Subscription Section */}
        <View style={styles.section}>
          <ThemedText type="small" style={styles.sectionTitle}>
            Subscription
          </ThemedText>
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionBadge}>
              <Feather name="zap" size={16} color={Colors.dark.primary} />
              <ThemedText type="body" style={styles.subscriptionPlan}>
                Free Plan
              </ThemedText>
            </View>
            <ThemedText type="small" style={styles.subscriptionDescription}>
              You are currently on the free plan. Upgrade to unlock premium
              features and ad-free streaming.
            </ThemedText>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <ThemedText type="small" style={styles.sectionTitle}>
            Account Actions
          </ThemedText>
          <Pressable
            style={({ pressed }) => [
              styles.dangerButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={() =>
              Alert.alert(
                "Delete Account",
                "This action cannot be undone. All your data will be permanently deleted.",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () =>
                      Alert.alert(
                        "Not Available",
                        "Account deletion is not yet available. Please contact support."
                      ),
                  },
                ]
              )
            }
          >
            <Feather name="trash-2" size={18} color={Colors.dark.error} />
            <ThemedText type="body" style={styles.dangerButtonText}>
              Delete Account
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  avatarSection: {
    alignItems: "center",
    marginBottom: Spacing.xl,
    gap: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.backgroundDefault,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: "rgba(173, 43, 238, 0.3)",
  },
  editButtonText: {
    color: Colors.dark.primary,
    fontWeight: "600",
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
  fieldContainer: {
    backgroundColor: Colors.dark.surface,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    marginBottom: 1,
  },
  fieldLabel: {
    color: Colors.dark.textTertiary,
    marginBottom: Spacing.xs,
  },
  fieldValue: {
    color: Colors.dark.text,
  },
  input: {
    color: Colors.dark.text,
    fontSize: Typography.body.fontSize,
    backgroundColor: Colors.dark.backgroundDefault,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.backgroundDefault,
  },
  saveButton: {
    backgroundColor: Colors.dark.primary,
    height: 48,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  saveButtonText: {
    color: Colors.dark.buttonText,
    fontWeight: "600",
  },
  subscriptionCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  subscriptionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  subscriptionPlan: {
    color: Colors.dark.primary,
    fontWeight: "600",
  },
  subscriptionDescription: {
    color: Colors.dark.textTertiary,
    lineHeight: 20,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  dangerButtonText: {
    color: Colors.dark.error,
  },
});

export default AccountScreen;
