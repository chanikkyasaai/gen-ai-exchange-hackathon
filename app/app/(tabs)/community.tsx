import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CommunityScreen() {
  const [activeTab, setActiveTab] = useState('feed');

  const tabs = [
    { id: 'feed', label: 'Feed', icon: 'home' },
    { id: 'groups', label: 'Groups', icon: 'users' },
    { id: 'events', label: 'Events', icon: 'calendar' },
  ];

  const posts = [
    {
      id: 1,
      author: 'Maya Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612-96e.jpg?w=50&h=50&fit=crop&crop=face',
      time: '2 hours ago',
      content: 'Just completed my first online sale! Thanks to everyone who shared tips about product photography. The lighting setup really made a difference! 📸✨',
      image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=200&fit=crop',
      likes: 23,
      comments: 8,
      tags: ['photography', 'success', 'tips'],
    },
    {
      id: 2,
      author: 'Raj Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      time: '4 hours ago',
      content: 'Experimenting with eco-friendly packaging for my pottery. What materials are you all using? Looking for sustainable options that still protect during shipping.',
      likes: 15,
      comments: 12,
      tags: ['sustainability', 'packaging', 'pottery'],
    },
    {
      id: 3,
      author: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      time: '1 day ago',
      content: 'Workshop alert! 🎨 I\'m hosting a virtual session on "Digital Marketing for Artisans" this Saturday. Free for community members!',
      likes: 45,
      comments: 18,
      tags: ['workshop', 'marketing', 'learning'],
      isWorkshop: true,
    },
  ];

  const groups = [
    {
      id: 1,
      name: 'Textile Artists Network',
      members: 1234,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
      description: 'Connect with fellow textile artisans',
      isJoined: true,
    },
    {
      id: 2,
      name: 'Pottery & Ceramics',
      members: 856,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=100&h=100&fit=crop',
      description: 'Share techniques and showcase pottery',
      isJoined: false,
    },
    {
      id: 3,
      name: 'Digital Marketing Tips',
      members: 2156,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
      description: 'Learn to market your craft online',
      isJoined: true,
    },
  ];

  const events = [
    {
      id: 1,
      title: 'Virtual Craft Fair',
      date: 'Dec 15, 2024',
      time: '10:00 AM - 6:00 PM',
      attendees: 234,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=150&fit=crop',
      isRegistered: false,
    },
    {
      id: 2,
      title: 'Photography Workshop',
      date: 'Dec 18, 2024',
      time: '2:00 PM - 4:00 PM',
      attendees: 56,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=150&fit=crop',
      isRegistered: true,
    },
  ];

  const renderFeed = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.avatar }} style={styles.avatar} />
            <View style={styles.postInfo}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
            <TouchableOpacity style={styles.postMenu}>
              <Feather name="more-horizontal" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>

          <Text style={styles.postContent}>{post.content}</Text>

          {post.image && (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          )}

          <View style={styles.postTags}>
            {post.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="heart" size={20} color="#64748b" />
              <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="message-circle" size={20} color="#64748b" />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="share" size={20} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderGroups = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {groups.map((group) => (
        <View key={group.id} style={styles.groupCard}>
          <Image source={{ uri: group.image }} style={styles.groupImage} />
          <View style={styles.groupInfo}>
            <Text style={styles.groupName}>{group.name}</Text>
            <Text style={styles.groupDescription}>{group.description}</Text>
            <Text style={styles.groupMembers}>{group.members} members</Text>
          </View>
          <TouchableOpacity
            style={[styles.joinButton, group.isJoined && styles.joinedButton]}
          >
            <Text style={[styles.joinButtonText, group.isJoined && styles.joinedButtonText]}>
              {group.isJoined ? 'Joined' : 'Join'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderEvents = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <View style={styles.eventDetails}>
              <View style={styles.eventDetail}>
                <Feather name="calendar" size={16} color="#64748b" />
                <Text style={styles.eventDetailText}>{event.date}</Text>
              </View>
              <View style={styles.eventDetail}>
                <Feather name="clock" size={16} color="#64748b" />
                <Text style={styles.eventDetailText}>{event.time}</Text>
              </View>
              <View style={styles.eventDetail}>
                <Feather name="users" size={16} color="#64748b" />
                <Text style={styles.eventDetailText}>{event.attendees} attending</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.registerButton, event.isRegistered && styles.registeredButton]}
            >
              <Text style={[styles.registerButtonText, event.isRegistered && styles.registeredButtonText]}>
                {event.isRegistered ? 'Registered' : 'Register'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Feather
              name={tab.icon as any}
              size={18}
              color={activeTab === tab.id ? '#0ea5e9' : '#64748b'}
            />
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'feed' && renderFeed()}
      {activeTab === 'groups' && renderGroups()}
      {activeTab === 'events' && renderEvents()}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <LinearGradient
          colors={['#0ea5e9', '#3b82f6']}
          style={styles.fabGradient}
        >
          <Feather name="plus" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  searchButton: {
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#f1f5f9',
  },
  activeTab: {
    backgroundColor: '#e0f2fe',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 6,
  },
  activeTabText: {
    color: '#0ea5e9',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#64748b',
  },
  postMenu: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContent: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  postTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#0284c7',
    fontWeight: '500',
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 6,
  },
  groupCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  groupImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  groupDescription: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 12,
    color: '#64748b',
  },
  joinButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#0ea5e9',
  },
  joinedButton: {
    backgroundColor: '#e0f2fe',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  joinedButtonText: {
    color: '#0284c7',
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventInfo: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  eventDetails: {
    marginBottom: 16,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  registerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#0ea5e9',
    alignSelf: 'flex-start',
  },
  registeredButton: {
    backgroundColor: '#e0f2fe',
  },
  registerButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  registeredButtonText: {
    color: '#0284c7',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
