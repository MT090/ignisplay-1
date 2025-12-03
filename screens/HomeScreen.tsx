import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  FlatList,
  ImageBackground,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import type { HomeStackParamList } from "@/navigation/HomeStackNavigator";
import { Movie, getTopMovies, getTrendingMovies, getNewReleases } from "@/src/utils/movieUtils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, "Home">;
};



const CONTINUE_WATCHING: Movie[] = [
  {
    id: "continue-1",
    title: "The Social Network",
    posterUrl: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
    description: "The story of the founding of Facebook and the resulting lawsuits.",
    year: "2010",
    rating: "7.8",
    duration: "2h 0min",
    progress: 0.66,
    type: "movie",
  },
  {
    id: "continue-2",
    title: "Stranger Things",
    posterUrl: "https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    year: "2016",
    rating: "8.7",
    duration: "Series",
    progress: 0.25,
    type: "series",
  },
  {
    id: "continue-3",
    title: "Arrival",
    posterUrl: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
    description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    year: "2016",
    rating: "7.9",
    duration: "1h 56min",
    progress: 0.5,
    type: "movie",
  },
];

interface PosterCardProps {
  movie: Movie;
  onPress: () => void;
  width?: number;
}

function PosterCard({ movie, onPress, width = 128 }: PosterCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.posterCard,
        { width, opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
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

interface ContinueWatchingCardProps {
  movie: Movie;
  onPress: () => void;
}

function ContinueWatchingCard({ movie, onPress }: ContinueWatchingCardProps) {
  const cardWidth = 192;
  const cardHeight = cardWidth * (9 / 16);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.continueCard,
        { width: cardWidth, opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
      ]}
    >
      <ImageBackground
        source={{ uri: movie.posterUrl }}
        style={[styles.continueImage, { height: cardHeight }]}
        imageStyle={styles.continueImageStyle}
        resizeMode="cover"
      >
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.7)"]}
          style={styles.continueGradient}
        />
        <View style={styles.playButtonContainer}>
          <View style={styles.playButton}>
            <Feather name="play" size={24} color={Colors.dark.text} />
          </View>
        </View>
        <View style={styles.continueContent}>
          <ThemedText type="body" style={styles.continueTitle} numberOfLines={1}>
            {movie.title}
          </ThemedText>
          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(movie.progress || 0) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <ThemedText type="h3" style={styles.sectionTitle}>
      {title}
    </ThemedText>
  );
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const insets = useSafeAreaInsets();

  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleaseMovies, setNewReleaseMovies] = useState<Movie[]>([]);

  const flatRef = useRef<FlatList>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const [top, trending, newRel] = await Promise.all([
        getTopMovies(),
        getTrendingMovies(),
        getNewReleases(),
      ]);
      setTopMovies(top);
      setTrendingMovies(trending);
      setNewReleaseMovies(newRel);
      // Preload images
      [...top, ...trending, ...newRel].forEach(movie => {
        if (movie.backdropUrl) Image.prefetch(movie.backdropUrl);
        if (movie.posterUrl) Image.prefetch(movie.posterUrl);
      });
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (topMovies.length === 0) return;
    const interval = setInterval(() => {
      const nextIdx = (currentIndex + 1) % topMovies.length;
      const targetIndex = nextIdx === 0 ? topMovies.length : nextIdx;
      flatRef.current?.scrollToIndex({ index: targetIndex, animated: true });
    }, 5000);
    return () => clearInterval(interval);
  }, [topMovies, currentIndex]);

  const carouselData = [...topMovies, ...topMovies];

  const featuredMovie = topMovies[currentIndex] || {
    id: "default",
    title: "Loading...",
    posterUrl: "",
    backdropUrl: "",
    description: "",
    year: "",
    rating: "",
    duration: "",
    type: "movie" as const,
  };

  const renderBanner = (movie: Movie) => (
    <ImageBackground
      source={{ uri: movie.backdropUrl }}
      style={styles.heroBanner}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["transparent", "rgba(28, 16, 34, 0.5)", "rgba(28, 16, 34, 0.95)"]}
        locations={[0, 0.5, 1]}
        style={styles.heroGradient}
      />
      <View style={styles.heroContent}>
        <ThemedText type="h1" style={styles.heroTitle}>
          {movie.title}
        </ThemedText>
        <ThemedText type="small" style={styles.heroDescription} numberOfLines={3}>
          {movie.description}
        </ThemedText>
        <View style={styles.heroButtons}>
          <Pressable
            onPress={() => navigateToDetail(movie)}
            style={({ pressed }) => [
              styles.playButtonLarge,
              { opacity: pressed ? 0.9 : 1 }
            ]}
          >
            <Feather name="play" size={20} color={Colors.dark.text} />
            <ThemedText type="body" style={styles.buttonText}>Play</ThemedText>
          </Pressable>
          <Pressable
            onPress={() => navigateToDetail(movie)}
            style={({ pressed }) => [
              styles.moreInfoButton,
              { opacity: pressed ? 0.8 : 1 }
            ]}
          >
            <Feather name="info" size={20} color={Colors.dark.text} />
            <ThemedText type="body" style={styles.buttonText}>More Info</ThemedText>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );

  const navigateToDetail = (movie: Movie) => {
    navigation.navigate("Detail", {
      id: movie.id,
      title: movie.title,
      posterUrl: movie.backdropUrl || movie.posterUrl,
      description: movie.description || "",
      year: movie.year,
      rating: movie.rating,
      duration: movie.duration,
      type: movie.type,
    });
  };

  const renderPosterItem = ({ item }: { item: Movie }) => (
    <PosterCard
      movie={item}
      onPress={() => navigateToDetail(item)}
    />
  );

  const renderContinueItem = ({ item }: { item: Movie }) => (
    <ContinueWatchingCard
      movie={item}
      onPress={() => navigateToDetail(item)}
    />
  );

  const renderNewReleaseItem = ({ item }: { item: Movie }) => (
    <PosterCard
      movie={item}
      onPress={() => navigateToDetail(item)}
    />
  );

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: 100 + insets.bottom }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroContainer}>
        <FlatList
          ref={flatRef}
          data={carouselData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ width: SCREEN_WIDTH }}>
              <Pressable
                onPress={() => navigateToDetail(item)}
                style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }]}
              >
                {renderBanner(item)}
              </Pressable>
            </View>
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          onMomentumScrollEnd={(event) => {
            const page = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
            if (page >= topMovies.length) {
              flatRef.current?.scrollToIndex({ index: 0, animated: false });
              setCurrentIndex(0);
            } else {
              setCurrentIndex(page);
            }
          }}
          getItemLayout={(data, index) => ({ length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index })}
          initialScrollIndex={0}
        />
      </View>

      <SectionHeader title="Trending Now" />
      <FlatList
        data={trendingMovies}
        renderItem={renderPosterItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ItemSeparatorComponent={() => <View style={{ width: Spacing.lg }} />}
      />

      <SectionHeader title="Continue Watching" />
      <FlatList
        data={CONTINUE_WATCHING}
        renderItem={renderContinueItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ItemSeparatorComponent={() => <View style={{ width: Spacing.lg }} />}
      />

      <SectionHeader title="New Releases" />
      <FlatList
        data={newReleaseMovies}
        renderItem={renderNewReleaseItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ItemSeparatorComponent={() => <View style={{ width: Spacing.lg }} />}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
  },
  contentContainer: {
    paddingTop: 0,
  },
  heroContainer: {
    width: SCREEN_WIDTH,
    height: 480,
    overflow: 'hidden',
  },
  heroBanner: {
    width: SCREEN_WIDTH,
    height: 480,
    justifyContent: "flex-end",
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  heroTitle: {
    color: Colors.dark.text,
    fontSize: 28,
    fontWeight: "700",
  },
  heroDescription: {
    color: Colors.dark.textSecondary,
    fontSize: 14,
    maxWidth: "90%",
  },
  heroButtons: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  playButtonLarge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: Spacing.xl,
    height: 48,
    borderRadius: BorderRadius.sm,
    minWidth: 100,
  },
  moreInfoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    backgroundColor: Colors.dark.overlay,
    paddingHorizontal: Spacing.xl,
    height: 48,
    borderRadius: BorderRadius.sm,
    minWidth: 120,
  },
  buttonText: {
    color: Colors.dark.text,
    fontWeight: "700",
  },
  sectionTitle: {
    color: Colors.dark.text,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
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
  continueCard: {
    borderRadius: BorderRadius.sm,
    overflow: "hidden",
  },
  continueImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  continueImageStyle: {
    borderRadius: BorderRadius.sm,
  },
  continueGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: BorderRadius.sm,
  },
  playButtonContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  continueContent: {
    position: "absolute",
    bottom: Spacing.sm,
    left: Spacing.sm,
    right: Spacing.sm,
  },
  continueTitle: {
    color: Colors.dark.text,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: Spacing.xs,
  },
  progressContainer: {
    width: "100%",
  },
  progressTrack: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: Colors.dark.primary,
    borderRadius: 2,
  },
});
