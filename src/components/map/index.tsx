import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';

import { LocationMarkerIcon } from '@heroicons/react/outline';

const customMarkerIcon = divIcon({
  html: renderToStaticMarkup(
    <div className="bg-green-600 w-8 h-8 p-1 shadow-xl -mt-2 -ml-3 rounded-full">
      <LocationMarkerIcon className="w-6 h-6 text-white" />
    </div>
  ),
});

import 'leaflet/dist/leaflet.css';

interface MapProps {
  pharmacies: PharmaciesType[];
}

export default function Map({ pharmacies }: MapProps) {
  const appId = 'IAOpWtaJ1MqilFQE43z2';
  const appCode = 'Yc6BorxizRSjZ6EdzJllmA';
  const apiKey = 'muj8iFFOls6-UBh09fOEEI3GS3re61j0FaFhHfI9J4c';
  const language = 'spa';
  const base = 'base';
  const scheme = 'normal.day';
  const tileType = 'maptile';

  return (
    <MapContainer
      center={[38.4771946, -1.32498899]}
      zoom={16}
      scrollWheelZoom
      className="w-full h-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://2.${base}.maps.ls.hereapi.com/maptile/2.1/${tileType}/newest/${scheme}/{z}/{x}/{y}/512/png8?app_id=${appId}&app_code=${appCode}&apiKey=${apiKey}&lg=${language}`}
      />

      {pharmacies.map(({ id, map, name }) => {
        const { lat, lng } = map;

        return (
          <Marker key={id} position={[lat, lng]} icon={customMarkerIcon}>
            <Popup>{name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
