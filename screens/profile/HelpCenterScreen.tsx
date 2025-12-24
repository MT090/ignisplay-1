import { ThemedText } from '@/components/ThemedText';
import { Colors, Spacing } from '@/constants/theme';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HelpCenterScreen = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();

  const helpTopics = [
    {
      id: 'account',
      title: 'Account & Profile',
      description: 'Manage your account settings and profile information',
      icon: 'user',
    },
    {
      id: 'playback',
      title: 'Playback Issues',
      description: 'Troubleshoot video playback problems',
      icon: 'play-circle',
    },
    {
      id: 'subscription',
      title: 'Subscription & Billing',
      description: 'Manage your subscription and payment methods',
      icon: 'credit-card',
    },
    {
      id: 'downloads',
      title: 'Downloads',
      description: 'Learn how to download and watch offline',
      icon: 'download',
    },
    {
      id: 'parental',
      title: 'Parental Controls',
      description: 'Set up and manage parental controls',
      icon: 'shield',
    },
  ];

  const handleTopicPress = (topicId: string) => {
    // In a real app, this would navigate to a specific help article
    navigation.navigate('HelpArticle', { topicId });
  };

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top + Spacing.xl }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText type="h3" style={styles.title}>Help Center</ThemedText>
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <Feather name="search" size={20} color={Colors.dark.textTertiary} style={styles.searchIcon} />
          <ThemedText style={styles.searchPlaceholder}>Search help articles</ThemedText>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="h4" style={styles.sectionTitle}>Popular Topics</ThemedText>
        
        {helpTopics.map((topic, index) => (
          <React.Fragment key={topic.id}>
            <Pressable 
              style={({ pressed }) => [
                styles.topicItem,
                { opacity: pressed ? 0.7 : 1 }
              ]}
              onPress={() => handleTopicPress(topic.id)}
            >
              <View style={styles.topicIcon}>
                <Feather 
                  name={topic.icon as any} 
                  size={20} 
                  color={Colors.dark.primary} 
                />
              </View>
              <View style={styles.topicTextContainer}>
                <ThemedText type="body" style={styles.topicTitle}>
                  {topic.title}
                </ThemedText>
                <ThemedText type="small" style={styles.topicDescription}>
                  {topic.description}
                </ThemedText>
              </View>
              <Feather 
                name="chevron-right" 
                size={20} 
                color={Colors.dark.textTertiary} 
              />
            </Pressable>
            {index < helpTopics.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>

      <View style={styles.contactSection}>
        <ThemedText type="h4" style={styles.contactTitle}>Need more help?</ThemedText>
        <ThemedText style={styles.contactText}>
          Our support team is available 24/7 to assist you with any questions or issues.
        </ThemedText>
        <Pressable 
          style={({ pressed }) => [
            styles.contactButton,
            { opacity: pressed ? 0.7 : 1 }
          ]}
          onPress={() => {}}
        >
          <ThemedText style={styles.contactButtonText}>Contact Support</ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.backgroundRoot,
    paddingHorizontal: Spacing.lg,
  },
  contentContainer: {
    paddingBottom: Spacing.xl * 2,
  },
  title: {
    color: Colors.dark.text,
    marginBottom: Spacing.xl,
  },
  searchContainer: {
    marginBottom: Spacing.xl,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchPlaceholder: {
    color: Colors.dark.textTertiary,
  },
  section: {
    marginBottom: Spacing.xl,
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    color: Colors.dark.primary,
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  topicIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  topicTextContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  topicTitle: {
    color: Colors.dark.text,
    marginBottom: 2,
  },
  topicDescription: {
    color: Colors.dark.textTertiary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.backgroundDefault,
    marginLeft: Spacing.lg,
  },
  contactSection: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 12,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  contactTitle: {
    color: Colors.dark.primary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  contactText: {
    color: Colors.dark.textTertiary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  contactButton: {
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  contactButtonText: {
    color: Colors.dark.buttonText,
    fontWeight: '600',
  },
});

export default HelpCenterScreen;
