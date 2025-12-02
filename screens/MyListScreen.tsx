
import { ThemedText } from "@/components/ThemedText";
import { BorderRadius, Colors, Spacing } from "@/constants/theme";
import type { MainTabParamList } from "@/navigation/MainTabNavigator";
import { Feather } from "@expo/vector-icons";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const COLUMN_COUNT = 2;
const ITEM_WIDTH = (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md) / COLUMN_COUNT;
const ITEM_HEIGHT = ITEM_WIDTH * 1.5;

// Dummy data for populated state
const DUMMY_LIST = [
    { id: "1", title: "Dune: Part Two", posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
    { id: "2", title: "The Batman", posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg" },
    { id: "3", title: "Oppenheimer", posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
    { id: "4", title: "Interstellar", posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniL6E8AHtMY4kRFW57gnY1.jpg" },
    { id: "5", title: "Blade Runner 2049", posterUrl: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg" },
    { id: "6", title: "Inception", posterUrl: "https://image.tmdb.org/t/p/w500/9gk7admal4ZLVD9qsmG38r8yRJj.jpg" },
];

export default function MyListScreen() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation<BottomTabNavigationProp<MainTabParamList>>();
    // Toggle this to see empty/populated state (In a real app, this would come from a store)
    const [myList, setMyList] = useState(DUMMY_LIST);

    const renderItem = ({ item }: { item: typeof DUMMY_LIST[0] }) => (
        <Pressable
            style={styles.gridItem}
            onPress={() => {
                // Navigate to detail (mock)
                // navigation.navigate("Detail", { ...item });
            }}
        >
            <Image
                source={{ uri: item.posterUrl }}
                style={styles.poster}
                resizeMode="cover"
            />
        </Pressable>
    );

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header */}
            <View style={styles.header}>
                <ThemedText type="h3" style={styles.headerTitle}>My List</ThemedText>
                {myList.length > 0 && (
                    <Pressable onPress={() => setMyList([])}>
                        <ThemedText type="body" style={styles.editButton}>Edit</ThemedText>
                    </Pressable>
                )}
            </View>

            {myList.length > 0 ? (
                <FlatList
                    data={myList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={COLUMN_COUNT}
                    contentContainerStyle={[
                        styles.gridContainer,
                        { paddingBottom: 100 + insets.bottom }
                    ]}
                    columnWrapperStyle={styles.columnWrapper}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyStateContainer}>
                    <View style={styles.iconContainer}>
                        <Feather name="bookmark" size={48} color={Colors.dark.primary} />
                    </View>
                    <ThemedText type="h4" style={styles.emptyTitle}>
                        Your list is empty
                    </ThemedText>
                    <ThemedText type="body" style={styles.emptySubtitle}>
                        Add movies and shows to watch later
                    </ThemedText>

                    <Pressable
                        style={({ pressed }) => [
                            styles.browseButton,
                            { opacity: pressed ? 0.9 : 1 }
                        ]}
                        onPress={() => {
                            navigation.navigate("HomeTab");
                        }}
                    >
                        <LinearGradient
                            colors={[Colors.dark.primary, "#8A2BE2"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <ThemedText type="body" style={styles.browseButtonText}>
                                Browse Now
                            </ThemedText>
                        </LinearGradient>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.backgroundRoot,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Spacing.lg,
        paddingVertical: Spacing.md,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: "700",
    },
    editButton: {
        color: Colors.dark.primary,
        fontWeight: "600",
    },
    gridContainer: {
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.sm,
    },
    columnWrapper: {
        justifyContent: "space-between",
        marginBottom: Spacing.md,
    },
    gridItem: {
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        borderRadius: BorderRadius.md,
        overflow: "hidden",
        backgroundColor: Colors.dark.surface,
    },
    poster: {
        width: "100%",
        height: "100%",
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Spacing.xl,
        marginTop: -50, // Visual centering adjustment
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "rgba(187, 134, 252, 0.1)",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Spacing.lg,
        borderWidth: 1,
        borderColor: "rgba(187, 134, 252, 0.2)",
    },
    emptyTitle: {
        textAlign: "center",
        marginBottom: Spacing.xs,
    },
    emptySubtitle: {
        textAlign: "center",
        color: Colors.dark.textSecondary,
        marginBottom: Spacing.xl,
    },
    browseButton: {
        width: "100%",
        height: 50,
        borderRadius: BorderRadius.full,
        overflow: "hidden",
    },
    gradientButton: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    browseButtonText: {
        fontWeight: "600",
        fontSize: 16,
    },
});
