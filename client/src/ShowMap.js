import "./styles/ShowMap.css";
import Map from "./Map/Map";
import { useEffect, useState } from "react";

export default function App(cor) {

const end = {
  elatitude: cor.coords.latitude,
  elongitude: cor.coords.longitude
}

const [start, setStart] = useState({
    slatitude: 0,
    slongitude: 0
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
    setStart({
      slatitude: position.coords.latitude,
      slongitude: position.coords.longitude
    }); 
   let url="https://nominatim.openstreetmap.org/reverse?format=jsonv2"+
   "&lat="+start.latitude+"&lon="+start.longitude;

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
     {start.slatitude!=0&&<Map start={start} end={end} display_name={display_name}  />}
    </div>
  );
}
