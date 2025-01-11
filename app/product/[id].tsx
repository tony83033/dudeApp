// app/product/[id].tsx
import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text, Button } from '../../components/ui';
import UNSPLASH_IMAGES  from '../../constants/images';

const ProductScreen = () => {
  const { id } = useLocalSearchParams();

  return (
    <ScrollView className="flex-1 bg-white">
      <Image 
        source={UNSPLASH_IMAGES.sugar}
        className="w-full h-80"
        resizeMode="cover"
      />
      
      <View className="p-4">
        <Text className="text-2xl font-bold">Premium Sugar</Text>
        <Text className="text-gray-600 mt-2">1 kg</Text>
        
        <View className="flex-row items-center mt-4">
          <Text className="text-2xl font-bold">₹51</Text>
          <Text className="text-gray-500 line-through ml-2">₹60</Text>
          <View className="bg-green-100 px-2 py-1 rounded ml-2">
            <Text className="text-green-700 text-sm">15% OFF</Text>
          </View>
        </View>

        <View className="mt-6">
          <Text className="font-bold text-lg mb-2">Product Description</Text>
          <Text className="text-gray-600">
            Premium quality sugar that's perfect for your daily needs. 
            Finely processed and pure.
          </Text>
        </View>

        <Button 
          onPress={() => console.log('Add to cart')}
          className="mt-6"
        >
          Add to Cart
        </Button>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;