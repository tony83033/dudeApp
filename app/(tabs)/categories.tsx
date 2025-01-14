// app/(tabs)/categories.tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { fetchCategories } from '../../lib/fetchProducts';

interface Category {
  $id: string;
  name: string;
  imageUrl: string;
  categoryId:string
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold ml-4">Categories</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap mt-2">
          {categories.map((category) => (
            <CategoryItem
              key={category.$id}
              title={category.name}
              image={category.imageUrl}
              onPress={() => handleCategoryPress(category.categoryId)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

interface CategoryItemProps {
  title: string;
  image: string;
  onPress: () => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ title, image, onPress }) => (
  <TouchableOpacity 
    className="w-1/3 p-2"
    onPress={onPress}
  >
    <View className="bg-gray-50 rounded-lg p-4 items-center">
      <Image 
        source={{ uri: image }} 
        className="w-16 h-16 rounded-lg"
        style={{ backgroundColor: '#f3f4f6' }}
      />
      <Text className="text-center mt-2 text-sm" numberOfLines={2}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Categories;