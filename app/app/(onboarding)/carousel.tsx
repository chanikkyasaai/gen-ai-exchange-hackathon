import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    icon: 'camera',
    title: 'Showcase Your Craft',
    description: 'Capture stunning photos of your handmade products with AI-powered suggestions for the perfect shot.',
    gradient: ['#0ea5e9', '#3b82f6'] as const,
  },
  {
    id: 2,
    icon: 'trending-up',
    title: 'Smart Marketing',
    description: 'Let AI create compelling descriptions and hashtags that reach the right customers across platforms.',
    gradient: ['#d946ef', '#a855f7'] as const,
  },
  {
    id: 3,
    icon: 'users',
    title: 'Join the Community',
    description: 'Connect with fellow artisans, share experiences, and learn from successful marketplace strategies.',
    gradient: ['#059669', '#10b981'] as const,
  },
  {
    id: 4,
    icon: 'bar-chart',
    title: 'Track Your Success',
    description: 'Monitor your sales, engagement, and growth with detailed insights and actionable recommendations.',
    gradient: ['#ea580c', '#f97316'] as const,
  },
];

export default function OnboardingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      router.push('/(onboarding)/auth');
    }
  };

  const handleSkip = () => {
    router.push('/(onboarding)/auth');
  };

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setCurrentIndex(roundIndex);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Skip Button */}
      <View className="flex-row justify-end px-6 pt-4">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-gray-500 font-medium font-inter">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        className="flex-1"
      >
        {onboardingData.map((item, index) => (
          <View key={item.id} style={{ width }} className="flex-1 px-8 justify-center">
            <LinearGradient
              colors={item.gradient}
              className="w-32 h-32 rounded-3xl items-center justify-center mx-auto mb-12"
            >
              <Feather name={item.icon as any} size={64} color="white" />
            </LinearGradient>

            <Text className="text-3xl font-bold text-gray-900 text-center mb-6 font-display">
              {item.title}
            </Text>

            <Text className="text-lg text-gray-600 text-center leading-relaxed font-inter px-4">
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="flex-row justify-center mb-8">
        {onboardingData.map((_, index) => (
          <View
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="px-6 pb-8">
        <TouchableOpacity onPress={handleNext} className="w-full">
          <LinearGradient
            colors={['#0ea5e9', '#3b82f6']}
            className="rounded-2xl py-4 items-center"
          >
            <Text className="text-white text-lg font-semibold font-inter">
              {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
