// app/(profile)/orders.tsx
import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '../../components/ui/Text';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
  total: number;
  items: number;
}

const ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'OD123456789',
    date: '15 Jan 2024',
    status: 'delivered',
    total: 499,
    items: 3,
  },
  {
    id: '2',
    orderNumber: 'OD123456790',
    date: '14 Jan 2024',
    status: 'pending',
    total: 799,
    items: 2,
  },
];

export default function OrdersScreen() {
  const renderOrder = ({ item }: { item: Order }) => (
    <TouchableOpacity 
      className="bg-white p-4 mb-2 rounded-lg"
      onPress={() => console.log(`View order ${item.orderNumber}`)}
    >
      <View className="flex-row justify-between items-center">
        <Text className="font-bold">#{item.orderNumber}</Text>
        <Text 
          className={
            item.status === 'delivered' ? 'text-green-600' :
            item.status === 'cancelled' ? 'text-red-600' :
            'text-yellow-600'
          }
        >
          {item.status.toUpperCase()}
        </Text>
      </View>
      
      <Text className="text-gray-500 mt-1">{item.date}</Text>
      
      <View className="flex-row justify-between items-center mt-2">
        <Text className="font-bold">₹{item.total}</Text>
        <Text className="text-gray-500">{item.items} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={ORDERS}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerClassName="p-4"
      />
    </View>
  );
}