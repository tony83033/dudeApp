// app/product/[id].tsx
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { fetchProductsById,fetchProductsByCategory } from '../../lib/fetchProducts';
import { Product } from '../../types/productTypes';
import ProductCard from '../../components/customComponents/ProductCard';

const ProductScreen = () => {
  const { id } = useLocalSearchParams(); // Get the product ID from the route
  const [product, setProduct] = useState<Product | null>(null); // State for product details
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]); // State for related products

  // Fetch product details
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await fetchProductsById(id.toString());
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found.');
        }
      } catch (error) {
        setError('Failed to fetch product details. Please try again.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    const loadRelatedProducts = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProductsByCategory(product?.categoryId || '');
        setRelatedProducts(products);
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (product) {
      loadRelatedProducts();
    }
  }, [product]);
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

  // Render product details
  if (!product) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">Product not found.</Text>
      </View>
    );
  }

   const handleProductPress = (productId: string) => {
      // Navigate to the dynamic product route
      router.push(`/product/${productId}`);
    };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Product Image */}
      <Image 
        source={{ uri: product.imageUrl }}
        className="w-full h-80"
        resizeMode="cover"
      />
      
      {/* Product Details */}
      <View className="p-4">
        {/* Product Name */}
        <Text className="text-2xl font-bold">{product.name}</Text>
        
        {/* Price and Discount */}
        <View className="flex-row items-center mt-4">
          <Text className="text-2xl font-bold">₹{product.price}</Text>
          {product.mrp && (
            <Text className="text-gray-500 line-through ml-2">₹{product.mrp}</Text>
          )}
          {product.discount && (
            <View className="bg-green-100 px-2 py-1 rounded ml-2">
              <Text className="text-green-700 text-sm">{product.discount}% OFF</Text>
            </View>
          )}
        </View>

        {/* Stock Availability */}
        <View className="mt-4">
          <Text className="text-gray-600">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        {/* Product Description */}
        <View className="mt-6">
          <Text className="font-bold text-lg mb-2">Product Description</Text>
          <Text className="text-gray-600">{product.description}</Text>
        </View>

        {/* Add to Cart Button */}
        <Button 
          onPress={() => console.log('Add to cart')}
          className="mt-6"
          disabled={product.stock <= 0} // Disable button if out of stock
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </View>

      {/* Related Products */}
      <View className="mt-8 px-4">
        <Text className="text-xl font-bold mb-4">You Might Also Like</Text>
       
        <ScrollView horizontal  showsHorizontalScrollIndicator={false} >
          {/* Example Related Products */}
         {relatedProducts.map((product) => (
          
          <ProductCard
          key={product.$id}
          image={{ uri: product.imageUrl }}
          name={product.name}
          price={`₹${product.price}`}
          mrp={product.mrp ? `₹${product.mrp}` : undefined}
          discount={product.discount ? `${product.discount}% OFF` : undefined}
          onPress={() => handleProductPress(product.$id)}
        />))}
         
        
         
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;