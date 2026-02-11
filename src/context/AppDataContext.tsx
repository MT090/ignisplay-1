import { auth } from "@/src/firebase";
import { Movie } from "@/src/utils/movieUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface SubscriptionPlan {
  id: "basic-3" | "standard-6" | "premium-9";
  name: string;
  months: number;
  price: number;
  activeUntil: string;
}

interface AppDataContextType {
  user: User | null;
  history: Movie[];
  myList: Movie[];
  subscription: SubscriptionPlan | null;
  addToHistory: (movie: Movie) => void;
  toggleMyList: (movie: Movie) => void;
  isInMyList: (movieId: string) => boolean;
  activateSubscription: (plan: Omit<SubscriptionPlan, "activeUntil">) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const getStorageKey = (uid?: string | null) =>
  `ignisplay:user-data:${uid || "guest"}`;

interface PersistedData {
  history: Movie[];
  myList: Movie[];
  subscription: SubscriptionPlan | null;
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<Movie[]>([]);
  const [myList, setMyList] = useState<Movie[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionPlan | null>(
    null,
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(getStorageKey(user?.uid));
        if (!raw) {
          setHistory([]);
          setMyList([]);
          setSubscription(null);
          return;
        }
        const data = JSON.parse(raw) as PersistedData;
        setHistory(data.history || []);
        setMyList(data.myList || []);
        setSubscription(data.subscription || null);
      } catch {
        setHistory([]);
        setMyList([]);
        setSubscription(null);
      }
    };
    load();
  }, [user?.uid]);

  useEffect(() => {
    const payload: PersistedData = { history, myList, subscription };
    AsyncStorage.setItem(getStorageKey(user?.uid), JSON.stringify(payload));
  }, [history, myList, subscription, user?.uid]);

  const addToHistory = (movie: Movie) => {
    setHistory((prev) => {
      const next = prev.filter((item) => item.id !== movie.id);
      return [{ ...movie, progress: movie.progress ?? 0.2 }, ...next].slice(
        0,
        40,
      );
    });
  };

  const toggleMyList = (movie: Movie) => {
    setMyList((prev) => {
      if (prev.some((item) => item.id === movie.id)) {
        return prev.filter((item) => item.id !== movie.id);
      }
      return [movie, ...prev];
    });
  };

  const isInMyList = useCallback(
    (movieId: string) => myList.some((item) => item.id === movieId),
    [myList],
  );

  const activateSubscription = (
    plan: Omit<SubscriptionPlan, "activeUntil">,
  ) => {
    const activeUntil = new Date();
    activeUntil.setMonth(activeUntil.getMonth() + plan.months);
    setSubscription({ ...plan, activeUntil: activeUntil.toISOString() });
  };

  const value = useMemo(
    () => ({
      user,
      history,
      myList,
      subscription,
      addToHistory,
      toggleMyList,
      isInMyList,
      activateSubscription,
    }),
    [user, history, myList, subscription, isInMyList],
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
}
