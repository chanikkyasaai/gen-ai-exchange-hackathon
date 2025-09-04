import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Alert,
  Image,
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

const productTypes = [
  { id: 'sarees', name: 'Sarees', icon: 'checkroom', category: 'Textiles' },
  { id: 'pottery', name: 'Clay Pots', icon: 'circle', category: 'Pottery' },
  { id: 'paintings', name: 'Paintings', icon: 'brush', category: 'Art' },
  { id: 'jewelry', name: 'Jewelry', icon: 'star', category: 'Accessories' },
  { id: 'woodcraft', name: 'Wood Items', icon: 'nature', category: 'Woodwork' },
  { id: 'textiles', name: 'Fabrics', icon: 'content-cut', category: 'Textiles' },
  { id: 'bags', name: 'Bags & Purses', icon: 'work', category: 'Leather' },
  { id: 'home-decor', name: 'Home Decor', icon: 'home', category: 'Decoration' },
  { id: 'sculptures', name: 'Sculptures', icon: 'account-balance', category: 'Art' },
  { id: 'accessories', name: 'Accessories', icon: 'style', category: 'Fashion' },
];

const priceRanges = [
  { id: 'budget', label: 'Budget Friendly', range: 'Below ₹500', icon: 'attach-money', color: '#10B981' },
  { id: 'mid', label: 'Mid Range', range: '₹500 - ₹2,000', icon: 'account-balance-wallet', color: '#3B82F6' },
  { id: 'premium', label: 'Premium', range: '₹2,000 - ₹10,000', icon: 'diamond', color: '#8B5CF6' },
  { id: 'luxury', label: 'Luxury', range: 'Above ₹10,000', icon: 'star', color: '#F59E0B' },
];

export default function BusinessEssentials() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    productTypes: [] as string[],
    priceRange: '',
    samplePhotos: [] as any[],
  });
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  const handleVoiceAssistant = () => {
    setShowVoiceModal(true);
  };

  const handleProductSelect = (productId: string) => {
    const updatedProducts = formData.productTypes.includes(productId)
      ? formData.productTypes.filter(id => id !== productId)
      : [...formData.productTypes, productId];
    
    setFormData(prev => ({ ...prev, productTypes: updatedProducts }));
  };

  const handlePriceRangeSelect = (rangeId: string) => {
    setFormData(prev => ({ ...prev, priceRange: rangeId }));
  };

  const handleAddPhotos = () => {
    Alert.alert(
      'Add Sample Photos',
      'Photo upload functionality will be implemented with camera and gallery access.',
      [{ text: 'OK' }]
    );
  };

  const handleNext = () => {
    if (formData.productTypes.length === 0 || !formData.priceRange) {
      Alert.alert('Incomplete', 'Please select at least one product type and a price range.');
      return;
    }
    router.push('/(onboarding)/presence');
  };

  const isFormValid = formData.productTypes.length > 0 && formData.priceRange;

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
            <Text style={styles.title}>Business Essentials</Text>
            <Text style={styles.subtitle}>What do you create and sell?</Text>
            <View style={styles.progressIndicator}>
              <Text style={styles.progressText}>Step 3 of 5</Text>
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
              <MaterialIcons name="store" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.voiceContent}>
              <Text style={styles.voiceTitle}>Business Assistant</Text>
              <Text style={styles.voiceSubtitle}>
                Tell me about your products and pricing
              </Text>
            </View>
            <AntDesign name="arrowright" size={20} color="#FFFFFF" />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.form}>
          {/* Product Types */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Main Product Types *</Text>
            <Text style={styles.sectionDescription}>
              Select all products you create or plan to sell
            </Text>
            <View style={styles.productGrid}>
              {productTypes.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={[
                    styles.productCard,
                    formData.productTypes.includes(product.id) && styles.selectedProductCard
                  ]}
                  onPress={() => handleProductSelect(product.id)}
                >
                  <View style={[
                    styles.productIconContainer,
                    formData.productTypes.includes(product.id) && styles.selectedProductIcon
                  ]}>
                    <MaterialIcons 
                      name={product.icon as any} 
                      size={24} 
                      color={formData.productTypes.includes(product.id) ? '#FFFFFF' : Colors.accent} 
                    />
                  </View>
                  <Text style={[
                    styles.productName,
                    formData.productTypes.includes(product.id) && styles.selectedProductText
                  ]}>
                    {product.name}
                  </Text>
                  <Text style={[
                    styles.productCategory,
                    formData.productTypes.includes(product.id) && styles.selectedProductText
                  ]}>
                    {product.category}
                  </Text>
                  {formData.productTypes.includes(product.id) && (
                    <View style={styles.selectedBadge}>
                      <AntDesign name="check" size={16} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Average Price Range *</Text>
            <Text style={styles.sectionDescription}>
              What's your typical product pricing?
            </Text>
            <View style={styles.priceContainer}>
              {priceRanges.map((range) => (
                <TouchableOpacity
                  key={range.id}
                  style={[
                    styles.priceCard,
                    formData.priceRange === range.id && styles.selectedPriceCard
                  ]}
                  onPress={() => handlePriceRangeSelect(range.id)}
                >
                  <View style={[styles.priceIconContainer, { backgroundColor: range.color }]}>
                    <MaterialIcons name={range.icon as any} size={24} color="#FFFFFF" />
                  </View>
                  <View style={styles.priceContent}>
                    <Text style={[
                      styles.priceLabel,
                      formData.priceRange === range.id && styles.selectedPriceText
                    ]}>
                      {range.label}
                    </Text>
                    <Text style={[
                      styles.priceRange,
                      formData.priceRange === range.id && styles.selectedPriceText
                    ]}>
                      {range.range}
                    </Text>
                  </View>
                  {formData.priceRange === range.id && (
                    <View style={styles.selectedIndicator}>
                      <AntDesign name="checkcircle" size={20} color={Colors.success} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sample Photos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sample Product Photos</Text>
            <Text style={styles.sectionDescription}>
              Upload photos of your best work (optional for setup)
            </Text>
            <TouchableOpacity style={styles.photoUploadCard} onPress={handleAddPhotos}>
              <LinearGradient
                colors={['rgba(142, 77, 77, 0.1)', 'rgba(160, 97, 106, 0.1)']}
                style={styles.photoUploadGradient}
              >
                <View style={styles.photoUploadIcon}>
                  <MaterialIcons name="add-a-photo" size={32} color={Colors.accent} />
                </View>
                <Text style={styles.photoUploadTitle}>Add Product Photos</Text>
                <Text style={styles.photoUploadSubtitle}>
                  Showcase your best work to attract customers
                </Text>
                <View style={styles.photoUploadButton}>
                  <Text style={styles.photoUploadButtonText}>Choose Photos</Text>
                  <AntDesign name="arrowright" size={16} color={Colors.accent} />
                </View>
              </LinearGradient>
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
                Next: Digital Presence
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
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  productCard: {
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
    position: 'relative',
  },
  selectedProductCard: {
    borderColor: Colors.accent,
    backgroundColor: Colors.accent,
  },
  productIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(142, 77, 77, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectedProductIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    color: Colors.secondaryText,
  },
  selectedProductText: {
    color: '#FFFFFF',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceContainer: {
    gap: 12,
  },
  priceCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedPriceCard: {
    borderColor: Colors.accent,
    backgroundColor: 'rgba(142, 77, 77, 0.05)',
  },
  priceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  priceContent: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 4,
  },
  priceRange: {
    fontSize: 14,
    color: Colors.secondaryText,
  },
  selectedPriceText: {
    color: Colors.accent,
  },
  selectedIndicator: {
    marginLeft: 12,
  },
  photoUploadCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  photoUploadGradient: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    borderRadius: 16,
  },
  photoUploadIcon: {
    marginBottom: 16,
  },
  photoUploadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryText,
    marginBottom: 8,
  },
  photoUploadSubtitle: {
    fontSize: 14,
    color: Colors.secondaryText,
    textAlign: 'center',
    marginBottom: 20,
  },
  photoUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBackground,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  photoUploadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.accent,
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
