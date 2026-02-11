import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { auth, db } from "@/src/firebase";
import { RootStackParamList } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Register">;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const getAuthErrorMessage = (code?: string) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please log in.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Choose a stronger password.";
      default:
        return "Unable to create account right now. Please try again.";
    }
  };

  const generateRandomPassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pass);
    setConfirmPassword(pass);
    setError("");
  };

  const handleRegister = async () => {
    Keyboard.dismiss();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert("Validation", "All fields are mandatory");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Validation", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      // Update display name on the Firebase Auth user
      if (userCredential.user) {
        try {
          await updateProfile(userCredential.user, {
            displayName: name.trim(),
          });
        } catch (updErr) {
          // non-fatal; continue
          // eslint-disable-next-line no-console
          console.warn("updateProfile failed:", updErr);
        }

        // Create a user document in Firestore
        try {
          const userRef = doc(db, "users", userCredential.user.uid);
          await setDoc(userRef, {
            name: name.trim(),
            email: email.trim().toLowerCase(),
            createdAt: serverTimestamp(),
          });
        } catch (dbErr) {
          // non-fatal; notify but allow auth to proceed
          // eslint-disable-next-line no-console
          console.warn("Failed to create user doc:", dbErr);
        }
      }

      // DO NOT navigate here — auth state will trigger navigation.
    } catch (e: any) {
      const msg = getAuthErrorMessage(e?.code);
      Alert.alert("Registration error", msg);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.dark.backgroundRoot, "#2d1f36", "#1c1022"]}
          style={StyleSheet.absoluteFillObject}
        />

        {/* Background Elements */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={[
              styles.content,
              {
                paddingTop: insets.top + Spacing.xl,
                paddingBottom: insets.bottom + Spacing.xl,
              },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <ThemedText type="h1" style={styles.title}>
                Create Account
              </ThemedText>
              <ThemedText type="body" style={styles.subtitle}>
                Start your cinematic journey
              </ThemedText>
            </View>

            {error ? (
              <View style={styles.errorContainer}>
                <Feather
                  name="alert-circle"
                  size={16}
                  color={Colors.dark.error}
                />
                <ThemedText style={styles.errorText}>{error}</ThemedText>
              </View>
            ) : null}

            <View style={styles.form}>
              {/* Name Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Feather
                    name="user"
                    size={20}
                    color={Colors.dark.textSecondary}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Feather
                    name="mail"
                    size={20}
                    color={Colors.dark.textSecondary}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Feather
                    name="lock"
                    size={20}
                    color={Colors.dark.textSecondary}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color={Colors.dark.textSecondary}
                  />
                </Pressable>
              </View>

              <Pressable
                onPress={generateRandomPassword}
                style={styles.suggestButton}
              >
                <Feather
                  name="refresh-cw"
                  size={14}
                  color={Colors.dark.primary}
                />
                <ThemedText type="small" style={styles.suggestText}>
                  Suggest strong password
                </ThemedText>
              </Pressable>

              {/* Confirm Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Feather
                    name="check-circle"
                    size={20}
                    color={Colors.dark.textSecondary}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={Colors.dark.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
              </View>

              <Pressable
                onPress={handleRegister}
                style={({ pressed }: { pressed: boolean }) => [
                  styles.button,
                  {
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  },
                ]}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={Colors.dark.buttonText} />
                ) : (
                  <ThemedText type="h4" style={styles.buttonText}>
                    Sign Up
                  </ThemedText>
                )}
              </Pressable>
            </View>

            <View style={styles.footer}>
              <ThemedText type="body" style={styles.footerText}>
                Already have an account?{" "}
              </ThemedText>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <ThemedText type="body" style={styles.linkText}>
                  Sign In
                </ThemedText>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  circle1: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#ef4444",
    opacity: 0.15,
  },
  circle2: {
    position: "absolute",
    bottom: -50,
    left: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: Colors.dark.primary,
    opacity: 0.15,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing["2xl"],
    justifyContent: "center",
  },
  header: {
    marginBottom: Spacing["3xl"],
    alignItems: "center",
  },
  title: {
    color: Colors.dark.text,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: Colors.dark.textSecondary,
    textAlign: "center",
  },
  form: {
    gap: Spacing.lg,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.2)",
  },
  errorText: {
    color: Colors.dark.error,
    fontSize: 14,
  },
  suggestButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    alignSelf: "flex-end",
    marginTop: -Spacing.sm,
    marginBottom: Spacing.xs,
  },
  suggestText: {
    color: Colors.dark.primary,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: BorderRadius.lg,
    height: Spacing.inputHeight * 1.2,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    marginRight: Spacing.md,
  },
  input: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: Typography.body.fontSize,
    height: "100%",
  },
  eyeIcon: {
    padding: Spacing.sm,
  },
  button: {
    backgroundColor: Colors.dark.primary,
    height: Spacing.buttonHeight * 1.1,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing.sm,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: Colors.dark.buttonText,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Spacing["2xl"],
  },
  footerText: {
    color: Colors.dark.textSecondary,
  },
  linkText: {
    color: Colors.dark.primary,
    fontWeight: "600",
  },
});
