// app/(tabs)/home.tsx
import React, { useState } from 'react';
import { View, ScrollView, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { useLocation } from '../../hooks/useLocation';
import { LocationExpandedView } from '../../components/LocationExpandedView';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Types
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

interface QuickLinkProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  showViewAll?: boolean;
  onViewAll?: () => void;
}

interface CategoryCardProps {
  title: string;
  startingPrice: string;
  image: { uri: string };
  onPress?: () => void;
}

// Constants
const IMAGES = {
  masala: { uri: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80" },
  sugar: { uri: "https://images.unsplash.com/photo-1622484211148-c6b9d8dba7bb?w=500&q=80" },
  salt: { uri: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=500&q=80" },
  atta: { uri: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" },
  rice: { uri: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80" },
  oil: { uri: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80" },
  fruits: { uri: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&q=80" },
};

const QUICK_LINKS = [
  { icon: 'basket' as const, title: 'Top Deals' },
  { icon: 'restaurant' as const, title: 'Cooking Essentials' },
  { icon: 'fast-food' as const, title: 'Packaged Food' },
  { icon: 'cafe' as const, title: 'Beverages' },
];

const BEST_SELLERS = [
  {
    id: '1',
    image: IMAGES.atta,
    name: "Savaria Shudh Whole Wheat Atta",
    weight: "10 kg",
    price: "₹371",
    mrp: "₹458",
    discount: "20% OFF"
  },
  {
    id: '2',
    image: IMAGES.rice,
    name: "Premium Basmati Rice",
    weight: "5 kg",
    price: "₹299",
    mrp: "₹399",
    discount: "25% OFF"
  }
];

const CATEGORIES = [
  {
    id: '1',
    title: "Fruits & Vegetables",
    startingPrice: "₹9/kg",
    image: IMAGES.fruits
  },
  {
    id: '2',
    title: "Masala & Spices",
    startingPrice: "₹45/pack",
    image: IMAGES.masala
  }
];

const Home: React.FC = () => {
  const { location, address, loading, error, getLocation } = useLocation();
  const [showLocationExpanded, setShowLocationExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const LocationHeader = () => (
    <TouchableOpacity 
      className="flex-row items-center"
      onPress={() => setShowLocationExpanded(true)}
      activeOpacity={0.7}
    >
      <Ionicons name="location" size={24} color="white" />
      <View className="ml-2 flex-1">
        {loading ? (
          <>
            <Text className="text-white font-bold text-lg">Loading...</Text>
            <Text className="text-white text-sm">Getting your location</Text>
          </>
        ) : error ? (
          <>
            <Text className="text-white font-bold text-lg">Location Error</Text>
            <Text className="text-white text-sm">{error}</Text>
          </>
        ) : (
          <>
            <Text className="text-white font-bold text-lg" numberOfLines={1}>
              {address?.area || 'Select Location'}
            </Text>
            <Text className="text-white text-sm" numberOfLines={1}>
              {address?.city || 'Set your delivery location'}
            </Text>
          </>
        )}
      </View>
      <Ionicons name="chevron-down" size={20} color="white" />
    </TouchableOpacity>
  );

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Location */}
      <View className="bg-green-500 px-4 pb-4">
        <LocationHeader />
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-full mt-4 px-4 py-2">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search products..."
            className="flex-1 ml-2"
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="mic" size={20} color="gray" />
          )}
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View className="p-4">
          <Card className="bg-yellow-50 p-4 rounded-lg">
            <Text className="text-lg font-bold">LOWEST PRICES IN JAIPUR</Text>
            <View className="flex-row mt-4 justify-between">
              <ProductCard
                image={IMAGES.sugar}
                name="Sugar"
                price="₹51/kg"
                onPress={() => handleProductPress('sugar')}
              />
              <ProductCard
                image={IMAGES.salt}
                name="Salt"
                price="₹9/kg"
                onPress={() => handleProductPress('salt')}
              />
            </View>
          </Card>
        </View>

        {/* Quick Links */}
        <View className="flex-row justify-between px-4 py-2">
          {QUICK_LINKS.map((link, index) => (
            <QuickLink 
              key={index}
              icon={link.icon}
              title={link.title}
              onPress={() => console.log(`Pressed ${link.title}`)}
            />
          ))}
        </View>

        {/* City Best Sellers */}
        <Section 
          title="City Best Sellers" 
          showViewAll
          onViewAll={() => console.log('View all best sellers')}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="px-4"
          >
            {BEST_SELLERS.map((item) => (
              <ProductCard
                key={item.id}
                large
                {...item}
                onPress={() => handleProductPress(item.id)}
              />
            ))}
          </ScrollView>
        </Section>

        {/* Top Categories */}
        <Section 
          title="Top Categories"
          showViewAll
          onViewAll={() => router.push('/categories')}
        >
          <View className="flex-row flex-wrap justify-between px-4">
            {CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                {...category}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </View>
        </Section>

        {/* Season Essentials */}
        <Section title="Season Essentials">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="px-4 pb-4"
          >
            {BEST_SELLERS.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                large
                onPress={() => handleProductPress(item.id)}
              />
            ))}
          </ScrollView>
        </Section>
      </ScrollView>

      <LocationExpandedView
        visible={showLocationExpanded}
        onClose={() => setShowLocationExpanded(false)}
        address={address}
        loading={loading}
        error={error}
        onRefreshLocation={getLocation}
        coordinates={location?.coords ? {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        } : undefined}
      />
    </SafeAreaView>
  );
};

// Helper Components
const ProductCard: React.FC<ProductCardProps> = ({ 
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

const QuickLink: React.FC<QuickLinkProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity 
    className="items-center"
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center">
      <Ionicons name={icon} size={24} color="#4B5563" />
    </View>
    <Text className="text-xs mt-1 text-center">{title}</Text>
  </TouchableOpacity>
);

const Section: React.FC<SectionProps> = ({ title, children, showViewAll, onViewAll }) => (
  <View className="mt-6">
    <View className="flex-row justify-between items-center px-4 mb-4">
      <Text className="text-lg font-bold">{title}</Text>
      {showViewAll && (
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={onViewAll}
        >
          <Text className="text-green-500">View All</Text>
        </TouchableOpacity>
      )}
    </View>
    {children}
  </View>
);

const CategoryCard: React.FC<CategoryCardProps> = ({ title, startingPrice, image, onPress }) => (
  <TouchableOpacity 
    className="w-[48%] bg-yellow-50 rounded-lg p-4 mb-4"
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Image 
      source={image} 
      className="w-20 h-20"
      resizeMode="cover"
    />
    <Text className="font-bold mt-2">{title}</Text>
    <Text className="text-gray-500 text-sm">Starting at {startingPrice}</Text>
  </TouchableOpacity>
);

export default Home;