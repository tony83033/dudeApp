// app/(app)/addresses.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Header, Button } from '../../components/ui';  // Changed from ../components/ui

const AddressesScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="My Addresses" showBack />
      <ScrollView>
        {/* Add address list here */}
      </ScrollView>
      <View className="p-4">
        <Button onPress={() => console.log('Add address')}>
          Add New Address
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default AddressesScreen;