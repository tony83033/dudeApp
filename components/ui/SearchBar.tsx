// components/ui/SearchBar.tsx
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../lib/utils';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onPress?: () => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onPress,
  className,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        'flex-row items-center bg-white rounded-full px-4 py-2',
        className
      )}
    >
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search products..."
        className="flex-1 ml-2"
        placeholderTextColor="gray"
      />
      <Ionicons name="mic" size={20} color="gray" />
    </TouchableOpacity>
  );
};