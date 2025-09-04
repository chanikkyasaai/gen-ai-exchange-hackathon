import React, { useState, useRef } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Preloader from '../components/Preloader';
import '../global.css';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const hasNavigated = useRef(false);

  const handlePreloaderFinish = () => {
    if (!hasNavigated.current) {
      hasNavigated.current = true;
      setIsLoading(false);
      // Use setTimeout to ensure smooth transition
      setTimeout(() => {
        router.replace('/auth');
      }, 100);
    }
  };

  if (isLoading) {
    return <Preloader onFinish={handlePreloaderFinish} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
