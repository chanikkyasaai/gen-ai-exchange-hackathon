import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={['#0ea5e9', '#3b82f6', '#6366f1']}
      style={{ flex: 1 }}
    >
      <View className="flex-1 justify-center items-center px-8">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="items-center"
        >
          {/* Logo/Icon */}
          <View className="w-24 h-24 bg-white/20 rounded-3xl items-center justify-center mb-8">
            <Feather name="palette" size={48} color="white" />
          </View>

          {/* App Name */}
          <Text className="text-6xl font-bold text-white mb-4 font-display">
            Kala
          </Text>

          {/* Subtitle */}
          <Text className="text-xl text-white/90 text-center mb-12 font-inter">
            AI-Powered Marketplace{'\n'}Assistant for Local Artisans
          </Text>

          {/* Features */}
          <View className="space-y-4 mb-16">
            <FeatureItem 
              icon="trending-up" 
              text="Boost your marketplace reach" 
            />
            <FeatureItem 
              icon="zap" 
              text="AI-powered content creation" 
            />
            <FeatureItem 
              icon="users" 
              text="Connect with artisan community" 
            />
          </View>

          {/* Get Started Button */}
          <TouchableOpacity
            onPress={() => router.push('/(onboarding)/language')}
            className="w-full"
          >
            <View className="bg-white rounded-2xl py-4 px-8 items-center shadow-lg">
              <Text className="text-lg font-semibold text-blue-600 font-inter">
                Get Started
              </Text>
            </View>
          </TouchableOpacity>

          {/* Skip Option */}
          <TouchableOpacity
            onPress={() => router.push('/(tabs)')}
            className="mt-6"
          >
            <Text className="text-white/70 font-medium font-inter">
              Continue as Guest
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const FeatureItem = ({ icon, text }: { icon: string; text: string }) => (
  <View className="flex-row items-center space-x-3">
    <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center">
      <Feather name={icon as any} size={16} color="white" />
    </View>
    <Text className="text-white/90 font-medium font-inter">{text}</Text>
  </View>
);
