import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Dimensions, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {  ProductCard,  } from '../../components/customComponents/ProductCardHome';
import {Text} from "@/components/ui/Text";
import {Card} from "@/components/ui/Card";
import {  QuickLink } from '../../components/customComponents/QuickLink';
import { Section } from '../../components/customComponents/Section';
import { CategoryCard } from '../../components/customComponents/CategoryCard';
import { useLocation } from '../../hooks/useLocation';
import { LocationExpandedView } from '../../components/LocationExpandedView';
import { router } from 'expo-router';
import { fetchFeaturedProducts, fetchTopCategories } from '../../lib/fetchProducts';
import { Product } from '../../types/productTypes';
import { Category } from '@/types/categoryTypes';
import FastImage from 'react-native-fast-image';
import ProductOfTheDay from '@/components/customComponents/home/ProdectOfTheDay';

const { width } = Dimensions.get('window');

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

const Home: React.FC = () => {
  const { location, address, loading, error, getLocation } = useLocation();
  const [showLocationExpanded, setShowLocationExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [topCategories, setTopCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [products, categories] = await Promise.all([
          fetchFeaturedProducts(),
          fetchTopCategories(),
        ]);
        setFeaturedProducts(products);
        setTopCategories(categories);
      } catch (error) {
        setErrorMessage('Failed to fetch data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = featuredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{errorMessage}</Text>
      </View>
    );
  }

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
      {/* to do render product of the day */}
            <ProductOfTheDay/>
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
          <FlatList
            horizontal
            data={filteredProducts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
              <ProductCard
                image={{ uri: item.imageUrl }}
                name={item.name}
                price={`₹${item.price}`}
                mrp={item.mrp ? `₹${item.mrp}` : undefined}
                discount={item.discount ? `${item.discount}% OFF` : undefined}
                onPress={() => handleProductPress(item.$id)}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </Section>

        {/* Top Categories */}
        <Section 
          title="Top Categories"
          showViewAll
          onViewAll={() => router.push('/categories')}
        >
          <View className="flex-row flex-wrap justify-between px-4">
            {topCategories.map((category) => (
              <CategoryCard
                key={category.$id}
                title={category.name}
                startingPrice="Starting at ₹0"
                image={{ uri: category.imageUrl }}
                onPress={() => handleCategoryPress(category.categoryId)}
              />
            ))}
          </View>
        </Section>

        {/* Season Essentials */}
        <Section title="Season Essentials">
          <FlatList
            horizontal
            data={BEST_SELLERS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ProductCard
                key={item.id}
                {...item}
                large
                onPress={() => handleProductPress(item.id)}
              />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
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

export default Home;