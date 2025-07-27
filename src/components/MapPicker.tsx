import Map, {
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/maplibre";

import { MapPinIcon } from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";

export function MapPicker({
  location,
  updateLocation = () => {},
  miniMap,
}: {
  location: { lat: number; lon: number } | null;
  updateLocation?: (location: { lat: number; lon: number }) => void;
  miniMap?: boolean;
}) {
  return (
    <Map
      initialViewState={
        miniMap
          ? { latitude: location?.lat, longitude: location?.lon, zoom: 13 }
          : {
              latitude: 60.168,
              longitude: 24.944,
              zoom: 10,
            }
      }
      onClick={(e) => {
        updateLocation({ lat: e.lngLat.lat, lon: e.lngLat.lng });
      }}
      style={{ height: miniMap ? "100%" : 400 }}
      mapStyle="https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json"
      attributionControl={miniMap ? false : { compact: true }}
    >
      {!miniMap && <NavigationControl position="top-left" />}
      {location && (
        <Marker
          longitude={location.lon}
          latitude={location.lat}
          anchor="bottom"
        >
          <MapPinIcon className="size-8 fill-red-500 stroke-red-500" />
        </Marker>
      )}
      <ScaleControl position="bottom-right" />
    </Map>
  );
}
