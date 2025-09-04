import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Image, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoPost, setAutoPost] = useState(false);

  const profileStats = [
    { label: 'Products', value: '24', icon: 'package' },
    { label: 'Followers', value: '1.2K', icon: 'users' },
    { label: 'Sales', value: '$3.4K', icon: 'dollar-sign' },
  ];

  const connectedAccounts = [
    { platform: 'Instagram', username: '@artisan_maya', connected: true, color: '#E4405F' },
    { platform: 'WhatsApp', username: '+91 98765 43210', connected: true, color: '#25D366' },
    { platform: 'Amazon', username: 'maya_crafts', connected: false, color: '#FF9900' },
    { platform: 'Etsy', username: 'Not connected', connected: false, color: '#F56040' },
    { platform: 'YouTube', username: 'Maya Crafts Channel', connected: true, color: '#FF0000' },
  ];

  const menuItems = [
    { title: 'Business Information', icon: 'briefcase', action: () => {} },
    { title: 'Payment Methods', icon: 'credit-card', action: () => {} },
    { title: 'Shipping Settings', icon: 'truck', action: () => {} },
    { title: 'Analytics & Reports', icon: 'bar-chart-2', action: () => {} },
    { title: 'Help & Support', icon: 'help-circle', action: () => {} },
    { title: 'Privacy Policy', icon: 'shield', action: () => {} },
    { title: 'Terms of Service', icon: 'file-text', action: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Feather name="settings" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <LinearGradient
            colors={['#0ea5e9', '#3b82f6']}
            style={styles.profileGradient}
          >
            <View style={styles.profileContent}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1494790108755-2616b612f96e?w=100&h=100&fit=crop&crop=face'
                }}
                style={styles.profileImage}
              />
              <Text style={styles.profileName}>Maya Patel</Text>
              <Text style={styles.profileTitle}>Textile Artist & Designer</Text>
              <Text style={styles.profileLocation}>📍 Mumbai, India</Text>
              
              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {profileStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <View style={styles.statIcon}>
                  <Feather name={stat.icon as any} size={20} color="#0ea5e9" />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Connected Accounts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connected Accounts</Text>
          {connectedAccounts.map((account, index) => (
            <View key={index} style={styles.accountItem}>
              <View style={styles.accountInfo}>
                <View style={[styles.platformIcon, { backgroundColor: account.color + '20' }]}>
                  <View style={[styles.platformDot, { backgroundColor: account.color }]} />
                </View>
                <View style={styles.accountDetails}>
                  <Text style={styles.platformName}>{account.platform}</Text>
                  <Text style={styles.accountUsername}>{account.username}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.connectButton,
                  account.connected ? styles.connectedButton : styles.disconnectedButton
                ]}
              >
                <Text
                  style={[
                    styles.connectButtonText,
                    account.connected ? styles.connectedButtonText : styles.disconnectedButtonText
                  ]}
                >
                  {account.connected ? 'Connected' : 'Connect'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="moon" size={20} color="#64748b" />
              <View style={styles.settingDetails}>
                <Text style={styles.settingTitle}>Dark Mode</Text>
                <Text style={styles.settingDescription}>Switch to dark theme</Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e2e8f0', true: '#0ea5e9' }}
              thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="bell" size={20} color="#64748b" />
              <View style={styles.settingDetails}>
                <Text style={styles.settingTitle}>Push Notifications</Text>
                <Text style={styles.settingDescription}>Get notified about updates</Text>
              </View>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e2e8f0', true: '#0ea5e9' }}
              thumbColor={notifications ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Feather name="zap" size={20} color="#64748b" />
              <View style={styles.settingDetails}>
                <Text style={styles.settingTitle}>Auto-Post</Text>
                <Text style={styles.settingDescription}>Automatically share new products</Text>
              </View>
            </View>
            <Switch
              value={autoPost}
              onValueChange={setAutoPost}
              trackColor={{ false: '#e2e8f0', true: '#0ea5e9' }}
              thumbColor={autoPost ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More Options</Text>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
              <View style={styles.menuItemContent}>
                <Feather name={item.icon as any} size={20} color="#64748b" />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Feather name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Kala v1.0.0</Text>
          <Text style={styles.versionSubtext}>AI-Powered Marketplace Assistant</Text>
        </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  settingsButton: {
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
  profileSection: {
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  profileGradient: {
    padding: 24,
    alignItems: 'center',
  },
  profileContent: {
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editProfileText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  accountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  platformIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  platformDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  accountDetails: {
    flex: 1,
  },
  platformName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  accountUsername: {
    fontSize: 13,
    color: '#64748b',
  },
  connectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  connectedButton: {
    backgroundColor: '#dcfce7',
  },
  disconnectedButton: {
    backgroundColor: '#fef3c7',
  },
  connectButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  connectedButtonText: {
    color: '#059669',
  },
  disconnectedButtonText: {
    color: '#d97706',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingDetails: {
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#64748b',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#dc2626',
    marginLeft: 8,
  },
  versionInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  versionText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
