// app/(profile)/earnings.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface EarningTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
}

const MOCK_TRANSACTIONS: EarningTransaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    amount: 100,
    type: 'credit',
    description: 'Referral Bonus',
  },
  // Add more transactions
];

export default function EarningsScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Total Earnings Card */}
      <View className="bg-green-500 p-6">
        <Text className="text-white text-lg">Total Earnings</Text>
        <Text className="text-white text-3xl font-bold mt-2">₹1,234.00</Text>
      </View>

      {/* Transactions List */}
      <ScrollView className="flex-1 p-4">
        {MOCK_TRANSACTIONS.map(transaction => (
          <View 
            key={transaction.id}
            className="flex-row justify-between items-center p-4 border-b border-gray-100"
          >
            <View>
              <Text className="font-medium">{transaction.description}</Text>
              <Text className="text-gray-500 text-sm">{transaction.date}</Text>
            </View>
            <Text className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
              {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}