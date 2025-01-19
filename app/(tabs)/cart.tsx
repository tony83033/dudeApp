import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { fetchCart, updateCart, removeFromCart, clearCart } from '../../lib/handleCart';
import { useGlobalContext } from '@/context/GlobalProvider';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { user } = useGlobalContext();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const userId = user?.$id.toString();
        const cart = await fetchCart(userId || '');
        setCartItems(cart.items);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  const updateQuantity = async (productId: string, newQuantity: number) => {
    try {
      const userId = user?.$id.toString();
      const updatedItems = cartItems.map(item =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      await updateCart(userId || '', updatedItems);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      const userId = user?.$id.toString();
      await removeFromCart(userId || '', productId);
      const updatedItems = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClearCart = async () => {
    try {
      const userId = user?.$id.toString();
      await clearCart(userId || '');
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LinearGradient
        colors={['#FFFFFF', '#F3F4F6']}
        className="flex-1"
      >
        {/* Header */}
        <View className="p-4 border-b border-gray-200 shadow-sm">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text className="text-xl font-bold ml-4">Shopping Cart</Text>
          </View>
        </View>

        {/* Cart Items */}
        <ScrollView className="flex-1">
          {cartItems.map(item => (
            <CartItemCard
              key={item.productId}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          ))}

          {/* Offers Section */}
          <Card className="m-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
            <Text className="font-bold mb-2">Available Offers</Text>
            <View className="flex-row items-center">
              <Ionicons name="pricetag" size={20} color="#22C55E" />
              <Text className="ml-2 text-gray-600">
                Get 10% off on orders above ₹500
              </Text>
            </View>
          </Card>
        </ScrollView>

        {/* Bottom Sheet */}
        <View className="border-t border-gray-200 p-4 bg-white">
          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-600">Total Amount</Text>
            <Text className="font-bold">₹{totalAmount}</Text>
          </View>
          <Button onPress={() => console.log('Proceed to checkout')} className="bg-blue-500">
            Proceed to Checkout
          </Button>
          <TouchableOpacity onPress={handleClearCart} className="mt-2">
            <Text className="text-red-500 text-center">Clear Cart</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onUpdateQuantity, onRemoveItem }) => (
  <TouchableOpacity onPress={() => handleProductPress(item.productId)}>
    <View className="p-4 border-b border-gray-200">
      <View className="flex-row">
        <Image source={{ uri: item.imageUrl }} className="w-24 h-24 rounded-lg" />
        <View className="flex-1 ml-4">
          <Text className="font-medium text-lg">{item.name}</Text>
          <Text className="text-gray-600 mt-1">₹{item.price}</Text>
          
          {/* Quantity Controls */}
          <View className="flex-row items-center mt-2">
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.productId, Math.max(0, item.quantity - 1))}
              className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name="remove" size={20} color="black" />
            </TouchableOpacity>
            <Text className="mx-4">{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
            >
              <Ionicons name="add" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Remove Button */}
          <TouchableOpacity
            onPress={() => onRemoveItem(item.productId)}
            className="mt-2"
          >
            <Ionicons name="trash" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default CartScreen;

function handleProductPress(productId: string): void {
  router.push(`/product/${productId}`);
}