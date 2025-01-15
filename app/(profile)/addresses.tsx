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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useGlobalContext } from '../../context/GlobalProvider';
import { AddressFormModal, AddressFormData } from '../../components/customComponents/AddressesFormModal';

// Types
interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  phoneNumber: string;
  address: string;
  landmark: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const STORAGE_KEY = 'user_addresses';

export default function AddressesScreen() {
  const { user } = useGlobalContext();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [formData, setFormData] = useState<AddressFormData>({
    type: 'home',
    name: user?.name || '',
    phoneNumber: user?.phone || '',
    address: '',
    landmark: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      const savedAddresses = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load addresses');
    } finally {
      setIsLoading(false);
    }
  };

  const detectCurrentLocation = async () => {
    setIsLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please allow location access to auto-detect your address');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const [addressDetails] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (addressDetails) {
        setFormData(prev => ({
          ...prev,
          address: [
            addressDetails.street,
            addressDetails.district,
            addressDetails.subregion,
          ].filter(Boolean).join(', '),
          area: addressDetails.district || addressDetails.subregion || '',
          city: addressDetails.city || '',
          state: addressDetails.region || '',
          pincode: addressDetails.postalCode || '',
        }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to detect location');
    } finally {
      setIsLocationLoading(false);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }
    if (!formData.address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return false;
    }
    if (!formData.area.trim()) {
      Alert.alert('Error', 'Please enter your area');
      return false;
    }
    if (!formData.pincode.trim() || !/^\d{6}$/.test(formData.pincode)) {
      Alert.alert('Error', 'Please enter a valid 6-digit pincode');
      return false;
    }
    if (!formData.city.trim()) {
      Alert.alert('Error', 'Please enter your city');
      return false;
    }
    if (!formData.state.trim()) {
      Alert.alert('Error', 'Please enter your state');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newAddresses = [...addresses];
    
    if (editingAddress) {
      const index = newAddresses.findIndex(addr => addr.id === editingAddress.id);
      if (index !== -1) {
        newAddresses[index] = {
          ...editingAddress,
          ...formData,
        };
      }
    } else {
      const newAddress: Address = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addresses.length === 0,
      };
      newAddresses.push(newAddress);
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAddresses));
      setAddresses(newAddresses);
      setIsModalVisible(false);
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'Failed to save address');
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      name: user?.name || '',
      phoneNumber: user?.phone || '',
      address: '',
      landmark: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
    });
    setEditingAddress(null);
  };

  const handleSetDefault = async (addressId: string) => {
    const newAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId,
    }));
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAddresses));
      setAddresses(newAddresses);
    } catch (error) {
      Alert.alert('Error', 'Failed to set default address');
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      type: address.type,
      name: address.name,
      phoneNumber: address.phoneNumber,
      address: address.address,
      landmark: address.landmark,
      area: address.area,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
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
              const newAddresses = addresses.filter(addr => addr.id !== addressId);
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAddresses));
              setAddresses(newAddresses);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete address');
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
          <Ionicons 
            name={item.type === 'home' ? 'home' : item.type === 'work' ? 'business' : 'location'} 
            size={24} 
            color="#4B5563" 
          />
          <Text className="font-bold ml-2">
            {item.type.toUpperCase()}
          </Text>
        </View>
        <View className="flex-row items-center">
          {!item.isDefault && (
            <TouchableOpacity 
              onPress={() => handleSetDefault(item.id)}
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
        <Text className="font-bold text-gray-800">{item.name}</Text>
        <Text className="text-gray-600">{item.phoneNumber}</Text>
      </View>

      <View className="mb-2">
        <Text className="text-gray-600">{item.address}</Text>
        {item.landmark && (
          <Text className="text-gray-600">Landmark: {item.landmark}</Text>
        )}
        <Text className="text-gray-600">
          {item.area}, {item.city}, {item.state} - {item.pincode}
        </Text>
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
          onPress={() => handleDeleteAddress(item.id)}
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
          keyExtractor={item => item.id}
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
    </View>
  );
}