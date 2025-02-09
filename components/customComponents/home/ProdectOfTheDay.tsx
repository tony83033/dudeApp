import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Button } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Text } from '@/components/ui/Text';
import ProductCard from '../ProductCard';
import { router } from 'expo-router';
import { fetchProductOfTheDay } from '@/lib/ProductOfTheDayFun';

// Define types for state
interface Product {
  productId: string;
  name: string;
  price: string;
  imageUrl: string;
}

const ProductOfTheDay = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProductsOfTheDay = async () => {
    try {
      const productsOfTheDay = await fetchProductOfTheDay();

      console.log("thi is my product in screen the in screen ",productsOfTheDay);  
      if (productsOfTheDay.length === 0) {
        setError('No products available for today.');
      } else {
        setProducts(productsOfTheDay);
//  here I am getting undefined
        console.log("thi is my product",products);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductsOfTheDay();
  }, []);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    loadProductsOfTheDay(); // Retry fetching products
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
        <Button title="Retry" onPress={handleRetry} />
      </View>
    );
  }

  if (products?.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">No products available for today.</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      <Card className="bg-yellow-50 p-4 rounded-lg">
        <Text className="text-lg font-bold">Products of the Day</Text>
        <View className="flex-row mt-4 justify-between">
          {products?.map((product) => (
            <ProductCard
              key={product.productId}
              image={{ uri: product.imageUrl }}
              name={product.name}
              price={product.price}
              onPress={() => handleProductPress(product.productId)}
            />
          ))}
        </View>
      </Card>
    </View>
  );
};

export default ProductOfTheDay;