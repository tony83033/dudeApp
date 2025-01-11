// hooks/useLocation.ts
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export interface DetailedAddress {
  area: string;
  city: string;
  street?: string | undefined;
  landmark?: string | undefined;
  postalCode?: string | undefined;
  region?: string | undefined;
  fullAddress: string;
}

interface LocationState {
  location: Location.LocationObject | null;
  address: DetailedAddress | null;
  loading: boolean;
  error: string | null;
}

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    location: null,
    address: null,
    loading: true,
    error: null,
  });

  const getLocation = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Location permission denied'
        }));
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const [addressDetails] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      if (!addressDetails) {
        throw new Error('Could not fetch address details');
      }

      const address: DetailedAddress = {
        area: addressDetails.district || addressDetails.subregion || 'Unknown Area',
        city: addressDetails.city || 'Unknown City',
        street: addressDetails.street || undefined,
        landmark: addressDetails.name || undefined,
        postalCode: addressDetails.postalCode || undefined,
        region: addressDetails.region || undefined,
        fullAddress: [
          addressDetails.street,
          addressDetails.district,
          addressDetails.city,
          addressDetails.region,
          addressDetails.postalCode
        ].filter(Boolean).join(', ') || 'Address not available'
      };

      setState({
        location,
        address,
        loading: false,
        error: null
      });

    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error getting location'
      }));
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...state,
    getLocation,
  };
};