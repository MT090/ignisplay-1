import { getAnalytics, isSupported } from "firebase/analytics";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDwWH3e-mYMU1J7xeiLlpVGoyIuW5HBEPs",
  authDomain: "ignis-c07ef.firebaseapp.com",
  projectId: "ignis-c07ef",
  storageBucket: "ignis-c07ef.appspot.com",
  messagingSenderId: "257047620137",
  appId: "1:257047620137:web:7a83bac669f59eeae44a38",
  measurementId: "G-59WWZ1JR4P",
};

const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

const createReactNativeAuth = (firebaseApp: FirebaseApp): Auth => {
  try {
    return initializeAuth(firebaseApp, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.warn(
      "React Native auth persistence unavailable, using getAuth:",
      error,
    );
    return getAuth(firebaseApp);
  }
};

const auth: Auth =
  Platform.OS === "web" ? getAuth(app) : createReactNativeAuth(app);

const db = getFirestore(app);

const analytics = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null,
);

export { analytics, app, auth, db };
