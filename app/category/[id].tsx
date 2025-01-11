// app/category/[id].tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text, ProductCard } from '../../components/ui';
import  UNSPLASH_IMAGES  from '../../constants/images';

const CategoryScreen = () => {
  const { id } = useLocalSearchParams();
  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-lg font-bold mb-4">Products in this category</Text>
        <View className="flex-row flex-wrap justify-between">
          <ProductCard
            image={UNSPLASH_IMAGES.sugar}
            name="Premium Sugar"
            price="₹51/kg"
            discount="20% OFF"
          />
          {/* Add more products */}
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryScreen;