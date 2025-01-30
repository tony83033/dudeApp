// app/(profile)/addresses.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
} from 'react-native';
import { Text } from '../../components/ui/Text';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useGlobalContext } from '../../context/GlobalProvider';
import { AddressFormModal, AddressFormData } from '../../components/customComponents/AddressesFormModal';
import { databases} from '../../lib/appwrite';
import { ID, Query } from "react-native-appwrite";
import { appwriteConfig } from '../../lib/appwrite';
import Toast from 'react-native-toast-message';

// Types
interface Address {
  addressId: string;
  userId: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressDetails: string; // New field
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AddressesScreen() {
  const { user } = useGlobalContext();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [formData, setFormData] = useState<AddressFormData>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    addressDetails: '', // New field
    isDefault: false,
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.addressesCollectionId,
        [Query.equal('userId', user?.$id || '')]
      );

      const addresses: Address[] = response.documents.map((doc) => ({
        addressId: doc.addressId,
        userId: doc.userId,
        street: doc.street,
        city: doc.city,
        state: doc.state,
        postalCode: doc.postalCode,
        country: doc.country,
        addressDetails: doc.addressDetails, // New field
        isDefault: doc.isDefault,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
      }));

      setAddresses(addresses);
    } catch (error) {
      console.log("erro in loading address",error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load addresses',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const detectCurrentLocation = async () => {
    setIsLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({
          type: 'error',
          text1: 'Permission Denied',
          text2: 'Please allow location access to auto-detect your address',
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [addressDetails] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressDetails) {
        const fullAddress = [
          addressDetails.street,
          addressDetails.district,
          addressDetails.subregion,
          addressDetails.city,
          addressDetails.region,
          addressDetails.country,
          addressDetails.postalCode,
        ].filter(Boolean).join(', ');

        setFormData(prev => ({
          ...prev,
          street: addressDetails.street || '',
          city: addressDetails.city || '',
          state: addressDetails.region || '',
          postalCode: addressDetails.postalCode || '',
          country: addressDetails.country || '',
          addressDetails: fullAddress, // Populate addressDetails
        }));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to detect location',
      });
    } finally {
      setIsLocationLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.street.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your street address',
      });
      return false;
    }
    if (!formData.city.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your city',
      });
      return false;
    }
    if (!formData.state.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your state',
      });
      return false;
    }
    if (!formData.postalCode.trim() || !/^\d{6}$/.test(formData.postalCode)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid 6-digit postal code',
      });
      return false;
    }
    if (!formData.country.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter your country',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const addressData = {
      userId: user?.$id || '',
      street: formData.street,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
      addressDetails: formData.addressDetails, // Include addressDetails
      isDefault: formData.isDefault,
    };

    try {
      if (editingAddress) {
        await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.addressesCollectionId,
          editingAddress.addressId,
          addressData
        );
      } else {
        await databases.createDocument(
          appwriteConfig.databaseId,
          appwriteConfig.addressesCollectionId,
          ID.unique(),
          addressData
        );
      }

      await loadAddresses();
      setIsModalVisible(false);
      resetForm();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to save address',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      addressDetails: '', // Reset addressDetails
      isDefault: false,
    });
    setEditingAddress(null);
  };

  const handleSetDefault = async (addressId: string) => {
    try {
      await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.addressesCollectionId,
        addressId,
        { isDefault: true }
      );
      await loadAddresses();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to set default address',
      });
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      addressDetails: address.addressDetails, // Include addressDetails
      isDefault: address.isDefault,
    });
    setIsModalVisible(true);
  };

  const handleDeleteAddress = (addressId: string) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.addressesCollectionId,
                addressId
              );
              await loadAddresses();
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete address',
              });
            }
          },
        },
      ]
    );
  };

  const renderAddress = ({ item }: { item: Address }) => (
    <View className="bg-white p-4 mb-2 rounded-lg shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Text className="font-bold ml-2">
            {item.isDefault ? 'Default Address' : 'Address'}
          </Text>
        </View>
        <View className="flex-row items-center">
          {!item.isDefault && (
            <TouchableOpacity 
              onPress={() => handleSetDefault(item.addressId)}
              className="mr-2"
            >
              <Text className="text-green-600 text-sm">Set as Default</Text>
            </TouchableOpacity>
          )}
          {item.isDefault && (
            <View className="bg-green-100 px-2 py-1 rounded">
              <Text className="text-green-600 text-sm">Default</Text>
            </View>
          )}
        </View>
      </View>

      <View className="mb-2">
        <Text className="text-gray-600">{item.street}</Text>
        <Text className="text-gray-600">
          {item.city}, {item.state}, {item.country} - {item.postalCode}
        </Text>
        {item.addressDetails && (
          <Text className="text-gray-600">Details: {item.addressDetails}</Text>
        )}
      </View>

      <View className="flex-row mt-3 pt-3 border-t border-gray-100">
        <TouchableOpacity 
          className="flex-row items-center mr-6"
          onPress={() => handleEditAddress(item)}
        >
          <Ionicons name="pencil" size={20} color="#4B5563" />
          <Text className="ml-1 text-gray-600">Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center"
          onPress={() => handleDeleteAddress(item.addressId)}
        >
          <Ionicons name="trash" size={20} color="#EF4444" />
          <Text className="ml-1 text-red-500">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#22C55E" />
        </View>
      ) : (
        <FlatList
          data={addresses}
          renderItem={renderAddress}
          keyExtractor={item => item.addressId}
          contentContainerClassName="p-4"
          ListEmptyComponent={() => (
            <View className="p-4 items-center">
              <Text className="text-gray-500">No addresses added yet</Text>
            </View>
          )}
        />
      )}
      
      <TouchableOpacity 
        className="bg-green-500 m-4 p-4 rounded-lg flex-row justify-center items-center"
        onPress={() => {
          resetForm();
          setIsModalVisible(true);
        }}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text className="text-white ml-2 font-medium">Add New Address</Text>
      </TouchableOpacity>

      <AddressFormModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          resetForm();
        }}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditing={!!editingAddress}
        isLocationLoading={isLocationLoading}
        onDetectLocation={detectCurrentLocation}
      />

      <Toast />
    </View>
  );
}