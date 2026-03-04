import { useState, useCallback } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import indianLocationData from '@/data/indianLocations';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  location: {
    state: string;
    district: string;
    city: string;
    latitude: number;
    longitude: number;
  } | null;
}

// Haversine formula to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Approximate coordinates for Indian states (state capitals)
const stateCoordinates: { [key: string]: { lat: number; lng: number } } = {
  'Andhra Pradesh': { lat: 16.5062, lng: 80.6480 },
  'Arunachal Pradesh': { lat: 27.1004, lng: 93.6167 },
  'Assam': { lat: 26.2006, lng: 92.9376 },
  'Bihar': { lat: 25.5941, lng: 85.1376 },
  'Chhattisgarh': { lat: 21.2787, lng: 81.8661 },
  'Goa': { lat: 15.2993, lng: 74.1240 },
  'Gujarat': { lat: 22.2587, lng: 71.1924 },
  'Haryana': { lat: 29.0588, lng: 76.0856 },
  'Himachal Pradesh': { lat: 31.1048, lng: 77.1734 },
  'Jharkhand': { lat: 23.6102, lng: 85.2799 },
  'Karnataka': { lat: 15.3173, lng: 75.7139 },
  'Kerala': { lat: 10.8505, lng: 76.2711 },
  'Madhya Pradesh': { lat: 22.9734, lng: 78.6569 },
  'Maharashtra': { lat: 19.7515, lng: 75.7139 },
  'Manipur': { lat: 24.6637, lng: 93.9063 },
  'Meghalaya': { lat: 25.4670, lng: 91.3662 },
  'Mizoram': { lat: 23.1645, lng: 92.9376 },
  'Nagaland': { lat: 26.1584, lng: 94.5624 },
  'Odisha': { lat: 20.9517, lng: 85.0985 },
  'Punjab': { lat: 31.1471, lng: 75.3412 },
  'Rajasthan': { lat: 27.0238, lng: 74.2179 },
  'Sikkim': { lat: 27.5330, lng: 88.5122 },
  'Tamil Nadu': { lat: 11.1271, lng: 78.6569 },
  'Telangana': { lat: 18.1124, lng: 79.0193 },
  'Tripura': { lat: 23.9408, lng: 91.9882 },
  'Uttar Pradesh': { lat: 26.8467, lng: 80.9462 },
  'Uttarakhand': { lat: 30.0668, lng: 79.0193 },
  'West Bengal': { lat: 22.9868, lng: 87.8550 },
  'Andaman and Nicobar Islands': { lat: 11.7401, lng: 92.6586 },
  'Chandigarh': { lat: 30.7333, lng: 76.7794 },
  'Dadra and Nagar Haveli and Daman and Diu': { lat: 20.1809, lng: 73.0169 },
  'Delhi': { lat: 28.7041, lng: 77.1025 },
  'Jammu and Kashmir': { lat: 33.7782, lng: 76.5762 },
  'Ladakh': { lat: 34.1526, lng: 77.5771 },
  'Lakshadweep': { lat: 10.5667, lng: 72.6417 },
  'Puducherry': { lat: 11.9416, lng: 79.8083 }
};

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    location: null,
  });

  const reverseGeocode = useCallback(
    async (latitude: number, longitude: number) => {
      try {
        // Find nearest state based on coordinates
        let nearestState = '';
        let minDistance = Infinity;

        Object.entries(stateCoordinates).forEach(([stateName, coords]) => {
          const distance = calculateDistance(
            latitude,
            longitude,
            coords.lat,
            coords.lng
          );
          if (distance < minDistance) {
            minDistance = distance;
            nearestState = stateName;
          }
        });

        // Get districts for the nearest state
        const stateData = indianLocationData[nearestState as keyof typeof indianLocationData];
        if (!stateData) {
          throw new Error('State not found in database');
        }

        // Get first district and city as defaults
        const districts = Object.keys(stateData);
        const firstDistrict = districts[0] || '';
        const cities = stateData[firstDistrict as keyof typeof stateData] || [];
        const firstCity = Array.isArray(cities) ? cities[0] : '';

        return {
          state: nearestState,
          district: firstDistrict,
          city: firstCity,
          latitude,
          longitude,
        };
      } catch (error) {
        console.error('Reverse geocoding error:', error);
        throw new Error('Failed to determine location from coordinates');
      }
    },
    []
  );

  const getCurrentLocation = useCallback(async () => {
    setState({ loading: true, error: null, location: null });

    try {
      // Request permissions
      const permissions = await Geolocation.requestPermissions();
      
      if (permissions.location !== 'granted') {
        throw new Error('Location permission denied. Please enable location access in settings.');
      }

      // Get current position
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      });

      const { latitude, longitude } = position.coords;

      // Reverse geocode to get location details
      const locationData = await reverseGeocode(latitude, longitude);

      setState({
        loading: false,
        error: null,
        location: locationData,
      });

      return locationData;
    } catch (error: any) {
      const errorMessage =
        error?.message ||
        'Failed to get location. Please check GPS and internet connection.';
      
      setState({
        loading: false,
        error: errorMessage,
        location: null,
      });

      throw new Error(errorMessage);
    }
  }, [reverseGeocode]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    getCurrentLocation,
    clearError,
  };
}
