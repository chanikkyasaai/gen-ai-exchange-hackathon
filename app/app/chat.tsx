import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. I can help you with product descriptions, pricing, marketing tips, and more. What would you like to work on today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickActions = [
    { icon: 'edit-3', text: 'Improve Description', action: 'improve_description' },
    { icon: 'dollar-sign', text: 'Suggest Price', action: 'suggest_price' },
    { icon: 'trending-up', text: 'Marketing Tips', action: 'marketing_tips' },
    { icon: 'globe', text: 'Translate Text', action: 'translate' },
    { icon: 'image', text: 'Photo Tips', action: 'photo_tips' },
    { icon: 'hash', text: 'Generate Tags', action: 'generate_tags' },
  ];

  const sendMessage = (text: string, isQuickAction = false) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text, isQuickAction);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string, isQuickAction: boolean): string => {
    if (isQuickAction) {
      switch (userInput) {
        case 'improve_description':
          return "I'd be happy to help improve your product description! Please share your current description, and I'll make it more engaging and SEO-friendly. I can add compelling adjectives, highlight unique features, and include relevant keywords that customers search for.";
        case 'suggest_price':
          return "To suggest the best price, I'll need some details:\n• What type of product is it?\n• What materials are used?\n• How long does it take to make?\n• Are there similar products in the market?\n\nI'll analyze market trends and competitor pricing to give you an optimal price range.";
        case 'marketing_tips':
          return "Here are some proven marketing strategies for artisans:\n\n📸 High-quality photos increase sales by 40%\n⏰ Post between 2-4 PM on weekdays for best engagement\n#️⃣ Use 5-10 relevant hashtags per post\n📝 Tell your story - customers love authentic narratives\n🤝 Engage with your community regularly\n\nWould you like me to elaborate on any of these?";
        case 'translate':
          return "I can help translate your product descriptions into multiple languages! This can expand your reach to international customers. Which language would you like to translate to? I support Hindi, Bengali, Tamil, Telugu, and many more.";
        case 'photo_tips':
          return "Great product photos are crucial! Here are my top tips:\n\n💡 Natural lighting works best - shoot near a window\n📐 Use the rule of thirds for composition\n🎨 Keep backgrounds simple and clean\n📱 Take multiple angles - detail shots are important\n✨ Show your product in use when possible\n\nWant specific advice for your product type?";
        case 'generate_tags':
          return "I can generate effective hashtags for your products! Please tell me:\n• What's your product?\n• What materials/techniques did you use?\n• What style or theme does it represent?\n\nI'll create a mix of popular and niche hashtags to maximize your reach.";
        default:
          return "I'm here to help with that! Could you provide more details so I can give you the best assistance?";
      }
    }

    // General responses based on keywords
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('price') || lowerInput.includes('cost')) {
      return "For pricing advice, consider your material costs, time invested, and market positioning. Premium handmade items typically have 3-4x markup from material costs. Would you like me to analyze specific pricing for your product?";
    }
    if (lowerInput.includes('photo') || lowerInput.includes('image')) {
      return "Photos are so important for sales! Natural lighting, clean backgrounds, and multiple angles work best. Would you like specific photography tips for your product type?";
    }
    if (lowerInput.includes('description') || lowerInput.includes('write')) {
      return "I can help you write compelling product descriptions! Share what you'd like to describe, and I'll help you highlight its unique features, materials, and craftsmanship story.";
    }
    
    return "That's interesting! I'm designed to help artisans with product descriptions, pricing, marketing, photography, and more. How can I specifically assist you with your craft business today?";
  };

  const handleQuickAction = (action: string, text: string) => {
    sendMessage(action, true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>AI Assistant</Text>
          <Text style={styles.headerSubtitle}>Online • Ready to help</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Feather name="more-vertical" size={24} color="#64748b" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        style={styles.messagesContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessageContainer : styles.aiMessageContainer,
            ]}
          >
            {!message.isUser && (
              <View style={styles.aiAvatar}>
                <LinearGradient
                  colors={['#7c3aed', '#a855f7']}
                  style={styles.avatarGradient}
                >
                  <Feather name="zap" size={16} color="white" />
                </LinearGradient>
              </View>
            )}
            
            <View
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}
              >
                {message.text}
              </Text>
              <Text
                style={[
                  styles.messageTime,
                  message.isUser ? styles.userMessageTime : styles.aiMessageTime,
                ]}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>
        ))}

        {/* Quick Actions */}
        {messages.length <= 2 && (
          <View style={styles.quickActionsContainer}>
            <Text style={styles.quickActionsTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.quickActionButton}
                  onPress={() => handleQuickAction(action.action, action.text)}
                >
                  <Feather name={action.icon as any} size={16} color="#0ea5e9" />
                  <Text style={styles.quickActionText}>{action.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            placeholder="Ask me anything about your craft business..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity
            style={[styles.sendButton, inputText.trim() ? styles.sendButtonActive : styles.sendButtonInactive]}
            onPress={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
          >
            <Feather 
              name="send" 
              size={20} 
              color={inputText.trim() ? "white" : "#9ca3af"} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputFooter}>
          <Feather name="shield" size={12} color="#9ca3af" />
          <Text style={styles.inputFooterText}>
            Your conversations are private and secure
          </Text>
        </View>
      </KeyboardAvoidingView>
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#059669',
    marginTop: 2,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 24,
    paddingBottom: 120,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarGradient: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: '#0ea5e9',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: '#374151',
  },
  messageTime: {
    fontSize: 11,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  aiMessageTime: {
    color: '#9ca3af',
  },
  quickActionsContainer: {
    marginTop: 24,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  quickActionText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 6,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#0ea5e9',
  },
  sendButtonInactive: {
    backgroundColor: '#f3f4f6',
  },
  inputFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFooterText: {
    fontSize: 12,
    color: '#9ca3af',
    marginLeft: 4,
  },
});
