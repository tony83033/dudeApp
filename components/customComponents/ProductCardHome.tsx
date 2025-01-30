import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { Text } from '../ui/Text';

interface ProductCardProps {
  image: { uri: string };
  name: string;
  price: string;
  mrp?: string;
  discount?: string;
  weight?: string;
  large?: boolean;
  onPress?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  name, 
  price, 
  mrp, 
  discount, 
  weight, 
  large,
  onPress 
}) => (
  <TouchableOpacity 
    className={`${large ? 'w-64' : 'w-32'} mr-4 bg-white rounded-lg p-2`}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Image 
      source={image} 
      className="w-full h-32 rounded-lg"
      resizeMode="cover"
    />
    <Text className="font-bold mt-2" numberOfLines={2}>{name}</Text>
    {weight && <Text className="text-gray-500 text-sm">{weight}</Text>}
    <View className="flex-row items-center mt-1">
      <Text className="font-bold text-lg">{price}</Text>
      {mrp && (
        <Text className="text-gray-500 line-through ml-2 text-sm">{mrp}</Text>
      )}
    </View>
    {discount && (
      <View className="bg-red-500 px-2 py-1 rounded absolute top-2 left-2">
        <Text className="text-white text-xs">{discount}</Text>
      </View>
    )}
  </TouchableOpacity>
);