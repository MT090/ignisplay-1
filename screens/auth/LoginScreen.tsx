import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { auth } from "@/src/firebase";
import { RootStackParamList } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
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

const { width, height } = Dimensions.get("window");

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Login">;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const getAuthErrorMessage = (code?: string) => {
    switch (code) {
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Invalid email or password.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many attempts. Please wait and try again.";
      default:
        return "Unable to sign in right now. Please try again.";
    }
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!email.trim() || !password) {
      Alert.alert("Validation", "Email and password are mandatory");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Validation", "Password must be at least 6 characters");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );
    } catch (e: any) {
      const msg = getAuthErrorMessage(e?.code);
      Alert.alert("Login error", msg);
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

        {/* Decorative Background Elements */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <ScrollView
            contentContainerStyle={[
              styles.content,
              { paddingTop: insets.top + Spacing.xl },
            ]}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <ThemedText type="h1" style={styles.title}>
                Welcome Back
              </ThemedText>
              <ThemedText type="body" style={styles.subtitle}>
                Sign in to continue watching
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

              <Pressable style={styles.forgotPassword}>
                <ThemedText type="small" style={{ color: Colors.dark.primary }}>
                  Forgot Password?
                </ThemedText>
              </Pressable>

              <Pressable
                onPress={handleLogin}
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
                    Sign In
                  </ThemedText>
                )}
              </Pressable>
            </View>

            <View style={styles.footer}>
              <ThemedText type="body" style={styles.footerText}>
                Don't have an account?{" "}
              </ThemedText>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <ThemedText type="body" style={styles.linkText}>
                  Sign Up
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
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.dark.primary,
    opacity: 0.2,
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 100,
    // React Native doesn't support blur on View natively without libraries like Expo Blur, but opacity works for "glow"
  },
  circle2: {
    position: "absolute",
    bottom: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#ef4444", // secondary accent
    opacity: 0.1,
  },
  content: {
    flex: 1,
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
  forgotPassword: {
    alignSelf: "flex-end",
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
