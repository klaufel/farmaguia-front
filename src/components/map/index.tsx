import { useRef, useState, useEffect } from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

import { styles } from './mapStyle';

interface MapProps extends google.maps.MapOptions {
  center?: google.maps.LatLngLiteral;
  pharmacies: PharmaciesType[];
  style?: { [key: string]: string };
  maxZoom?: number;
  zoom?: number;
}

// Return map bounds based on list of places
const getMapBounds = (pharmacies: PharmaciesType[]) => {
  const bounds = new google.maps.LatLngBounds();

  pharmacies.forEach((pharmacy) => {
    bounds.extend(
      new google.maps.LatLng(pharmacy.coordinates[0], pharmacy.coordinates[1])
    );
  });

  return bounds;
};

// Add map markers on list of places
const getMapMarkers = (pharmacies: PharmaciesType[], map: google.maps.Map) => {
  pharmacies.forEach((pharmacy) => {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        pharmacy.coordinates[0],
        pharmacy.coordinates[1]
      ),
      title: pharmacy.name,
    });

    marker.setMap(map);
  });
};

function Map({ center, pharmacies, style, maxZoom, zoom = 3 }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          backgroundColor: '#f7f8f9',
          center,
          maxZoom,
          disableDefaultUI: true,
          scrollwheel: true,
          styles,
          zoom,
        })
      );
    }
  }, [ref, map]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (map) {
      const bounds = getMapBounds(pharmacies);
      map.fitBounds(bounds);
      getMapMarkers(pharmacies, map);
    }
  }, [map, pharmacies]);

  return <div ref={ref} style={{ width: '100%', height: '100%', ...style }} />;
}

interface MapWrapperProps extends MapProps {
  municipality: string;
}

export default function MapWrapper({
  maxZoom,
  municipality,
  pharmacies,
}: MapWrapperProps) {
  return (
    <Wrapper apiKey="AIzaSyCJWZ2UyzY6YoROYqpHQwsU5xUkdeGHieI">
      <Map
        center={{ lat: 38.4771946, lng: -1.32498899 }}
        maxZoom={maxZoom}
        pharmacies={pharmacies}
        zoom={16}
      />
    </Wrapper>
  );
}
