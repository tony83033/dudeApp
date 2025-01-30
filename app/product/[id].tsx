import React, { useEffect, useState, useMemo } from 'react';
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { fetchProductsById, fetchProductsByCategoryId } from '../../lib/fetchProducts';
import { Product } from '../../types/productTypes';
import ProductCard from '../../components/customComponents/ProductCard';
import { addToCart } from '../../lib/handleCart';
import { useGlobalContext } from '@/context/GlobalProvider';

const ProductScreen = () => {
  const { id } = useLocalSearchParams(); // Get the product ID from the route
  const [product, setProduct] = useState<Product | null>(null); // State for product details
  const [isProductLoading, setIsProductLoading] = useState(true); // Loading state for product
  const [isRelatedLoading, setIsRelatedLoading] = useState(false); // Loading state for related products
  const [error, setError] = useState(''); // Error state
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]); // State for related products
  const { user } = useGlobalContext(); // Get current user

  // Fetch product details
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsProductLoading(true);
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
        setIsProductLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    const loadRelatedProducts = async () => {
      if (!product) return;

      try {
        setIsRelatedLoading(true);
        const products = await fetchProductsByCategoryId(product.categoryId);
        setRelatedProducts(products);
      } catch (error) {
        console.error('Failed to fetch related products:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load related products.',
        });
      } finally {
        setIsRelatedLoading(false);
      }
    };

    loadRelatedProducts();
  }, [product]);

  // Handle product press
  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!user) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please log in to add items to your cart.',
      });
      return;
    }

    try {
      await addToCart(user.$id, product!.$id, 1, product!.price, product!.imageUrl, product!.name);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product added to cart!',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to add product to cart. Please try again.',
      });
    }
  };

  // Memoize related products to avoid unnecessary re-renders
  const memoizedRelatedProducts = useMemo(() => relatedProducts, [relatedProducts]);

  // Render loading state
  if (isProductLoading) {
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

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Product Image */}
      <Image
        source={{ uri: product.imageUrl }}
        className="w-full h-80"
        resizeMode="cover"
        accessibilityRole="image"
        accessibilityLabel={product.name}
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
          onPress={handleAddToCart}
          className="mt-6"
          disabled={product.stock <= 0}
          accessibilityRole="button"
          accessibilityLabel={product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </View>

      {/* Related Products */}
      <View className="mt-8 px-4">
        <Text className="text-xl font-bold mb-4">You Might Also Like</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {memoizedRelatedProducts.map((product) => (
            <ProductCard
              key={product.$id}
              image={{ uri: product.imageUrl }}
              name={product.name}
              price={`₹${product.price}`}
              mrp={product.mrp ? `₹${product.mrp}` : undefined}
              discount={product.discount ? `${product.discount}% OFF` : undefined}
              onPress={() => handleProductPress(product.$id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Toast Component */}
      <Toast />
    </ScrollView>
  );
};

export default ProductScreen;