import { ThemedText } from "@/components/ThemedText";
import { Colors, Spacing } from "@/constants/theme";
import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const recentSearches = ["Action", "Inception", "Sort: 2023"];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <View style={[styles.container, { paddingTop: insets.top + Spacing.lg }]}>
      <View style={styles.header}>
        <Feather name="chevron-left" size={24} color={Colors.dark.text} />
        <ThemedText type="h3" style={styles.title}>Search</ThemedText>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchBar}>
        <Feather name="search" size={18} color={Colors.dark.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Search for movies, series..."
          placeholderTextColor={Colors.dark.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <ThemedText style={styles.filterText}>Rating</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <ThemedText style={styles.filterText}>Year</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedText type="body" style={styles.sectionTitle}>Recent Searches</ThemedText>

        <View style={styles.searchesContainer}>
          {recentSearches.map((search, index) => (
            <View key={index} style={styles.searchItem}>
              <Feather name="search" size={16} color={Colors.dark.textSecondary} />
              <ThemedText style={styles.searchItemText}>{search}</ThemedText>
              <TouchableOpacity>
                <Feather name="x" size={16} color={Colors.dark.textSecondary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
    paddingHorizontal: Spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  title: {
    color: Colors.dark.text,
    flex: 1,
    textAlign: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    marginBottom: Spacing.lg,
  },
  input: {
    flex: 1,
    marginLeft: Spacing.md,
    color: Colors.dark.text,
    fontSize: 14,
  },
  filtersContainer: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  filterButton: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
  },
  filterText: {
    color: Colors.dark.text,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    color: Colors.dark.textSecondary,
    marginBottom: Spacing.md,
    fontSize: 12,
  },
  searchesContainer: {
    gap: Spacing.md,
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.backgroundSecondary,
  },
  searchItemText: {
    flex: 1,
    color: Colors.dark.text,
    fontSize: 14,
  },
});
