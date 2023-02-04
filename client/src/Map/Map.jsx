import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React from "react";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import icon from "./../icon.png";
import L from "leaflet";
import "leaflet-routing-machine";


export default function Map({ coords, display_name }) {
  
  const { latitude, longitude } = coords;

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  });

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
    map.on('click', onMapClick);
    function onMapClick(e) {
    const data={
      latitude:e.latlng.lat,
      longitude:e.latlng.lng
    }
    console.log(data);
    L.marker([e.latlng.lat,e.latlng.lng],{icon:customIcon}).addTo(map);
    // axios.post("http://localhost:3001",).then((response) => {
    //         });

    // L.Routing.control({
    //   waypoints:[
    //     L.latLng(latitude,longitude),
    //     L.latLng(e.latlng.lat,e.latlng.lng)
    //   ],
    // }).addTo(map);
}
    return null;
  }



  return (
    <MapContainer
      classsName="map"
      center={[latitude, longitude]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <MapView />
    </MapContainer>
  );
}
