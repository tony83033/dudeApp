// app/(tabs)/categories.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

// Category data with Unsplash images
const categoryData = {
  grocery: {
    title: "Grocery",
    items: [
      {
        title: "Masala & Spices",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80",
      },
      {
        title: "Dry Fruits",
        image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=500&q=80",
      },
      {
        title: "Rice & Rice Products",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
      },
      {
        title: "Dals & Pulses",
        image: "https://images.unsplash.com/photo-1585996746349-d61f7e6d9136?w=500&q=80",
      },
      {
        title: "Cooking Oil",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80",
      },
      {
        title: "Ghee & Vanaspati",
        image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=500&q=80",
      },
    ]
  },
  snacks: {
    title: "Snacks & Packed Food",
    items: [
      {
        title: "Biscuits & Cookies",
        image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80",
      },
      {
        title: "Namkeens & Snacks",
        image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=500&q=80",
      },
      {
        title: "Chocolates & Candies",
        image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&q=80",
      },
      {
        title: "Noodles & Pasta",
        image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80",
      },
    ]
  },
  beverages: {
    title: "Beverages",
    items: [
      {
        title: "Tea & Coffee",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
      },
      {
        title: "Soft Drinks",
        image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=500&q=80",
      },
      {
        title: "Fruit Juices",
        image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&q=80",
      },
    ]
  },
  personalCare: {
    title: "Personal Care",
    items: [
      {
        title: "Skin Care",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80",
      },
      {
        title: "Hair Care",
        image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80",
      },
      {
        title: "Oral Care",
        image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&q=80",
      },
    ]
  },
  householdItems: {
    title: "Household Items",
    items: [
      {
        title: "Detergents",
        image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&q=80",
      },
      {
        title: "Cleaners",
        image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&q=80",
      },
      {
        title: "Air Fresheners",
        image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500&q=80",
      },
    ]
  }
};

const Categories = () => {
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
        {Object.values(categoryData).map((section, index) => (
          <CategorySection
            key={index}
            title={section.title}
            items={section.items}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface CategorySectionProps {
  title: string;
  items: Array<{
    title: string;
    image: string;
  }>;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title, items }) => (
  <View className="mt-4">
    <View className="flex-row justify-between items-center px-4">
      <Text className="text-lg font-bold">{title}</Text>
      <TouchableOpacity>
        <Ionicons name="chevron-forward" size={24} color="gray" />
      </TouchableOpacity>
    </View>
    <View className="flex-row flex-wrap mt-2">
      {items.map((item, index) => (
        <CategoryItem key={index} {...item} />
      ))}
    </View>
  </View>
);

interface CategoryItemProps {
  title: string;
  image: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ title, image }) => (
  <TouchableOpacity 
    className="w-1/3 p-2"
    onPress={() => console.log(`Selected category: ${title}`)}
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