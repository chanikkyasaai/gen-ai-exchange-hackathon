import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

export default function InsightsScreen() {
  const [activeTimeframe, setActiveTimeframe] = useState('week');

  const timeframes = [
    { id: 'week', label: '7 Days' },
    { id: 'month', label: '30 Days' },
    { id: 'quarter', label: '3 Months' },
  ];

  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50],
        color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const engagementData = {
    labels: ['Views', 'Likes', 'Shares', 'Comments'],
    datasets: [
      {
        data: [120, 45, 23, 15],
      },
    ],
  };

  const topProductsData = [
    { name: 'Handwoven Scarf', population: 35, color: '#0ea5e9', legendFontColor: '#374151' },
    { name: 'Ceramic Bowl', population: 25, color: '#d946ef', legendFontColor: '#374151' },
    { name: 'Leather Wallet', population: 20, color: '#059669', legendFontColor: '#374151' },
    { name: 'Others', population: 20, color: '#ea580c', legendFontColor: '#374151' },
  ];

  const metrics = [
    { title: 'Total Revenue', value: '$2,345', change: '+12%', icon: 'dollar-sign', color: '#059669' },
    { title: 'Product Views', value: '1,234', change: '+8%', icon: 'eye', color: '#0ea5e9' },
    { title: 'Engagement Rate', value: '5.2%', change: '+15%', icon: 'heart', color: '#d946ef' },
    { title: 'Conversion Rate', value: '2.8%', change: '-3%', icon: 'trending-up', color: '#ea580c' },
  ];

  const recommendations = [
    {
      title: 'Optimize Product Photos',
      description: 'Products with better lighting get 40% more views',
      action: 'Learn More',
      icon: 'camera',
      color: '#0ea5e9',
    },
    {
      title: 'Post During Peak Hours',
      description: 'Best engagement between 2-4 PM on weekdays',
      action: 'Schedule Now',
      icon: 'clock',
      color: '#d946ef',
    },
    {
      title: 'Trending Keywords',
      description: 'Add "eco-friendly" and "handmade" to descriptions',
      action: 'Update Products',
      icon: 'trending-up',
      color: '#059669',
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(14, 165, 233, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Insights</Text>
          <TouchableOpacity style={styles.exportButton}>
            <Feather name="download" size={20} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Timeframe Selector */}
        <View style={styles.timeframeContainer}>
          {timeframes.map((timeframe) => (
            <TouchableOpacity
              key={timeframe.id}
              style={[
                styles.timeframeButton,
                activeTimeframe === timeframe.id && styles.activeTimeframe,
              ]}
              onPress={() => setActiveTimeframe(timeframe.id)}
            >
              <Text
                style={[
                  styles.timeframeText,
                  activeTimeframe === timeframe.id && styles.activeTimeframeText,
                ]}
              >
                {timeframe.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                  <Feather name={metric.icon as any} size={20} color={metric.color} />
                </View>
                <Text style={[styles.metricChange, { color: metric.change.startsWith('+') ? '#059669' : '#dc2626' }]}>
                  {metric.change}
                </Text>
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </View>
          ))}
        </View>

        {/* Sales Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Sales Overview</Text>
          <View style={styles.chartContainer}>
            <LineChart
              data={salesData}
              width={width - 48}
              height={200}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>

        {/* Engagement Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Engagement Metrics</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={engagementData}
              width={width - 48}
              height={200}
              chartConfig={chartConfig}
              yAxisLabel=""
              yAxisSuffix=""
              style={styles.chart}
            />
          </View>
        </View>

        {/* Top Products */}
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Top Performing Products</Text>
          <View style={styles.chartContainer}>
            <PieChart
              data={topProductsData}
              width={width - 48}
              height={200}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          </View>
        </View>

        {/* AI Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Recommendations</Text>
          {recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationCard}>
              <View style={styles.recommendationContent}>
                <View style={[styles.recommendationIcon, { backgroundColor: rec.color + '20' }]}>
                  <Feather name={rec.icon as any} size={20} color={rec.color} />
                </View>
                <View style={styles.recommendationText}>
                  <Text style={styles.recommendationTitle}>{rec.title}</Text>
                  <Text style={styles.recommendationDescription}>{rec.description}</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.recommendationAction, { backgroundColor: rec.color }]}>
                <Text style={styles.recommendationActionText}>{rec.action}</Text>
              </TouchableOpacity>
            </View>
          ))}
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
  exportButton: {
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
  timeframeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  timeframeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#f1f5f9',
  },
  activeTimeframe: {
    backgroundColor: '#0ea5e9',
  },
  timeframeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  activeTimeframeText: {
    color: 'white',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  metricCard: {
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: '#64748b',
  },
  chartSection: {
    marginBottom: 32,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  chartContainer: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chart: {
    borderRadius: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  recommendationCard: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  recommendationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recommendationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  recommendationText: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  recommendationDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  recommendationAction: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  recommendationActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
});
