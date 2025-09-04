import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProductsScreen() {
  const [activeTab, setActiveTab] = useState('all');

  const products = [
    {
      id: 1,
      title: 'Handwoven Scarf',
      price: '$45',
      status: 'published',
      views: 124,
      likes: 23,
      image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Ceramic Bowl Set',
      price: '$89',
      status: 'draft',
      views: 0,
      likes: 0,
      image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Leather Wallet',
      price: '$67',
      status: 'published',
      views: 89,
      likes: 15,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop',
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Products' },
    { id: 'published', label: 'Published' },
    { id: 'draft', label: 'Drafts' },
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.status === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Products</Text>
        <TouchableOpacity style={styles.addButton}>
          <Feather name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Total Products</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Published</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Drafts</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>256</Text>
          <Text style={styles.statLabel}>Total Views</Text>
        </View>
      </ScrollView>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Products List */}
      <ScrollView style={styles.productsList} showsVerticalScrollIndicator={false}>
        {filteredProducts.map((product) => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <View style={[styles.statusBadge, 
                  product.status === 'published' ? styles.publishedBadge : styles.draftBadge
                ]}>
                  <Text style={[styles.statusText,
                    product.status === 'published' ? styles.publishedText : styles.draftText
                  ]}>
                    {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.productPrice}>{product.price}</Text>
              
              <View style={styles.productStats}>
                <View style={styles.statItem}>
                  <Feather name="eye" size={14} color="#64748b" />
                  <Text style={styles.statText}>{product.views}</Text>
                </View>
                <View style={styles.statItem}>
                  <Feather name="heart" size={14} color="#64748b" />
                  <Text style={styles.statText}>{product.likes}</Text>
                </View>
              </View>
            </View>

            <View style={styles.productActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="edit-2" size={18} color="#64748b" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="share" size={18} color="#64748b" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Feather name="more-vertical" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add Product CTA */}
        <TouchableOpacity style={styles.addProductCTA}>
          <LinearGradient
            colors={['#0ea5e9', '#3b82f6']}
            style={styles.ctaGradient}
          >
            <Feather name="plus" size={24} color="white" />
            <Text style={styles.ctaText}>Add New Product</Text>
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
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0ea5e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    marginHorizontal: 8,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  activeTab: {
    backgroundColor: '#0ea5e9',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTabText: {
    color: 'white',
  },
  productsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  productCard: {
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
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  publishedBadge: {
    backgroundColor: '#dcfce7',
  },
  draftBadge: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
  },
  publishedText: {
    color: '#059669',
  },
  draftText: {
    color: '#d97706',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0ea5e9',
    marginBottom: 8,
  },
  productStats: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  addProductCTA: {
    marginTop: 16,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  ctaGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 12,
  },
});
