
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing, BorderRadius } from "@/constants/theme";
import type { MainTabParamList } from "@/navigation/MainTabNavigator";
import { Movie } from "@/src/utils/movieUtils";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md) / COLUMN_COUNT;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

const HISTORY: Movie[] = [
  {
    id: "history-1",
    title: "Inception",
    posterUrl: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    year: "2010",
    rating: "8.8",
    duration: "2h 28min",
    type: "movie",
  },
  {
    id: "history-2",
    title: "The Dark Knight",
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description: "Batman faces the Joker in Gotham.",
    year: "2008",
    rating: "9.0",
    duration: "2h 32min",
    type: "movie",
  },
  {
    id: "history-3",
    title: "Interstellar",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description: "A journey through space to save humanity.",
    year: "2014",
    rating: "8.6",
    duration: "2h 49min",
    type: "movie",
  },
];

const FAVORITES: Movie[] = [
  {
    id: "fav-1",
    title: "Dune",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    description: "A noble family in a war for spice.",
    year: "2021",
    rating: "8.0",
    duration: "2h 35min",
    type: "movie",
  },
  {
    id: "fav-2",
    title: "Parasite",
    posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    description: "A story of class and greed.",
    year: "2019",
    rating: "8.5",
    duration: "2h 12min",
    type: "movie",
  },
  {
    id: "fav-3",
    title: "Blade Runner 2049",
    posterUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    description: "A new blade runner uncovers secrets.",
    year: "2017",
    rating: "8.0",
    duration: "2h 44min",
    type: "movie",
  },
];

const DOWNLOADS: Movie[] = [
  {
    id: "down-1",
    title: "Oppenheimer",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    description: "The story of J. Robert Oppenheimer.",
    year: "2023",
    rating: "8.5",
    duration: "3h 0min",
    type: "movie",
  },
  {
    id: "down-2",
    title: "Poor Things",
    posterUrl: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    description: "The fantastical evolution of Bella Baxter.",
    year: "2023",
    rating: "8.0",
    duration: "2h 21min",
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

function SectionHeader({ title }: { title: string }) {
  return (
    <ThemedText type="h3" style={styles.sectionTitle}>
      {title}
    </ThemedText>
  );
}

export default function MyListScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();

    const navigateToDetail = (movie: Movie) => {
        // Mock navigation
    };

    const renderPosterItem = ({ item }: { item: Movie }) => (
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
            <View style={[styles.header, { paddingTop: insets.top + Spacing.md }]}>
                <ThemedText type="h3" style={styles.headerTitle}>My List</ThemedText>
            </View>

            <SectionHeader title="History" />
            <FlatList
                data={HISTORY}
                renderItem={renderPosterItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                ItemSeparatorComponent={() => <View style={{ width: Spacing.lg }} />}
            />

            <SectionHeader title="Favorites" />
            <FlatList
                data={FAVORITES}
                renderItem={renderPosterItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
                ItemSeparatorComponent={() => <View style={{ width: Spacing.lg }} />}
            />

            <SectionHeader title="Downloads" />
            <FlatList
                data={DOWNLOADS}
                renderItem={renderPosterItem}
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
    header: {
        paddingHorizontal: Spacing.lg,
        paddingBottom: Spacing.sm,
    },
    headerTitle: {
        color: Colors.dark.text,
        fontSize: 24,
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
});
