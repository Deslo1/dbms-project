import { MapContainer, TileLayer, useMap } from "react-leaflet";
import React from "react";
import "./../styles/Map.css";
import "leaflet/dist/leaflet.css";
import icon from "./../images/icon.png";
import L from "leaflet";
import "leaflet-routing-machine";

export default function Map({ start,end}) {
  
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
    L.Routing.control({
      waypoints:[
        L.latLng(slatitude,slongitude),
        L.latLng(elatitude,elongitude)
      ],
      createMarker: function(i, wp, nWps) {
    if (i === 0 || i === nWps - 1) {
      return L.marker(wp.latLng, {
        icon: customIcon 
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
      scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="map-tiles"/>
      <MapView />
    </MapContainer>
  );
}
