// app/(profile)/language.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface Language {
  id: string;
  name: string;
  code: string;
}

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages: Language[] = [
    { id: 'en', name: 'English', code: 'en' },
    { id: 'hi', name: 'Hindi', code: 'hi' },
    { id: 'bn', name: 'Bengali', code: 'bn' },
    { id: 'te', name: 'Telugu', code: 'te' },
    { id: 'ta', name: 'Tamil', code: 'ta' },
  ];

  return (
    <View className="flex-1 bg-white">
      {languages.map(language => (
        <TouchableOpacity
          key={language.id}
          className="flex-row items-center justify-between p-4 border-b border-gray-100"
          onPress={() => setSelectedLanguage(language.code)}
        >
          <Text className="text-lg">{language.name}</Text>
          {selectedLanguage === language.code && (
            <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}