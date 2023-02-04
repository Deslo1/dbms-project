import "./styles/ShowMap.css";
import Map from "./Map/Map";

import { useEffect, useState } from "react";
export default function App() {
const [coords, setCorrds] = useState({
    latitude: 0,
    longitude: 0
  });
  const [display_name, setName] = useState("");

  const [address, setAddress] = useState({});

  function error() {
    alert('Sorry, no position available.');
  }
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };

  function getCurrentCityName(position){
    setCorrds({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }); 
   let url="https://nominatim.openstreetmap.org/reverse?format=jsonv2"+
   "&lat="+coords.latitude+"&lon="+coords.longitude;

    fetch(url, {
      method: "GET",   
      mode: 'cors', 
      headers: {
        "Access-Control-Allow-Origin": "https://o2cj2q.csb.app"
      }
    })
      .then((response) => response.json())
      .then((data) => setName( data.display_name));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
    getCurrentCityName,
    error,
    options

    );
  }, []);

  return (
    <div className="full-map">
     {coords.latitude!=0&&<Map coords={coords} display_name={display_name}  />}
    </div>
  );
}
