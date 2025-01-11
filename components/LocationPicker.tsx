// components/LocationPicker.tsx
import React from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Text } from './ui/Text';
import { Ionicons } from '@expo/vector-icons';

interface LocationPickerProps {
  visible: boolean;
  onClose: () => void;
  currentLocation: { latitude: number; longitude: number } | null;
  onSelectLocation: (location: { latitude: number; longitude: number }) => void;
  onUseCurrentLocation: () => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  visible,
  onClose,
  currentLocation,
  onSelectLocation,
  onUseCurrentLocation,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View className="flex-1 bg-black/50">
        <View className="mt-auto bg-white rounded-t-3xl h-[80%]">
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row items-center justify-between">
              <Text className="text-lg font-bold">Select Location</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="flex-row items-center p-4 border-b border-gray-100"
            onPress={() => {
              onUseCurrentLocation();
              onClose();
            }}
          >
            <Ionicons name="locate" size={24} color="#22C55E" />
            <View className="ml-3">
              <Text className="font-semibold">Use Current Location</Text>
              <Text className="text-sm text-gray-500">Using GPS</Text>
            </View>
          </TouchableOpacity>

          <View className="flex-1 px-4">
            <GooglePlacesAutocomplete
              placeholder="Search for your location"
              onPress={(data, details = null) => {
                if (details) {
                  onSelectLocation({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                  });
                }
              }}
              query={{
                key: 'YOUR_GOOGLE_API_KEY',
                language: 'en',
                components: 'country:in',
              }}
              fetchDetails={true}
              enablePoweredByContainer={false}
              styles={{
                container: {
                  flex: 1,
                },
                textInput: {
                  height: 48,
                  borderRadius: 24,
                  paddingHorizontal: 16,
                  backgroundColor: '#f3f4f6',
                  marginTop: 12,
                },
                listView: {
                  marginTop: 8,
                },
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};