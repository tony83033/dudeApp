// app/category/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from '../../components/ui/Text';
import { ProductCard } from '../../components/ui/ProductCard';
import { fetchProductsByCategoryId } from '../../lib/fetchProducts';
import { Product } from '../../types/productTypes';

const CategoryScreen = () => {
  const { id } = useLocalSearchParams(); // Get the category ID from the route
  const [products, setProducts] = useState<Product[]>([]); // State for products
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  // Fetch products by category
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
      //  console.log("this log from /caategory/[id]",id);
        const productsData = await fetchProductsByCategoryId(id.toString());
        setProducts(productsData);
      //  console.log("this log from /caategory/[id]",productsData);
      } catch (error) {
        setError('Failed to fetch products. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [id]);

  // Render loading state
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  // Render empty state
  if (products.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-600">No products found in this category.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Category Name */}
      <View className="p-4 bg-green-100">
        <Text className="text-2xl font-bold">Category Name</Text>
        <Text className="text-gray-600">Explore products in this category</Text>
      </View>

      {/* Product Grid */}
      <View className="p-4">
        <View className="flex-row flex-wrap justify-between">
          {products.map((product) => (
            <ProductCard
              key={product.$id}
              image={{ uri: product.imageUrl }}
              name={product.name}
              price={`₹${product.price}`}
              mrp={product.mrp ? `₹${product.mrp}` : undefined}
              discount={product.discount ? `${product.discount}% OFF` : undefined}
              onPress={() =>router.push(`/product/${product.$id}`)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default CategoryScreen;