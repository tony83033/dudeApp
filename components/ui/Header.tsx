// components/ui/Header.tsx
import React from 'react';
import { View, TouchableOpacity, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from './Text';
import { cn } from '../../lib/utils';
import { router } from 'expo-router';

interface HeaderProps extends ViewProps {
  title: string;
  showBack?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  rightIcon,
  onRightPress,
  className,
  ...props
}) => {
  return (
    <View
      className={cn(
        'flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200',
        className
      )}
      {...props}
    >
      <View className="flex-row items-center">
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Text className="text-lg font-bold">{title}</Text>
      </View>

      {rightIcon && (
        <TouchableOpacity onPress={onRightPress}>
          <Ionicons name={rightIcon} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};