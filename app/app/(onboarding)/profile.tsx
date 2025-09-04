import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Modal 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Colors = {
  background: '#FDFCFB',
  primaryText: '#4A4A4A',
  secondaryText: '#8A8A8A',
  accent: '#8E4D4D',
  cardBackground: '#FFFFFF',
  shadow: '#000000',
  success: '#4CAF50',
  border: '#E0E0E0',
  inputBackground: '#F8F8F8',
};

const craftCategories = [
  { id: 'handloom', name: 'Handloom', icon: 'content-cut' },
  { id: 'pottery', name: 'Pottery', icon: 'circle' },
  { id: 'jewelry', name: 'Jewelry', icon: 'star' },
  { id: 'painting', name: 'Painting', icon: 'brush' },
  { id: 'woodwork', name: 'Woodwork', icon: 'nature' },
  { id: 'leather', name: 'Leather Craft', icon: 'work' },
  { id: 'textiles', name: 'Textiles', icon: 'checkroom' },
  { id: 'metalwork', name: 'Metalwork', icon: 'hardware' },
  { id: 'other', name: 'Other', icon: 'more-horiz' },
];

const experienceLevels = [
  { id: 'new', label: 'New to crafting', value: 'New' },
  { id: 'beginner', label: 'Less than 2 years', value: '< 2 years' },
  { id: 'intermediate', label: '2-5 years experience', value: '2-5 years' },
  { id: 'expert', label: '5+ years experience', value: '5+ years' },
];

export default function ArtisanProfile() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    craftCategory: '',
    specialization: '',
    experience: '',
    story: '',
  });
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const handleVoiceAssistant = () => {
    setShowVoiceModal(true);
  };

  const handleVoiceConversation = () => {
    Alert.alert(
      'Voice Assistant Active',
      'Great! Now let\'s talk about your craft. What type of artisan work do you do? Pottery, textiles, jewelry, or something else?',
      [
        { text: 'Continue Voice Chat', style: 'default' },
        { text: 'Fill Manually', style: 'cancel', onPress: () => setShowVoiceModal(false) }
      ]
    );
  };

  const handleCraftSelect = (category: any) => {
    setFormData(prev => ({ ...prev, craftCategory: category.id }));
  };

  const handleExperienceSelect = (level: any) => {
    setFormData(prev => ({ ...prev, experience: level.id }));
  };

  const handleNext = () => {
    if (!formData.craftCategory || !formData.experience) {
      Alert.alert('Incomplete', 'Please select your craft category and experience level.');
      return;
    }
    router.push('/(onboarding)/business');
  };

  const isFormValid = formData.craftCategory && formData.experience;

  return (
    <LinearGradient
      colors={[Colors.background, '#F5F2F0']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <AntDesign name="arrowleft" size={24} color={Colors.primaryText} />
          </TouchableOpacity>
          <Text style={styles.title}>Your Craft</Text>
          <Text style={styles.subtitle}>Tell us about your artisan skills</Text>
        </View>

        {/* Voice Assistant Card */}
        <TouchableOpacity style={styles.voiceCard} onPress={handleVoiceAssistant}>
          <View style={styles.voiceIconContainer}>
            <AntDesign name="sound" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.voiceText}>Let AI guide this conversation</Text>
          <AntDesign name="right" size={16} color={Colors.accent} />
        </TouchableOpacity>

        <View style={styles.form}>
          {/* Craft Category */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Craft Category *</Text>
            <View style={styles.gridContainer}>
              {craftCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    formData.craftCategory === category.id && styles.selectedCard
                  ]}
                  onPress={() => handleCraftSelect(category)}
                >
                  <MaterialIcons 
                    name={category.icon as any} 
                    size={24} 
                    color={formData.craftCategory === category.id ? '#FFFFFF' : Colors.accent} 
                  />
                  <Text style={[
                    styles.categoryText,
                    formData.craftCategory === category.id && styles.selectedText
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Specialization */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Specialization / Style</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Traditional Pochampally sarees, Blue pottery, Silver jewelry..."
              value={formData.specialization}
              onChangeText={(text) => setFormData(prev => ({ ...prev, specialization: text }))}
              placeholderTextColor={Colors.secondaryText}
              multiline
              numberOfLines={2}
            />
          </View>

          {/* Experience Level */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Experience Level *</Text>
            <View style={styles.experienceContainer}>
              {experienceLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[
                    styles.experienceCard,
                    formData.experience === level.id && styles.selectedExperienceCard
                  ]}
                  onPress={() => handleExperienceSelect(level)}
                >
                  <Text style={[
                    styles.experienceLabel,
                    formData.experience === level.id && styles.selectedExperienceText
                  ]}>
                    {level.value}
                  </Text>
                  <Text style={[
                    styles.experienceDescription,
                    formData.experience === level.id && styles.selectedExperienceText
                  ]}>
                    {level.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Your Story */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Story (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.storyInput]}
              placeholder="Tell us about your journey, inspiration, or what makes your craft special. Our AI will help create beautiful social media content from this!"
              value={formData.story}
              onChangeText={(text) => setFormData(prev => ({ ...prev, story: text }))}
              placeholderTextColor={Colors.secondaryText}
              multiline
              numberOfLines={4}
            />
            <Text style={styles.helperText}>
              💡 This will be used to generate compelling stories for your social media posts
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.nextButton, !isFormValid && styles.disabledButton]}
            disabled={!isFormValid}
            onPress={handleNext}
          >
            <Text style={[styles.nextButtonText, !isFormValid && styles.disabledButtonText]}>
              Next: Business Details
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Voice Assistant Modal */}
      <Modal
        visible={showVoiceModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowVoiceModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.voiceModalContent}>
            <View style={styles.voiceModalHeader}>
              <Text style={styles.modalTitle}>AI Craft Assistant</Text>
              <TouchableOpacity onPress={() => setShowVoiceModal(false)}>
                <AntDesign name="close" size={24} color={Colors.primaryText} />
              </TouchableOpacity>
            </View>
            <View style={styles.voiceModalBody}>
              <View style={styles.aiAvatar}>
                <MaterialIcons name="palette" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.aiGreeting}>
                Perfect! Now let's explore your craft. I'll ask you about your specialty, experience, and story to help showcase your unique artisan journey.
              </Text>
              <TouchableOpacity
                style={styles.startVoiceButton}
                onPress={handleVoiceConversation}
              >
                <Text style={styles.startVoiceText}>Continue with Voice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primaryText,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  voiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  voiceIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  voiceText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primaryText,
  },
  form: {
    gap: 24,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 12,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryCard: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    minWidth: '30%',
    gap: 4,
  },
  selectedCard: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.primaryText,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  textInput: {
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.primaryText,
    borderWidth: 1,
    borderColor: Colors.border,
    textAlignVertical: 'top',
  },
  storyInput: {
    minHeight: 100,
  },
  helperText: {
    fontSize: 12,
    color: Colors.secondaryText,
    marginTop: 4,
    fontStyle: 'italic',
  },
  experienceContainer: {
    gap: 8,
  },
  experienceCard: {
    backgroundColor: Colors.cardBackground,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
  },
  selectedExperienceCard: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  experienceLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 4,
  },
  experienceDescription: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  selectedExperienceText: {
    color: '#FFFFFF',
  },
  footer: {
    marginTop: 40,
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.border,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  disabledButtonText: {
    color: Colors.secondaryText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceModalContent: {
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 20,
    borderRadius: 16,
    minWidth: 300,
  },
  voiceModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  voiceModalBody: {
    padding: 20,
    alignItems: 'center',
  },
  aiAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiGreeting: {
    fontSize: 16,
    color: Colors.primaryText,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  startVoiceButton: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  startVoiceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
