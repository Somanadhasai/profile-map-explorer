
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ profiles, onMarkerClick }) => {
  const mapContainerStyle = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: profiles.length > 0 ? profiles[0].location.lat : 0,
    lng: profiles.length > 0 ? profiles[0].location.lng : 0
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        {profiles.map(profile => (
          <Marker
            key={profile.id}
            position={{ lat: profile.location.lat, lng: profile.location.lng }}
            onClick={() => onMarkerClick(profile)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
