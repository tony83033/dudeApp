// app/(profile)/terms.tsx
import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from '../../components/ui/Text';

export default function TermsScreen() {
  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-4">Terms & Conditions</Text>
      
      <Text className="text-lg font-bold mt-4 mb-2">1. Introduction</Text>
      <Text className="text-gray-600 mb-4">
        These terms and conditions outline the rules and regulations for the use of our Application.
      </Text>

      <Text className="text-lg font-bold mt-4 mb-2">2. License</Text>
      <Text className="text-gray-600 mb-4">
        Unless otherwise stated, we own the intellectual property rights for all material in the Application.
      </Text>

      {/* Add more sections as needed */}
    </ScrollView>
  );
}