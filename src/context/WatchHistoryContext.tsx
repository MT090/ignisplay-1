import { auth, db } from "@/src/firebase";
import { Movie } from "@/src/utils/movieUtils";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface WatchHistoryContextType {
  history: Movie[];
  addToHistory: (movie: Movie) => Promise<void>;
  removeFromHistory: (movieId: string) => Promise<void>;
  clearHistory: () => Promise<void>;
  isLoading: boolean;
}

const WatchHistoryContext = createContext<WatchHistoryContextType>({
  history: [],
  addToHistory: async () => {},
  removeFromHistory: async () => {},
  clearHistory: async () => {},
  isLoading: true,
});

export function WatchHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [history, setHistory] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setHistory([]);
      setIsLoading(false);
      return;
    }

    const historyRef = collection(db, "users", user.uid, "watchHistory");
    const q = query(historyRef, orderBy("watchedAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: Movie[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            title: data.title || "",
            posterUrl: data.posterUrl || "",
            backdropUrl: data.backdropUrl,
            description: data.description,
            year: data.year,
            rating: data.rating,
            duration: data.duration,
            type: data.type,
          };
        });
        setHistory(items);
        setIsLoading(false);
      },
      (error) => {
        console.warn("Watch history listener error:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser?.uid]);

  const addToHistory = useCallback(
    async (movie: Movie) => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(
          db,
          "users",
          user.uid,
          "watchHistory",
          movie.id
        );
        await setDoc(docRef, {
          title: movie.title,
          posterUrl: movie.posterUrl,
          backdropUrl: movie.backdropUrl || null,
          description: movie.description || null,
          year: movie.year || null,
          rating: movie.rating || null,
          duration: movie.duration || null,
          type: movie.type || null,
          watchedAt: serverTimestamp(),
        });
      } catch (error) {
        console.warn("Failed to add to watch history:", error);
      }
    },
    []
  );

  const removeFromHistory = useCallback(async (movieId: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid, "watchHistory", movieId);
      await deleteDoc(docRef);
    } catch (error) {
      console.warn("Failed to remove from watch history:", error);
    }
  }, []);

  const clearHistory = useCallback(async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      // Delete each document in the subcollection
      for (const item of history) {
        const docRef = doc(db, "users", user.uid, "watchHistory", item.id);
        await deleteDoc(docRef);
      }
    } catch (error) {
      console.warn("Failed to clear watch history:", error);
    }
  }, [history]);

  return (
    <WatchHistoryContext.Provider
      value={{ history, addToHistory, removeFromHistory, clearHistory, isLoading }}
    >
      {children}
    </WatchHistoryContext.Provider>
  );
}

export function useWatchHistory() {
  return useContext(WatchHistoryContext);
}
