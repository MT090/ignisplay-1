import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import { useWatchHistory } from "@/src/context/WatchHistoryContext";
import { Movie } from "@/src/utils/movieUtils";
import type { MainTabParamList } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface PosterCardProps {
  movie: Movie;
  onPress: () => void;
  onLongPress?: () => void;
  width?: number;
}

function PosterCard({
  movie,
  onPress,
  onLongPress,
  width = 128,
}: PosterCardProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        styles.posterCard,
        {
          width,
          opacity: pressed ? 0.8 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <Image
        source={{ uri: movie.posterUrl }}
        style={[styles.posterImage, { width, height: width * 1.5 }]}
        resizeMode="cover"
      />
      <ThemedText type="body" style={styles.posterTitle} numberOfLines={1}>
        {movie.title}
      </ThemedText>
    </Pressable>
  );
}

export default function MyListScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
  const { history, removeFromHistory, clearHistory, isLoading } =
    useWatchHistory();

  const navigateToDetail = (movie: Movie) => {
    // @ts-ignore - The navigation types are a bit complex between tab/stack
    navigation.navigate("HomeTab", {
      screen: "Detail",
      params: {
        id: movie.id,
        title: movie.title,
        posterUrl: movie.backdropUrl || movie.posterUrl,
        description: movie.description || "",
        year: movie.year,
        rating: movie.rating,
        duration: movie.duration,
        type: movie.type,
      },
    });
  };

  const handleLongPress = (movie: Movie) => {
    Alert.alert(movie.title, "What would you like to do?", [
      {
        text: "Remove from History",
        style: "destructive",
        onPress: () => removeFromHistory(movie.id),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleClearHistory = () => {
    if (history.length === 0) return;
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear your entire watch history?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => clearHistory(),
        },
      ]
    );
  };

  const hasContent = history.length > 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: 100 + insets.bottom },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
        <ThemedText type="h3" style={styles.headerTitle}>
          My List
        </ThemedText>
        {hasContent && (
          <Pressable
            onPress={handleClearHistory}
            style={({ pressed }) => [
              styles.clearButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Feather name="trash-2" size={16} color={Colors.dark.textTertiary} />
            <ThemedText type="small" style={styles.clearButtonText}>
              Clear
            </ThemedText>
          </Pressable>
        )}
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.dark.primary} />
        </View>
      )}

      {!isLoading && !hasContent && (
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconContainer}>
            <Feather
              name="clock"
              size={48}
              color={Colors.dark.textTertiary}
            />
          </View>
          <ThemedText type="body" style={styles.emptyStateText}>
            No watch history yet
          </ThemedText>
          <ThemedText type="small" style={styles.emptyStateSubtext}>
            Movies and shows you open will automatically appear here.
          </ThemedText>
        </View>
      )}

      {!isLoading && hasContent && (
        <>
          <View style={styles.sectionHeader}>
            <ThemedText type="h4" style={styles.sectionTitle}>
              Recently Viewed
            </ThemedText>
            <ThemedText type="small" style={styles.sectionCount}>
              {history.length} {history.length === 1 ? "title" : "titles"}
            </ThemedText>
          </View>
          <FlatList
            data={history}
            renderItem={({ item }) => (
              <PosterCard
                movie={item}
                onPress={() => navigateToDetail(item)}
                onLongPress={() => handleLongPress(item)}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            ItemSeparatorComponent={() => (
              <View style={{ width: Spacing.lg }} />
            )}
          />

          {/* Grid view for all history */}
          <View style={styles.sectionHeader}>
            <ThemedText type="h4" style={styles.sectionTitle}>
              All History
            </ThemedText>
          </View>
          <View style={styles.gridContainer}>
            {history.map((movie) => (
              <Pressable
                key={movie.id}
                onPress={() => navigateToDetail(movie)}
                onLongPress={() => handleLongPress(movie)}
                style={({ pressed }) => [
                  styles.gridItem,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
              >
                <Image
                  source={{ uri: movie.posterUrl }}
                  style={styles.gridImage}
                  resizeMode="cover"
                />
                <ThemedText
                  type="small"
                  style={styles.gridTitle}
                  numberOfLines={1}
                >
                  {movie.title}
                </ThemedText>
                {movie.type && (
                  <View style={styles.typeBadge}>
                    <ThemedText type="small" style={styles.typeText}>
                      {movie.type === "series" ? "Series" : "Movie"}
                    </ThemedText>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const GRID_ITEM_WIDTH =
  (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md * 2) / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
  },
  contentContainer: {
    paddingTop: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  headerTitle: {
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: "700",
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
  clearButtonText: {
    color: Colors.dark.textTertiary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing["5xl"],
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Spacing["5xl"],
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  emptyStateText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "600",
  },
  emptyStateSubtext: {
    color: Colors.dark.textSecondary,
    textAlign: "center",
    maxWidth: "80%",
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
  },
  sectionTitle: {
    color: Colors.dark.text,
  },
  sectionCount: {
    color: Colors.dark.textTertiary,
  },
  horizontalList: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  posterCard: {
    gap: Spacing.sm,
  },
  posterImage: {
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.dark.surface,
  },
  posterTitle: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: "500",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  gridItem: {
    width: GRID_ITEM_WIDTH,
    gap: Spacing.xs,
  },
  gridImage: {
    width: GRID_ITEM_WIDTH,
    height: GRID_ITEM_WIDTH * 1.5,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.dark.surface,
  },
  gridTitle: {
    color: Colors.dark.text,
    fontWeight: "500",
  },
  typeBadge: {
    position: "absolute",
    top: Spacing.xs,
    right: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    backgroundColor: "rgba(173, 43, 238, 0.85)",
    borderRadius: BorderRadius.xs,
  },
  typeText: {
    color: Colors.dark.text,
    fontSize: 10,
    fontWeight: "600",
  },
});
