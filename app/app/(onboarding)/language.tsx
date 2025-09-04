import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
];

export default function LanguageSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleContinue = () => {
    // Store selected language in AsyncStorage if needed
    router.push('/(onboarding)/carousel');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#f8fafc', '#e2e8f0']}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm mb-6"
          >
            <Feather name="arrow-left" size={20} color="#64748b" />
          </TouchableOpacity>

          <Text className="text-3xl font-bold text-gray-900 mb-2 font-display">
            Choose Your Language
          </Text>
          <Text className="text-gray-600 font-inter">
            Select your preferred language for the app
          </Text>
        </View>

        {/* Language List */}
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="space-y-3">
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                onPress={() => setSelectedLanguage(language.code)}
                className={`p-4 rounded-2xl border-2 ${
                  selectedLanguage === language.code
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text className={`text-lg font-semibold ${
                      selectedLanguage === language.code
                        ? 'text-blue-700'
                        : 'text-gray-900'
                    } font-inter`}>
                      {language.name}
                    </Text>
                    <Text className={`text-sm ${
                      selectedLanguage === language.code
                        ? 'text-blue-600'
                        : 'text-gray-500'
                    } font-inter`}>
                      {language.native}
                    </Text>
                  </View>
                  {selectedLanguage === language.code && (
                    <View className="w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                      <Feather name="check" size={14} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View className="px-6 pb-8 pt-4">
          <TouchableOpacity
            onPress={handleContinue}
            className="w-full"
          >
            <LinearGradient
              colors={['#0ea5e9', '#3b82f6']}
              className="rounded-2xl py-4 items-center"
            >
              <Text className="text-white text-lg font-semibold font-inter">
                Continue
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
