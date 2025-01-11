// app/(tabs)/profile.tsx
import React from 'react';
import { View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../../components/ui/Text';
import { useGlobalContext } from '../../context/GlobalProvider';
import { signOut } from '../../lib/handleAuth';
import { router } from 'expo-router';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
}

const ProfileScreen: React.FC = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLogged(false);
      router.replace('/(auth)/sign-in');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Profile Header */}
      <View className="p-4 border-b border-gray-200">
        <View className="flex-row items-center">
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            className="w-16 h-16 rounded-full"
          />
          <View className="ml-4">
            <Text className="text-xl font-bold">
              {user?.name || 'Bhupesh Choudhary'}
            </Text>
            <Text className="text-gray-600">
              {user?.phone || '7489356891'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <MenuItem
          icon="share-social-outline"
          title="Share App"
          onPress={() => console.log('Share')}
        />
        <MenuItem
          icon="document-text-outline"
          title="My Orders"
          onPress={() => router.push('/(app)/orders' as any)}
        />
        <MenuItem
          icon="wallet-outline"
          title="My Earning"
          onPress={() => console.log('Earnings')}
        />
        <MenuItem
          icon="people-outline"
          title="My Referral"
          onPress={() => console.log('Referral')}
        />
        <MenuItem
          icon="headset-outline"
          title="Customer Support"
          onPress={() => console.log('Support')}
        />
        <MenuItem
          icon="language-outline"
          title="Change Language"
          onPress={() => console.log('Language')}
        />
        <MenuItem
          icon="location-outline"
          title="My Addresses"
          onPress={() => router.push('/(app)/addresses' as any)}
        />
        <MenuItem
          icon="document-outline"
          title="Terms & Conditions"
          onPress={() => console.log('Terms')}
        />
        <MenuItem
          icon="shield-outline"
          title="Account Privacy"
          onPress={() => console.log('Privacy')}
        />
        <MenuItem
          icon="log-out-outline"
          title="Logout"
          onPress={handleLogout}
        />
      </ScrollView>

      <Text className="text-center text-gray-500 py-4">
        v1.4.0.0
      </Text>
    </SafeAreaView>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row items-center px-4 py-3 border-b border-gray-100"
  >
    <Ionicons name={icon} size={24} color="#4B5563" />
    <Text className="flex-1 ml-3">{title}</Text>
    <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
  </TouchableOpacity>
);

export default ProfileScreen;