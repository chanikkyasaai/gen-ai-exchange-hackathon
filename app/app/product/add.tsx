import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AddProductScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const categories = [
    'Textiles', 'Pottery', 'Jewelry', 'Woodwork', 'Metalwork', 'Art', 'Other'
  ];

  const aiSuggestions = {
    title: 'Handwoven Cotton Scarf',
    description: 'Beautiful handwoven cotton scarf with traditional patterns, perfect for any season. Made with 100% organic cotton using sustainable practices.',
    tags: '#handwoven #cotton #scarf #sustainable #traditional #organic',
    price: '$45'
  };

  const handleImagePicker = () => {
    // In a real app, this would open image picker
    const demoImages = [
      'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop',
    ];
    setSelectedImages(demoImages);
  };

  const handleAISuggestion = (field: string, value: string) => {
    switch (field) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'tags':
        setTags(value);
        break;
      case 'price':
        setPrice(value);
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Feather name="help-circle" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* AI Assistant Banner */}
        <TouchableOpacity style={styles.aiBanner}>
          <LinearGradient
            colors={['#7c3aed', '#a855f7']}
            style={styles.aiGradient}
          >
            <Feather name="zap" size={20} color="white" />
            <Text style={styles.aiText}>AI Assistant is ready to help</Text>
            <Feather name="chevron-right" size={16} color="white" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Image Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Images</Text>
          <Text style={styles.sectionSubtitle}>Add up to 5 high-quality images</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
            <TouchableOpacity style={styles.addImageButton} onPress={handleImagePicker}>
              <Feather name="camera" size={32} color="#64748b" />
              <Text style={styles.addImageText}>Add Photos</Text>
            </TouchableOpacity>
            
            {selectedImages.map((image, index) => (
              <View key={index} style={styles.imageItem}>
                <Image source={{ uri: image }} style={styles.productImage} />
                <TouchableOpacity style={styles.removeImageButton}>
                  <Feather name="x" size={16} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {selectedImages.length > 0 && (
            <View style={styles.aiTip}>
              <Feather name="zap" size={16} color="#f59e0b" />
              <Text style={styles.aiTipText}>
                Great lighting! These photos will get 40% more views.
              </Text>
            </View>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.section}>
          <View style={styles.fieldHeader}>
            <Text style={styles.sectionTitle}>Product Title</Text>
            <TouchableOpacity
              style={styles.aiSuggestButton}
              onPress={() => handleAISuggestion('title', aiSuggestions.title)}
            >
              <Feather name="zap" size={14} color="#7c3aed" />
              <Text style={styles.aiSuggestText}>AI Suggest</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter product title..."
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.fieldHeader}>
            <Text style={styles.sectionTitle}>Description</Text>
            <TouchableOpacity
              style={styles.aiSuggestButton}
              onPress={() => handleAISuggestion('description', aiSuggestions.description)}
            >
              <Feather name="zap" size={14} color="#7c3aed" />
              <Text style={styles.aiSuggestText}>AI Suggest</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your product..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Price and Category */}
        <View style={styles.row}>
          <View style={[styles.section, { flex: 1, marginRight: 8 }]}>
            <View style={styles.fieldHeader}>
              <Text style={styles.sectionTitle}>Price</Text>
              <TouchableOpacity
                style={styles.aiSuggestButton}
                onPress={() => handleAISuggestion('price', aiSuggestions.price)}
              >
                <Feather name="zap" size={14} color="#7c3aed" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.input}
              placeholder="$0.00"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={[styles.section, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TouchableOpacity style={styles.categorySelector}>
              <Text style={styles.categorySelectorText}>
                {category || 'Select category'}
              </Text>
              <Feather name="chevron-down" size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tags */}
        <View style={styles.section}>
          <View style={styles.fieldHeader}>
            <Text style={styles.sectionTitle}>Tags & Keywords</Text>
            <TouchableOpacity
              style={styles.aiSuggestButton}
              onPress={() => handleAISuggestion('tags', aiSuggestions.tags)}
            >
              <Feather name="zap" size={14} color="#7c3aed" />
              <Text style={styles.aiSuggestText}>AI Generate</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="#handmade #unique #artisan"
            value={tags}
            onChangeText={setTags}
            placeholderTextColor="#9ca3af"
          />
          <Text style={styles.helpText}>
            Add relevant tags to help customers find your product
          </Text>
        </View>

        {/* AI Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Recommendations</Text>
          <View style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Feather name="trending-up" size={20} color="#059669" />
              <Text style={styles.recommendationTitle}>Trending Keywords</Text>
            </View>
            <Text style={styles.recommendationDescription}>
              Add "eco-friendly" and "sustainable" to increase visibility by 25%
            </Text>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationHeader}>
              <Feather name="dollar-sign" size={20} color="#0ea5e9" />
              <Text style={styles.recommendationTitle}>Pricing Suggestion</Text>
            </View>
            <Text style={styles.recommendationDescription}>
              Similar products sell for $40-50. Consider pricing at $45 for optimal sales.
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.draftButton}>
            <Text style={styles.draftButtonText}>Save as Draft</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.publishButton}>
            <LinearGradient
              colors={['#0ea5e9', '#3b82f6']}
              style={styles.publishGradient}
            >
              <Text style={styles.publishButtonText}>Publish Product</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  helpButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
  },
  aiBanner: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  aiGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  aiText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginHorizontal: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  aiSuggestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f3e8ff',
    borderRadius: 12,
  },
  aiSuggestText: {
    fontSize: 12,
    color: '#7c3aed',
    fontWeight: '500',
    marginLeft: 4,
  },
  imageContainer: {
    marginBottom: 16,
  },
  addImageButton: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  addImageText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
  },
  imageItem: {
    position: 'relative',
    marginRight: 16,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiTip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 12,
  },
  aiTipText: {
    fontSize: 14,
    color: '#92400e',
    marginLeft: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  row: {
    flexDirection: 'row',
  },
  categorySelector: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categorySelectorText: {
    fontSize: 16,
    color: '#374151',
  },
  helpText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 8,
  },
  recommendationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#0ea5e9',
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  recommendationDescription: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: '#0ea5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  applyButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  actionContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    marginTop: 16,
  },
  draftButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 12,
  },
  draftButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  publishButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 12,
  },
  publishGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});
