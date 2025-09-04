import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Color Palette based on the image provided
const Colors = {
  background: '#FDFCFB',
  primaryText: '#4A4A4A',
  secondaryText: '#8A8A8A',
  accent: '#8E4D4D',
  googleButton: '#FFFFFF',
  shadow: '#000000',
  kalaText: '#6d4750',
};

export default function AuthScreen() {
  const router = useRouter();

  const handleGoogleSignUp = () => {
    // Navigate to onboarding for new users
    router.push('/(onboarding)');
  };

  const handleGoogleSignIn = () => {
    // Navigate directly to main app for existing users
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient
      colors={[Colors.background, '#F5F2F0']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>Your AI Craft Assistant</Text>
        <Text style={styles.welcomeText}>
          Turn your craft into a thriving business with AI-powered tools.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.googleButton, styles.signUpButton]}
            onPress={handleGoogleSignUp}
          >
            <AntDesign name="google" size={24} color="#FFFFFF" />
            <Text style={styles.signUpButtonText}>Sign Up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
          >
            <AntDesign name="google" size={24} color={Colors.primaryText} />
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    aspectRatio: 7,
    marginBottom: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.kalaText,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.secondaryText,
    letterSpacing: 1,
    marginBottom: 20,
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.primaryText,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.googleButton,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  signUpButton: {
    backgroundColor: Colors.accent,
  },
  googleButtonText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primaryText,
  },
  signUpButtonText: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  termsText: {
    marginTop: 30,
    fontSize: 12,
    color: Colors.secondaryText,
    textAlign: 'center',
  },
  linkText: {
    color: Colors.accent,
    textDecorationLine: 'underline',
  },
});
