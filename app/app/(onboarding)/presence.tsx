import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
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

const platforms = [
  { 
    id: 'instagram', 
    name: 'Instagram', 
    icon: 'instagram',
    iconLibrary: 'AntDesign',
    color: '#E4405F',
    description: 'Share beautiful photos of your crafts',
    popular: true
  },
  { 
    id: 'whatsapp', 
    name: 'WhatsApp Business', 
    icon: 'whatsapp',
    iconLibrary: 'FontAwesome5',
    color: '#25D366',
    description: 'Direct customer communication',
    popular: true
  },
  { 
    id: 'facebook', 
    name: 'Facebook', 
    icon: 'facebook-square',
    iconLibrary: 'AntDesign',
    color: '#1877F2',
    description: 'Reach broader audience'
  },
  { 
    id: 'amazon', 
    name: 'Amazon', 
    icon: 'amazon',
    iconLibrary: 'AntDesign',
    color: '#FF9900',
    description: 'Sell on India\'s largest marketplace'
  },
  { 
    id: 'flipkart', 
    name: 'Flipkart', 
    icon: 'shoppingcart',
    iconLibrary: 'AntDesign',
    color: '#047BD0',
    description: 'Reach millions of Indian customers'
  },
  { 
    id: 'etsy', 
    name: 'Etsy', 
    icon: 'store',
    iconLibrary: 'MaterialIcons',
    color: '#F16521',
    description: 'Global marketplace for handmade items'
  },
  { 
    id: 'youtube', 
    name: 'YouTube Shorts', 
    icon: 'youtube',
    iconLibrary: 'AntDesign',
    color: '#FF0000',
    description: 'Showcase your craft process'
  },
  { 
    id: 'pinterest', 
    name: 'Pinterest', 
    icon: 'picture',
    iconLibrary: 'AntDesign',
    color: '#BD081C',
    description: 'Inspire customers with your designs'
  },
];

export default function DigitalPresence() {
  const router = useRouter();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const handleVoiceAssistant = () => {
    setShowVoiceModal(true);
  };

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleConnectPlatform = (platformId: string) => {
    const platform = platforms.find(p => p.id === platformId);
    Alert.alert(
      `Connect ${platform?.name}`,
      `OAuth integration for ${platform?.name} will be implemented. This will allow કળ to post content automatically.`,
      [
        { text: 'Connect Now', onPress: () => {
          setConnectedPlatforms(prev => [...prev, platformId]);
          Alert.alert('Connected!', `${platform?.name} connected successfully.`);
        }},
        { text: 'Later', style: 'cancel' }
      ]
    );
  };

  const handleNext = () => {
    if (selectedPlatforms.length === 0) {
      Alert.alert('No Platforms Selected', 'Please select at least one platform where you want to showcase your work.');
      return;
    }
    router.push('/(onboarding)/goals');
  };

  const isFormValid = selectedPlatforms.length > 0;

  const renderIcon = (platform: any, size: number = 24, color?: string) => {
    const iconColor = color || platform.color;
    
    switch (platform.iconLibrary) {
      case 'FontAwesome5':
        return <FontAwesome5 name={platform.icon} size={size} color={iconColor} />;
      case 'MaterialIcons':
        return <MaterialIcons name={platform.icon} size={size} color={iconColor} />;
      default:
        return <AntDesign name={platform.icon} size={size} color={iconColor} />;
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
            <Text style={styles.title}>Digital Presence</Text>
            <Text style={styles.subtitle}>Where do you want to showcase your work?</Text>
            <View style={styles.progressIndicator}>
              <Text style={styles.progressText}>Step 4 of 5</Text>
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
              <MaterialIcons name="share" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.voiceContent}>
              <Text style={styles.voiceTitle}>Platform Expert</Text>
              <Text style={styles.voiceSubtitle}>
                Get personalized platform recommendations
              </Text>
            </View>
            <AntDesign name="arrowright" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.form}>
          {/* Platform Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose Your Platforms *</Text>
            <Text style={styles.sectionDescription}>
              Select where you already sell or want to start showcasing your work
            </Text>
            
            {/* Popular Platforms */}
            <Text style={styles.categoryTitle}>🔥 Most Popular for Artisans</Text>
            <View style={styles.platformGrid}>
              {platforms.filter(p => p.popular).map((platform) => (
                <TouchableOpacity
                  key={platform.id}
                  style={[
                    styles.platformCard,
                    selectedPlatforms.includes(platform.id) && styles.selectedPlatformCard
                  ]}
                  onPress={() => handlePlatformSelect(platform.id)}
                >
                  <View style={styles.platformHeader}>
                    <View style={[styles.platformIconContainer, { backgroundColor: platform.color }]}>
                      {renderIcon(platform, 24, '#FFFFFF')}
                    </View>
                    {selectedPlatforms.includes(platform.id) && (
                      <View style={styles.selectedBadge}>
                        <AntDesign name="check" size={14} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  <Text style={[
                    styles.platformName,
                    selectedPlatforms.includes(platform.id) && styles.selectedPlatformText
                  ]}>
                    {platform.name}
                  </Text>
                  <Text style={[
                    styles.platformDescription,
                    selectedPlatforms.includes(platform.id) && styles.selectedPlatformText
                  ]}>
                    {platform.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Other Platforms */}
            <Text style={styles.categoryTitle}>🌐 Other Platforms</Text>
            <View style={styles.platformGrid}>
              {platforms.filter(p => !p.popular).map((platform) => (
                <TouchableOpacity
                  key={platform.id}
                  style={[
                    styles.platformCard,
                    selectedPlatforms.includes(platform.id) && styles.selectedPlatformCard
                  ]}
                  onPress={() => handlePlatformSelect(platform.id)}
                >
                  <View style={styles.platformHeader}>
                    <View style={[styles.platformIconContainer, { backgroundColor: platform.color }]}>
                      {renderIcon(platform, 24, '#FFFFFF')}
                    </View>
                    {selectedPlatforms.includes(platform.id) && (
                      <View style={styles.selectedBadge}>
                        <AntDesign name="check" size={14} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                  <Text style={[
                    styles.platformName,
                    selectedPlatforms.includes(platform.id) && styles.selectedPlatformText
                  ]}>
                    {platform.name}
                  </Text>
                  <Text style={[
                    styles.platformDescription,
                    selectedPlatforms.includes(platform.id) && styles.selectedPlatformText
                  ]}>
                    {platform.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Connection Options */}
          {selectedPlatforms.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Connect Your Accounts</Text>
              <Text style={styles.sectionDescription}>
                Connect now for automatic posting, or set up later
              </Text>
              <View style={styles.connectionList}>
                {selectedPlatforms.map((platformId) => {
                  const platform = platforms.find(p => p.id === platformId);
                  const isConnected = connectedPlatforms.includes(platformId);
                  
                  return (
                    <View key={platformId} style={styles.connectionItem}>
                      <View style={styles.connectionLeft}>
                        <View style={[styles.connectionIcon, { backgroundColor: platform?.color }]}>
                          {renderIcon(platform!, 20, '#FFFFFF')}
                        </View>
                        <Text style={styles.connectionName}>{platform?.name}</Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.connectionButton,
                          isConnected && styles.connectedButton
                        ]}
                        onPress={() => !isConnected && handleConnectPlatform(platformId)}
                      >
                        <Text style={[
                          styles.connectionButtonText,
                          isConnected && styles.connectedButtonText
                        ]}>
                          {isConnected ? 'Connected' : 'Connect'}
                        </Text>
                        {isConnected && (
                          <AntDesign name="check" size={16} color={Colors.success} style={{ marginLeft: 4 }} />
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
              
              <View style={styles.infoCard}>
                <MaterialIcons name="info" size={20} color={Colors.accent} />
                <Text style={styles.infoText}>
                  কळ will help you create and schedule content automatically across all connected platforms.
                </Text>
              </View>
            </View>
          )}
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
                Next: Goals & Vision
              </Text>
              {isFormValid && (
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
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 16,
    marginTop: 8,
  },
  platformGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  platformCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    width: (width - 72) / 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: Colors.border,
    minHeight: 120,
  },
  selectedPlatformCard: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accent,
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  platformIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  platformName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 4,
  },
  platformDescription: {
    fontSize: 12,
    color: Colors.secondaryText,
    lineHeight: 16,
  },
  selectedPlatformText: {
    color: '#FFFFFF',
  },
  connectionList: {
    gap: 12,
    marginBottom: 20,
  },
  connectionItem: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  connectionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  connectionIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  connectionName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primaryText,
  },
  connectionButton: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectedButton: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderWidth: 1,
    borderColor: Colors.success,
  },
  connectionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  connectedButtonText: {
    color: Colors.success,
  },
  infoCard: {
    backgroundColor: 'rgba(142, 77, 77, 0.05)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderLeftWidth: 4,
    borderLeftColor: Colors.accent,
  },
  infoText: {
    fontSize: 14,
    color: Colors.primaryText,
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
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
});
