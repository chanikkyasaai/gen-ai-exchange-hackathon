import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Colors = {
  background: '#FDFCFB',
  primaryText: '#2D3748',
  secondaryText: '#718096',
  accent: '#8E4D4D',
  cardBackground: '#FFFFFF',
  shadow: '#000000',
  success: '#10B981',
  border: '#E2E8F0',
  progress: '#8E4D4D',
  progressBg: '#F7FAFC',
  gradient1: '#8E4D4D',
  gradient2: '#A0616A',
};

const onboardingSections = [
  {
    id: 1,
    title: 'Basic Identity',
    subtitle: 'Who you are',
    icon: 'account-circle',
    completed: false,
    route: '/(onboarding)/identity',
  },
  {
    id: 2,
    title: 'Artisan Profile',
    subtitle: 'Your craft & skills',
    icon: 'palette',
    completed: false,
    route: '/(onboarding)/profile',
  },
  {
    id: 3,
    title: 'Business Essentials',
    subtitle: 'What you sell',
    icon: 'store',
    completed: false,
    route: '/(onboarding)/business',
  },
  {
    id: 4,
    title: 'Digital Presence',
    subtitle: 'Where you want to post',
    icon: 'share',
    completed: false,
    route: '/(onboarding)/presence',
  },
  {
    id: 5,
    title: 'Goals & Vision',
    subtitle: 'What you want from కళ',
    icon: 'flag',
    completed: false,
    route: '/(onboarding)/goals',
  },
];

export default function OnboardingIndex() {
  const router = useRouter();
  const [sections, setSections] = useState(onboardingSections);

  const handleSectionPress = (section: any) => {
    router.push(section.route);
  };

  const handleVoiceAssistant = () => {
    Alert.alert(
      'Voice Assistant',
      'AI voice assistant will help you fill all sections through conversation!',
      [{ text: 'Start Voice Setup', style: 'default' }, { text: 'Cancel', style: 'cancel' }]
    );
  };

  const completedCount = sections.filter(section => section.completed).length;
  const progressPercentage = (completedCount / sections.length) * 100;

  return (
    <LinearGradient
      colors={['#FDFCFB', '#F7FAFC', '#EDF2F7']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header with Progress */}
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Set up your artisan profile to unlock the full potential of కళ
          </Text>
          
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>{completedCount} of {sections.length} completed</Text>
          </View>
        </View>

        {/* Premium Voice Assistant Card */}
        <TouchableOpacity style={styles.premiumVoiceCard} onPress={handleVoiceAssistant}>
          <LinearGradient
            colors={[Colors.gradient1, Colors.gradient2]}
            style={styles.voiceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.voiceIconContainer}>
              <AntDesign name="sound" size={28} color="#FFFFFF" />
            </View>
            <View style={styles.voiceContent}>
              <Text style={styles.voiceTitle}>AI-Powered Quick Setup</Text>
              <Text style={styles.voiceSubtitle}>
                Complete your profile in minutes with our intelligent assistant
              </Text>
            </View>
            <View style={styles.voiceArrow}>
              <AntDesign name="arrowright" size={24} color="#FFFFFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Elegant Divider */}
        <View style={styles.elegantDivider}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerTextContainer}>
            <Text style={styles.dividerText}>or complete manually</Text>
          </View>
          <View style={styles.dividerLine} />
        </View>

        {/* Premium Sections */}
        <View style={styles.sectionsContainer}>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={section.id}
              style={styles.premiumSectionCard}
              onPress={() => handleSectionPress(section)}
            >
              <View style={styles.sectionCardInner}>
                <View style={styles.sectionLeft}>
                  <View style={[
                    styles.sectionIconContainer,
                    section.completed && styles.completedIconContainer
                  ]}>
                    <MaterialIcons 
                      name={section.icon as any} 
                      size={28} 
                      color={section.completed ? '#FFFFFF' : Colors.accent} 
                    />
                  </View>
                  <View style={styles.sectionContent}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
                  </View>
                </View>
                <View style={styles.sectionRight}>
                  {section.completed ? (
                    <View style={styles.completedBadge}>
                      <AntDesign name="checkcircle" size={24} color={Colors.success} />
                    </View>
                  ) : (
                    <View style={styles.pendingBadge}>
                      <AntDesign name="arrowright" size={20} color={Colors.accent} />
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Premium Footer */}
        <View style={styles.footer}>
          <LinearGradient
            colors={completedCount === sections.length ? [Colors.success, '#059669'] : [Colors.border, Colors.border]}
            style={[styles.continueButton]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity
              style={styles.continueButtonInner}
              disabled={completedCount !== sections.length}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={[
                styles.continueButtonText, 
                completedCount !== sections.length && styles.disabledButtonText
              ]}>
                {completedCount === sections.length ? 'Launch కళ Experience' : 'Complete All Sections'}
              </Text>
              {completedCount === sections.length && (
                <AntDesign name="arrowright" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primaryText,
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.secondaryText,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: Colors.progressBg,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.progress,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  premiumVoiceCard: {
    borderRadius: 20,
    marginBottom: 28,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  voiceGradient: {
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  voiceContent: {
    flex: 1,
  },
  voiceTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  voiceSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 22,
  },
  voiceArrow: {
    marginLeft: 12,
  },
  elegantDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerTextContainer: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  dividerText: {
    fontSize: 16,
    color: Colors.secondaryText,
    fontWeight: '500',
  },
  sectionsContainer: {
    gap: 16,
  },
  premiumSectionCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  sectionCardInner: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(142, 77, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  completedIconContainer: {
    backgroundColor: Colors.success,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaryText,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: Colors.secondaryText,
    lineHeight: 20,
  },
  sectionRight: {
    marginLeft: 12,
  },
  completedBadge: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingBadge: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: 40,
    marginBottom: 40,
  },
  continueButton: {
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonInner: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  disabledButtonText: {
    color: Colors.secondaryText,
  },
});
