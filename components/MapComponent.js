// components/MapComponent.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icon issues with Webpack and Next.js
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const redMarkerUrl =
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
const redMarkerRetinaUrl =
  'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';

// Update redIcon with the correct URLs
const redIcon = new L.Icon({
  iconUrl: redMarkerUrl,
  iconRetinaUrl: redMarkerRetinaUrl,
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent = ({ places }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // Fetch user's geolocation based on public IP
    const fetchUserLocation = async () => {
      try {
        // Step 1: Fetch the user's public IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        if (!ipResponse.ok) {
          throw new Error('Failed to fetch IP address');
        }
        const ipData = await ipResponse.json();
        const userIP = ipData.ip;

        // Step 2: Geolocate based on the fetched IP address
        const geoResponse = await fetch(`https://ipapi.co/${userIP}/json/`);
        if (!geoResponse.ok) {
          throw new Error('Failed to fetch geolocation data');
        }
        const geoData = await geoResponse.json();
        const { latitude, longitude } = geoData;

        if (latitude && longitude) {
          setUserLocation([latitude, longitude]);
        } else {
          throw new Error('Invalid location data received');
        }
      } catch (error) {
        console.error('Error fetching user location:', error);
        setLocationError(error.message);
      } finally {
        setLoadingLocation(false);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <MapContainer
      center={[44.8566, 2.3522]} // Center the map to Paris
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }} // Ensure the map fills its container
      className="absolute inset-0 z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Blue Markers for Places */}
      {places.map((place) => (
        <Marker key={place.id} position={place.position}>
          <Popup>{place.name}</Popup>
        </Marker>
      ))}

      {/* Red Marker for User Location */}
      {!loadingLocation && userLocation && (
        <Marker position={userLocation} icon={redIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

      {/* Optional: Handle Location Error */}
      {!loadingLocation && locationError && (
        <Popup position={[48.8566, 2.3522]}>Error: {locationError}</Popup>
      )}
    </MapContainer>
  );
};

export default MapComponent;
