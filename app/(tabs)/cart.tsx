// app/(tabs)/cart.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text, Card, Button } from '../../components/ui';



const UNSPLASH_IMAGES = {
    salt: "https://images.unsplash.com/photo-1626197031507-c17099753214?w=500&q=80",
    sugar: "https://images.unsplash.com/photo-1622484211148-c6b9d8dba7bb?w=500&q=80",
    atta: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80",
    rice: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
    oil: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80",
    spices: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80",
    fruits: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&q=80",
    vegetables: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=500&q=80",
    beverages: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=500&q=80",
    snacks: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&q=80",
    dairy: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=500&q=80",
    cleaning: "https://images.unsplash.com/photo-1585236849737-9d77131a2b4b?w=500&q=80",
    personal_care: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
    baby_care: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&q=80",
    household: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&q=80",
    masala: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80",
    dry_fruits: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=500&q=80",
    tea: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    coffee: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
    biscuits: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80",
    noodles: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80",
    chocolates: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&q=80",
    jam: "https://images.unsplash.com/photo-1622205313162-be1d5712a43b?w=500&q=80",
  };

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: any;
}

const CartScreen: React.FC = () => {
// For CartScreen:
const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: '1',
      name: 'Sampoorti Iodised Salt - 1 Kg',
      price: 56,
      quantity: 4,
      image: { uri: UNSPLASH_IMAGES.salt },
    },
    {
      id: '2',
      name: 'Tata Premium Tea - 500g',
      price: 285,
      quantity: 1,
      image: { uri: UNSPLASH_IMAGES.tea },
    },
    // Add more items
  ]);
  
 
  
  // For Categories:
  const categoryData = {
    grocery: {
      title: "Grocery",
      items: [
        {
          title: "Masala & Spices",
          image: UNSPLASH_IMAGES.masala,
        },
        {
          title: "Dry Fruits",
          image: UNSPLASH_IMAGES.dry_fruits,
        },
        {
          title: "Rice & Rice Products",
          image: UNSPLASH_IMAGES.rice,
        },
        {
          title: "Cooking Oil",
          image: UNSPLASH_IMAGES.oil,
        },
        // Add more items
      ]
    },
    beverages: {
      title: "Beverages",
      items: [
        {
          title: "Tea & Coffee",
          image: UNSPLASH_IMAGES.tea,
        },
        {
          title: "Soft Drinks",
          image: UNSPLASH_IMAGES.beverages,
        },
        // Add more items
      ]
    },
    // Add more categories
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="p-4 border-b border-gray-200">
          <Text className="text-xl font-bold">Shopping Cart</Text>
        </View>

        {/* Cart Items */}
        <ScrollView className="flex-1">
          {cartItems.map(item => (
            <CartItemCard
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
            />
          ))}

          {/* Offers Section */}
          <Card className="m-4 p-4">
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
        <View className="border-t border-gray-200 p-4">
          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-600">Total Amount</Text>
            <Text className="font-bold">₹{totalAmount}</Text>
          </View>
          <Button onPress={() => console.log('Proceed to checkout')}>
            Proceed to Checkout
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onUpdateQuantity }) => (
  <View className="p-4 border-b border-gray-200">
    <View className="flex-row">
      <Image source={item.image} className="w-20 h-20 rounded" />
      <View className="flex-1 ml-4">
        <Text className="font-medium">{item.name}</Text>
        <Text className="text-gray-600 mt-1">₹{item.price}</Text>
        
        {/* Quantity Controls */}
        <View className="flex-row items-center mt-2">
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
            className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
          >
            <Ionicons name="remove" size={20} color="black" />
          </TouchableOpacity>
          <Text className="mx-4">{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
          >
            <Ionicons name="add" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

export default CartScreen;