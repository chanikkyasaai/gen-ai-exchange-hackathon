 import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const quickActions = [
    { icon: 'plus', title: 'Add Product', color: '#0ea5e9', route: '/product/add' },
    { icon: 'send', title: 'Auto-Post', color: '#d946ef', route: '/product/schedule' },
    { icon: 'calendar', title: 'Schedule', color: '#059669', route: '/schedule' },
    { icon: 'trending-up', title: 'Insights', color: '#ea580c', route: '/insights' },
  ];

  const tips = [
    {
      title: 'Photography Tips',
      description: 'Learn how to take stunning product photos',
      color: ['#0ea5e9', '#3b82f6'] as const,
    },
    {
      title: 'Market Trends',
      description: 'Discover what customers are buying now',
      color: ['#d946ef', '#a855f7'] as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.subtitle}>Ready to showcase your craft?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Feather name="bell" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} style={styles.actionCard}>
                <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                  <Feather name={action.icon as any} size={24} color={action.color} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Tips & Promotions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tips & Insights</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tips.map((tip, index) => (
              <LinearGradient
                key={index}
                colors={tip.color}
                style={styles.tipCard}
              >
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
                <TouchableOpacity style={styles.tipButton}>
                  <Text style={styles.tipButtonText}>Learn More</Text>
                  <Feather name="arrow-right" size={16} color="white" />
                </TouchableOpacity>
              </LinearGradient>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Feather name="upload" size={16} color="#0ea5e9" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Product uploaded</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Feather name="heart" size={16} color="#d946ef" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>5 new likes on your post</Text>
                <Text style={styles.activityTime}>4 hours ago</Text>
              </View>
            </View>
          </View>
        </View>

        {/* AI Assistant CTA */}
        <TouchableOpacity style={styles.aiAssistantCard}>
          <LinearGradient
            colors={['#7c3aed', '#a855f7']}
            style={styles.aiGradient}
          >
            <View style={styles.aiContent}>
              <Feather name="message-circle" size={24} color="white" />
              <View style={styles.aiText}>
                <Text style={styles.aiTitle}>AI Assistant</Text>
                <Text style={styles.aiSubtitle}>Get instant help with your products</Text>
              </View>
            </View>
            <Feather name="arrow-right" size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  actionCard: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  actionIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  tipCard: {
    width: 280,
    padding: 20,
    borderRadius: 20,
    marginLeft: 24,
    marginRight: 8,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
  },
  tipButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    marginRight: 8,
  },
  activityCard: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748b',
  },
  aiAssistantCard: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
  },
  aiGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  aiText: {
    marginLeft: 16,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  aiSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});
