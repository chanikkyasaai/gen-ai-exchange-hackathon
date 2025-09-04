import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  TextInput,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
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
  inputBackground: '#F7FAFC',
  gradient1: '#8E4D4D',
  gradient2: '#A0616A',
};

const primaryGoals = [
  {
    id: 'visibility',
    title: 'Increase Online Visibility',
    description: 'Get discovered by more customers across platforms',
    icon: 'trending-up',
    iconLibrary: 'MaterialIcons',
    color: '#10B981',
    features: ['SEO optimization', 'Social media reach', 'Search visibility']
  },
  {
    id: 'content-creation',
    title: 'AI Content Creation',
    description: 'Professional posts, descriptions, and marketing materials',
    icon: 'auto-fix-high',
    iconLibrary: 'MaterialIcons',
    color: '#3B82F6',
    features: ['Product descriptions', 'Social media posts', 'Marketing copy']
  },
  {
    id: 'auto-posting',
    title: 'Automated Posting',
    description: 'Schedule and post content across multiple platforms',
    icon: 'schedule',
    iconLibrary: 'MaterialIcons',
    color: '#8B5CF6',
    features: ['Multi-platform posting', 'Optimal timing', 'Consistent presence']
  },
  {
    id: 'insights',
    title: 'Business Insights',
    description: 'Data-driven suggestions for growth and optimization',
    icon: 'analytics',
    iconLibrary: 'MaterialIcons',
    color: '#F59E0B',
    features: ['Performance analytics', 'Growth recommendations', 'Market trends']
  },
];

const additionalGoals = [
  { id: 'customer-engagement', title: 'Better Customer Engagement', icon: 'people' },
  { id: 'brand-building', title: 'Build Strong Brand Identity', icon: 'branding-watermark' },
  { id: 'sales-growth', title: 'Increase Sales Revenue', icon: 'trending-up' },
  { id: 'time-saving', title: 'Save Time on Marketing', icon: 'schedule' },
  { id: 'global-reach', title: 'Reach Global Markets', icon: 'public' },
  { id: 'skill-development', title: 'Learn Digital Marketing', icon: 'school' },
];

export default function GoalsVision() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    primaryGoals: [] as string[],
    additionalGoals: [] as string[],
    customGoal: '',
    monthlyTarget: '',
  });
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const handleVoiceAssistant = () => {
    setShowVoiceModal(true);
  };

  const handlePrimaryGoalSelect = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      primaryGoals: prev.primaryGoals.includes(goalId)
        ? prev.primaryGoals.filter(id => id !== goalId)
        : [...prev.primaryGoals, goalId]
    }));
  };

  const handleAdditionalGoalSelect = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      additionalGoals: prev.additionalGoals.includes(goalId)
        ? prev.additionalGoals.filter(id => id !== goalId)
        : [...prev.additionalGoals, goalId]
    }));
  };

  const handleComplete = () => {
    if (formData.primaryGoals.length === 0) {
      Alert.alert('Primary Goal Required', 'Please select your main goal for using కళ.');
      return;
    }
    
    Alert.alert(
      'Profile Complete! 🎉',
      'Welcome to కళ! Your artisan profile is now set up. Let\'s start growing your craft business together.',
      [
        {
          text: 'Launch კळ',
          onPress: () => router.replace('/(tabs)'),
          style: 'default'
        }
      ]
    );
  };

  const isFormValid = formData.primaryGoals.length > 0;

  const renderIcon = (iconName: string, iconLibrary: string = 'MaterialIcons', size: number = 24, color?: string) => {
    switch (iconLibrary) {
      case 'AntDesign':
        return <AntDesign name={iconName as any} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={iconName as any} size={size} color={color} />;
      default:
        return <MaterialIcons name={iconName as any} size={size} color={color} />;
    }
  };

  return (
    <LinearGradient
      colors={['#FDFCFB', '#F7FAFC', '#EDF2F7']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Premium Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <AntDesign name="arrowleft" size={24} color={Colors.primaryText} />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>Goals & Vision</Text>
            <Text style={styles.subtitle}>What do you want to achieve with કળ?</Text>
            <View style={styles.progressIndicator}>
              <Text style={styles.progressText}>Final Step</Text>
            </View>
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
              <MaterialIcons name="flag" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.voiceContent}>
              <Text style={styles.voiceTitle}>Vision Consultant</Text>
              <Text style={styles.voiceSubtitle}>
                Define your business goals with AI guidance
              </Text>
            </View>
            <AntDesign name="arrowright" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.form}>
          {/* Primary Goal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Primary Goal *</Text>
            <Text style={styles.sectionDescription}>
              Choose your main objective for using কळ
            </Text>
            <View style={styles.goalGrid}>
              {primaryGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.primaryGoalCard,
                    formData.primaryGoals.includes(goal.id) && styles.selectedGoalCard
                  ]}
                  onPress={() => handlePrimaryGoalSelect(goal.id)}
                >
                  <View style={styles.goalCardHeader}>
                    <View style={[styles.goalIconContainer, { backgroundColor: goal.color }]}>
                      {renderIcon(goal.icon, goal.iconLibrary, 28, '#FFFFFF')}
                    </View>
                    {formData.primaryGoals.includes(goal.id) && (
                      <View style={styles.selectedBadge}>
                        <AntDesign name="check" size={16} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  <Text style={[
                    styles.goalTitle,
                    formData.primaryGoals.includes(goal.id) && styles.selectedGoalText
                  ]}>
                    {goal.title}
                  </Text>
                  <Text style={[
                    styles.goalDescription,
                    formData.primaryGoals.includes(goal.id) && styles.selectedGoalText
                  ]}>
                    {goal.description}
                  </Text>
                  <View style={styles.goalFeatures}>
                    {goal.features.map((feature, index) => (
                      <View key={index} style={styles.featureItem}>
                        <AntDesign 
                          name="check" 
                          size={12} 
                          color={formData.primaryGoals.includes(goal.id) ? '#FFFFFF' : goal.color} 
                        />
                        <Text style={[
                          styles.featureText,
                          formData.primaryGoals.includes(goal.id) && styles.selectedFeatureText
                        ]}>
                          {feature}
                        </Text>
                      </View>
                    ))}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Additional Goals */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Goals</Text>
            <Text style={styles.sectionDescription}>
              Select any other objectives that interest you
            </Text>
            <View style={styles.additionalGoalsGrid}>
              {additionalGoals.map((goal) => (
                <TouchableOpacity
                  key={goal.id}
                  style={[
                    styles.additionalGoalCard,
                    formData.additionalGoals.includes(goal.id) && styles.selectedAdditionalGoal
                  ]}
                  onPress={() => handleAdditionalGoalSelect(goal.id)}
                >
                  <MaterialIcons 
                    name={goal.icon as any} 
                    size={20} 
                    color={formData.additionalGoals.includes(goal.id) ? '#FFFFFF' : Colors.accent} 
                  />
                  <Text style={[
                    styles.additionalGoalText,
                    formData.additionalGoals.includes(goal.id) && styles.selectedAdditionalGoalText
                  ]}>
                    {goal.title}
                  </Text>
                  {formData.additionalGoals.includes(goal.id) && (
                    <AntDesign name="check" size={16} color="#FFFFFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Custom Goal */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom Goal</Text>
            <Text style={styles.sectionDescription}>
              Describe any specific goal not mentioned above
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., I want to reach 10,000 Instagram followers in 6 months..."
              value={formData.customGoal}
              onChangeText={(text) => setFormData(prev => ({ ...prev, customGoal: text }))}
              placeholderTextColor={Colors.secondaryText}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Monthly Target */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Monthly Sales Target</Text>
            <Text style={styles.sectionDescription}>
              What's your monthly revenue goal? (Optional)
            </Text>
            <View style={styles.targetInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.targetInput}
                placeholder="10,000"
                value={formData.monthlyTarget}
                onChangeText={(text) => setFormData(prev => ({ ...prev, monthlyTarget: text }))}
                placeholderTextColor={Colors.secondaryText}
                keyboardType="numeric"
              />
              <Text style={styles.targetSuffix}>per month</Text>
            </View>
          </View>

          {/* Success Message */}
          <View style={styles.successCard}>
            <LinearGradient
              colors={['rgba(16, 185, 129, 0.1)', 'rgba(5, 150, 105, 0.1)']}
              style={styles.successGradient}
            >
              <MaterialIcons name="celebration" size={32} color={Colors.success} />
              <Text style={styles.successTitle}>You're All Set!</Text>
              <Text style={styles.successDescription}>
                कळ is ready to help you achieve your goals. Let's start your artisan journey!
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Premium Footer */}
        <View style={styles.footer}>
          <LinearGradient
            colors={isFormValid ? [Colors.success, '#059669'] : [Colors.border, Colors.border]}
            style={styles.completeButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity
              style={styles.completeButtonInner}
              disabled={!isFormValid}
              onPress={handleComplete}
            >
              <MaterialIcons name="celebration" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={[
                styles.completeButtonText, 
                !isFormValid && styles.disabledButtonText
              ]}>
                Complete Setup & Launch કळ
              </Text>
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
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primaryText,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginBottom: 12,
  },
  progressIndicator: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  progressText: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '600',
  },
  premiumVoiceCard: {
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  voiceGradient: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  voiceContent: {
    flex: 1,
  },
  voiceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  voiceSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  form: {
    gap: 32,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primaryText,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  sectionDescription: {
    fontSize: 16,
    color: Colors.secondaryText,
    marginBottom: 20,
    lineHeight: 22,
  },
  goalGrid: {
    gap: 16,
  },
  primaryGoalCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  selectedGoalCard: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accent,
  },
  goalCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  goalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaryText,
    marginBottom: 8,
  },
  goalDescription: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginBottom: 16,
    lineHeight: 20,
  },
  selectedGoalText: {
    color: '#FFFFFF',
  },
  goalFeatures: {
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  selectedFeatureText: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  additionalGoalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  additionalGoalCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    minWidth: (width - 72) / 2,
  },
  selectedAdditionalGoal: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  additionalGoalText: {
    fontSize: 12,
    color: Colors.primaryText,
    flex: 1,
    fontWeight: '500',
  },
  selectedAdditionalGoalText: {
    color: '#FFFFFF',
  },
  textInput: {
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: Colors.primaryText,
    borderWidth: 1,
    borderColor: Colors.border,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  targetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryText,
    marginRight: 8,
  },
  targetInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.primaryText,
  },
  targetSuffix: {
    fontSize: 14,
    color: Colors.secondaryText,
    marginLeft: 8,
  },
  successCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 16,
  },
  successGradient: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    borderRadius: 16,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.success,
    marginTop: 12,
    marginBottom: 8,
  },
  successDescription: {
    fontSize: 16,
    color: Colors.primaryText,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    marginTop: 40,
    marginBottom: 40,
  },
  completeButton: {
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  completeButtonInner: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  disabledButtonText: {
    color: Colors.secondaryText,
  },
});
