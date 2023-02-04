import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import React from "react";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import icon from "./../icon.png";
import L from "leaflet";
import "leaflet-routing-machine";


export default function Map({ start,end,display_name }) {
  
  const { slatitude, slongitude } = start;
  const { elatitude, elongitude } = end;

  const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  });

  function MapView() {
    let map = useMap();
    map.setView([slatitude, slongitude], map.getZoom());
    // L.marker([e.latlng.lat,e.latlng.lng],{icon:customIcon}).addTo(map);

    L.Routing.control({
      waypoints:[
        L.latLng(slatitude,slongitude),
        L.latLng(elatitude,elongitude)
      ],
      createMarker: function(i, wp, nWps) {
    if (i === 0 || i === nWps - 1) {
      // here change the starting and ending icons
      return L.marker(wp.latLng, {
        icon: customIcon // here pass the custom marker icon instance
      });
    } 
  }
    }).addTo(map);
    return null;
  }



  return (
    <MapContainer
      classsName="map"
      center={[slatitude, slongitude]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <MapView />
    </MapContainer>
  );
}