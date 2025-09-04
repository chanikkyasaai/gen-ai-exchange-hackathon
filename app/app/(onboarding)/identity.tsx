import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Modal,
  Dimensions 
} from 'react-native';
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
  inputBackground: '#F7FAFC',
  gradient1: '#8E4D4D',
  gradient2: '#A0616A',
};

const languages = [
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
];

export default function BasicIdentity() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    selectedLanguage: null as any,
    profilePhoto: null,
  });
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const handleVoiceAssistant = () => {
    setShowVoiceModal(true);
  };

  const handleVoiceConversation = () => {
    Alert.alert(
      'Voice Assistant Active',
      'Hello! I\'m your AI assistant. Let me help you set up your profile. What\'s your full name?',
      [
        { text: 'Start Voice Chat', style: 'default' },
        { text: 'Cancel', style: 'cancel', onPress: () => setShowVoiceModal(false) }
      ]
    );
  };

  const handleLanguageSelect = (language: any) => {
    setFormData(prev => ({ ...prev, selectedLanguage: language }));
    setShowLanguageModal(false);
  };

  const handleNext = () => {
    if (!formData.fullName || !formData.selectedLanguage) {
      Alert.alert('Incomplete', 'Please fill in your name and select a language.');
      return;
    }
    // Navigate to next onboarding step
    router.push('/(onboarding)/profile');
  };

  const isFormValid = formData.fullName.trim() && formData.selectedLanguage;

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
            <Text style={styles.title}>Basic Identity</Text>
            <Text style={styles.subtitle}>Tell us who you are</Text>
            <View style={styles.progressIndicator}>
              <Text style={styles.progressText}>Step 1 of 5</Text>
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
              <AntDesign name="sound" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.voiceContent}>
              <Text style={styles.voiceTitle}>AI Assistant</Text>
              <Text style={styles.voiceSubtitle}>
                Let me help you set up your profile
              </Text>
            </View>
            <AntDesign name="arrowright" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
              placeholderTextColor={Colors.secondaryText}
            />
          </View>

          {/* Language Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Preferred Language *</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowLanguageModal(true)}
            >
              <Text style={[styles.dropdownText, !formData.selectedLanguage && styles.placeholder]}>
                {formData.selectedLanguage 
                  ? `${formData.selectedLanguage.native} (${formData.selectedLanguage.name})`
                  : 'Select your preferred language'
                }
              </Text>
              <AntDesign name="down" size={16} color={Colors.secondaryText} />
            </TouchableOpacity>
          </View>

          {/* Profile Photo (Optional) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Profile Photo (Optional)</Text>
            <TouchableOpacity style={styles.photoUpload}>
              <MaterialIcons name="add-a-photo" size={32} color={Colors.secondaryText} />
              <Text style={styles.photoText}>Add a photo of yourself or your shop logo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Premium Footer */}
        <View style={styles.footer}>
          <LinearGradient
            colors={isFormValid ? [Colors.accent, Colors.gradient2] : [Colors.border, Colors.border]}
            style={styles.nextButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <TouchableOpacity
              style={styles.nextButtonInner}
              disabled={!isFormValid}
              onPress={handleNext}
            >
              <Text style={[
                styles.nextButtonText, 
                !isFormValid && styles.disabledButtonText
              ]}>
                Next: Artisan Profile
              </Text>
              {isFormValid && (
                <AntDesign name="arrowright" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
              )}
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>

      {/* Language Selection Modal */}
      <Modal
        visible={showLanguageModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Language</Text>
              <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
                <AntDesign name="close" size={24} color={Colors.primaryText} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={styles.languageOption}
                  onPress={() => handleLanguageSelect(language)}
                >
                  <Text style={styles.languageName}>{language.native}</Text>
                  <Text style={styles.languageEnglish}>{language.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
              <Text style={styles.modalTitle}>Voice Assistant</Text>
              <TouchableOpacity onPress={() => setShowVoiceModal(false)}>
                <AntDesign name="close" size={24} color={Colors.primaryText} />
              </TouchableOpacity>
            </View>
            <View style={styles.voiceModalBody}>
              <View style={styles.aiAvatar}>
                <AntDesign name="sound" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.aiGreeting}>
                Hi! I'm your AI assistant. I'll help you set up your profile through a simple conversation.
              </Text>
              <TouchableOpacity
                style={styles.startVoiceButton}
                onPress={handleVoiceConversation}
              >
                <Text style={styles.startVoiceText}>Start Voice Setup</Text>
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
    backgroundColor: 'rgba(142, 77, 77, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  progressText: {
    fontSize: 14,
    color: Colors.accent,
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
    gap: 24,
  },
  inputGroup: {
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primaryText,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  textInput: {
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    color: Colors.primaryText,
    borderWidth: 2,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdown: {
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownText: {
    fontSize: 16,
    color: Colors.primaryText,
    fontWeight: '500',
  },
  placeholder: {
    color: Colors.secondaryText,
  },
  photoUpload: {
    backgroundColor: Colors.inputBackground,
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    gap: 12,
  },
  photoText: {
    fontSize: 16,
    color: Colors.secondaryText,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    marginTop: 40,
    marginBottom: 40,
  },
  nextButton: {
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonInner: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  disabledButtonText: {
    color: Colors.secondaryText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primaryText,
  },
  modalList: {
    padding: 24,
  },
  languageOption: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 4,
  },
  languageEnglish: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  voiceModalContent: {
    backgroundColor: Colors.cardBackground,
    marginHorizontal: 24,
    borderRadius: 20,
    marginVertical: 100,
  },
  voiceModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  voiceModalBody: {
    padding: 24,
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
    borderRadius: 12,
  },
  startVoiceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
