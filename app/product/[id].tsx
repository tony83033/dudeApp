
import React, { useEffect, useState, useMemo } from 'react';
import { View, ScrollView, Image, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { fetchProductsById, fetchProductsByCategoryId } from '../../lib/fetchProducts';
import { Product } from '../../types/productTypes';
import ProductCard from '../../components/customComponents/ProductCard';
import { addToCart, fetchCart } from '../../lib/handleCart';
import { useGlobalContext } from '@/context/GlobalProvider';
import QuantityModal from '@/components/customComponents/cart/CartDialogBox';


interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isProductLoading, setIsProductLoading] = useState(true);
  const [isRelatedLoading, setIsRelatedLoading] = useState(false);
  const [error, setError] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isInCart, setIsInCart] = useState(false);
  const { user } = useGlobalContext();

  const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false);


 

  // Check if product is in cart
  const checkIfInCart = async () => {
    if (!user || !product) return;
    try {
      const cart = await fetchCart(user.$id);
      const isItemInCart = cart.items.some((item: CartItem) => item.productId === id);
      setIsInCart(isItemInCart);
    } catch (error) {
      console.error('Error checking cart:', error);
    }
  };

 

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

  // Check cart when product loads or changes
  useEffect(() => {
    checkIfInCart();
  }, [product, user]);

  // Fetch related products
  useEffect(() => {
    const loadRelatedProducts = async () => {
      if (!product) return;

      try {
        setIsRelatedLoading(true);
        const products = await fetchProductsByCategoryId(product.categoryId);
        // Filter out the current product from related products
        const filteredProducts = products.filter(p => p.$id !== product.$id);
        setRelatedProducts(filteredProducts);
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

  // Update the function signature to accept quantity
const handleAddToCart = async (quantity: number = 1) => {
  if (!user) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Please log in to add items to your cart.',
    });
    return;
  }

  try {
    await addToCart(
      user.$id, 
      product!.$id, 
      quantity,  // Use the quantity parameter here
      product!.price, 
      product!.imageUrl, 
      product!.name
    );
    setIsInCart(true);
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

  const handleCartAction = () => {
    if (isInCart) {
      router.push('/cart');
    } else {
      setIsQuantityModalVisible(true);
    }
  };

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  // Memoize related products
  const memoizedRelatedProducts = useMemo(() => relatedProducts, [relatedProducts]);

  if (isProductLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

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

        {/* Add to Cart/Go to Cart Button */}
        <Button
          onPress={handleCartAction}
          className={`mt-6 ${isInCart ? 'bg-green-500' : 'bg-blue-500'}`}
          disabled={product.stock <= 0}
          accessibilityRole="button"
          accessibilityLabel={
            product.stock <= 0 
              ? 'Out of Stock' 
              : isInCart 
                ? 'Go to Cart' 
                : 'Add to Cart'
          }
        >
          {product.stock <= 0 
            ? 'Out of Stock' 
            : isInCart 
              ? 'Go to Cart' 
              : 'Add to Cart'}
        </Button>
      </View>

      {/* Related Products */}
      {memoizedRelatedProducts.length > 0 && (
        <View className="mt-8 px-4 pb-8">
          <Text className="text-xl font-bold mb-4">You Might Also Like</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {memoizedRelatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.$id}
                image={{ uri: relatedProduct.imageUrl }}
                name={relatedProduct.name}
                price={`₹${relatedProduct.price}`}
                mrp={relatedProduct.mrp ? `₹${relatedProduct.mrp}` : undefined}
                discount={relatedProduct.discount ? `${relatedProduct.discount}% OFF` : undefined}
                onPress={() => handleProductPress(relatedProduct.$id)}
              />
            ))}
          </ScrollView>
        </View>
      )}


{/* Quantity Modal */}
<QuantityModal
  visible={isQuantityModalVisible}
  onClose={() => setIsQuantityModalVisible(false)}
  onConfirm={(quantity: number) => handleAddToCart(quantity)}
  maxQuantity={product.stock}
/>
      {/* Toast Component */}
      <Toast />
    </ScrollView>
  );
};

export default ProductScreen;