import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapComponent = ({ latitude, longitude, ip }) => {
  return (
    <div className="col s12 center">
      <h5>Your IP address is: {ip}</h5>
      <MapContainer
        center={[latitude, longitude]}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: '35vh', width: '45vh', display: 'inline-block' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
