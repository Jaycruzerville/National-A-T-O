import React from "react"
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  GeoJSON,
} from "react-leaflet"
import { FeatureCollection } from "geojson"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

interface MapComponentProps {
  coordinates: [number, number]
  propertyData: {
    name: string
    description: string
  }
  geojsonData: FeatureCollection
}

const { BaseLayer, Overlay } = LayersControl

const MapComponent: React.FC<MapComponentProps> = ({
  coordinates,
  propertyData,
  geojsonData,
}) => {
  const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })

  // Default empty GeoJSON structure if no valid data is provided
  const defaultGeoJson: FeatureCollection = {
    type: "FeatureCollection",
    features: [],
  }

  const geoJsonStyle = () => ({
    color: "#ff7800",
    weight: 5,
    opacity: 0.65,
  })

  return (
    <MapContainer
      center={coordinates}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="OpenStreetMap">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </BaseLayer>
        <BaseLayer name="Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
          />
        </BaseLayer>
        <Overlay name="Property Boundaries">
          <GeoJSON data={geojsonData || defaultGeoJson} style={geoJsonStyle} />
        </Overlay>
      </LayersControl>
      <Marker position={coordinates} icon={markerIcon}>
        <Popup>
          <div>
            <h3>{propertyData.name}</h3>
            <p>{propertyData.description}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapComponent
