import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Example supply chain journey coordinates (latitude, longitude)
const journey = [
  { name: 'Farm', position: [28.7041, 77.1025] }, // Delhi
  { name: 'Processor', position: [26.9124, 75.7873] }, // Jaipur
  { name: 'Warehouse', position: [25.3176, 82.9739] }, // Varanasi
  { name: 'Retailer', position: [19.0760, 72.8777] }, // Mumbai
];

const positions = journey.map(j => j.position);

export default function SupplyChainMap() {
  return (
    <MapContainer center={[23.2599, 77.4126]} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {journey.map((loc, idx) => (
        <Marker key={idx} position={loc.position}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
      <Polyline positions={positions} color='blue' />
    </MapContainer>
  );
}
