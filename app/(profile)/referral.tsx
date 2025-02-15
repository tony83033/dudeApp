// app/(profile)/referral.tsx
import React from 'react';
import { View, TouchableOpacity, Share } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';

export default function ReferralScreen() {
  const referralCode = 'ABC123';

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Use my referral code ${referralCode} to sign up!`,
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Referral Code Card */}
      <View className="bg-yellow-50 p-6 rounded-lg mb-4">
        <Text className="text-xl font-bold">Your Referral Code</Text>
        <Text className="text-3xl font-bold text-yellow-600 mt-2">
          {referralCode}
        </Text>
      </View>

      {/* Share Button */}
      <TouchableOpacity 
        className="bg-green-500 p-4 rounded-lg flex-row justify-center items-center"
        onPress={handleShare}
      >
        <Ionicons name="share-social" size={24} color="white" />
        <Text className="text-white ml-2 font-medium">Share Code</Text>
      </TouchableOpacity>

      {/* Referral Stats */}
      <View className="mt-8">
        <Text className="text-lg font-bold mb-4">Your Referrals</Text>
        <View className="flex-col justify-between">
          <View className="items-center">
            <Text className="text-2xl font-bold">5</Text>
            <Text className="text-gray-500">Total Referrals</Text>
          </View>
          {/* <View className="items-center">
            <Text className="text-2xl font-bold text-green-600">₹500</Text>
            <Text className="text-gray-500">Total Earnings</Text>
          </View> */}
        </View>
      </View>
    </View>
  );
}