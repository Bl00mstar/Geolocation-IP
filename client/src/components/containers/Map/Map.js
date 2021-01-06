import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapComponent = ({ latitude, longitude, ip }) => {
  let icon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
  });
  return (
    <>
      <h5> {ip}</h5>
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        scrollWheelZoom={true}
        style={{
          height: '35vh',
          width: '45vh',
          display: 'inline-block',
          boxShadow: '0 0 8px 0 #990099',
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={icon} position={[latitude, longitude]}>
          <Popup>{ip}</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default MapComponent;
