import { getAnalytics, isSupported } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwWH3e-mYMU1J7xeiLlpVGoyIuW5HBEPs",
  authDomain: "ignis-c07ef.firebaseapp.com",
  projectId: "ignis-c07ef",
  storageBucket: "ignis-c07ef.appspot.com",
  messagingSenderId: "257047620137",
  appId: "1:257047620137:web:7a83bac669f59eeae44a38",
  measurementId: "G-59WWZ1JR4P",
};

// Initialize Firebase defensively
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth with persistence
let auth: Auth;

try {
  if (Platform.OS === "web") {
    auth = getAuth(app);
  } else {
    // For React Native, try to use AsyncStorage-backed persistence.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { initializeAuth, getReactNativePersistence } = require("firebase/auth");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AsyncStorage =
      require("@react-native-async-storage/async-storage").default;
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
} catch (e: any) {
  // If initializeAuth was already called or AsyncStorage is unavailable, fall back.
  // eslint-disable-next-line no-console
  console.warn("initializeAuth fallback to getAuth:", e?.message || e);
  auth = getAuth(app);
}

const db = getFirestore(app);

// Initialize Analytics conditionally (it only works on Web for the JS SDK)
const analytics = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null,
);

export { analytics, app, auth, db };
