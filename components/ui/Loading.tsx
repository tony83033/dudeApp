// components/ui/Loading.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface LoadingProps {
  size?: 'small' | 'large';
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color = '#3B82F6'
}) => {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;