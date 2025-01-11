// app/(app)/orders.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Header } from '../../components/ui';  // Changed from ../components/ui

const OrdersScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="My Orders" showBack />
      <ScrollView>
        {/* Add order list here */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrdersScreen;