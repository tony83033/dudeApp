// components/ui/CategoryCard.tsx
import React from 'react';
import { View, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Text } from './Text';
import { cn } from '../../lib/utils';

interface CategoryCardProps {
  title: string;
  image: ImageSourcePropType;
  startingPrice?: string;
  onPress?: () => void;
  className?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  image,
  startingPrice,
  onPress,
  className,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(
        'bg-yellow-50 rounded-lg p-4',
        className
      )}
    >
      <Image 
        source={image}
        className="w-20 h-20"
        resizeMode="contain"
      />
      <Text className="font-bold mt-2">{title}</Text>
      {startingPrice && (
        <Text className="text-gray-500 text-sm">
          Starting at {startingPrice}
        </Text>
      )}
    </TouchableOpacity>
  );
};