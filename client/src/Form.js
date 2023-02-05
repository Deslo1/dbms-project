import React from 'react';
import axios from "axios";
import './styles/Form.css';
import { useEffect, useState } from "react";
import ActiveCalls from "./ActiveCalls.js"
import "leaflet/dist/leaflet.css";
import icon from "./icon.png";
import L from "leaflet";
import "leaflet-routing-machine";
import { MapContainer, TileLayer,useMap } from "react-leaflet";
import "./Map/Map.css";


function Form(){

    const types=["Domestic Abuse","Armed Assault","Public Nuisance"];
    const gettypes=types.map(type=>{
        return(<option value={type}>{type}</option>)});

        const [formData, setFormData] = React.useState(
            {
                name: "",
                jurisdiction: "",
                type: "",
                number: 0,
                description: "",
                latitude:null,
                longitude:null
            }
        )

        function handleChange(event){
            setFormData(prevFormData =>{
                return{
                    ...prevFormData,
                    [event.target.name]:event.target.value
                }
            })
        }

    function onSubmit(event) {
            console.log(formData)
            axios.post("http://localhost:3001",formData).then((response) => {
            });
            }

  const [coords, setCorrds] = useState({
    latitude: 0,
    longitude: 0
  });


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
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
    getCurrentCityName,
    error,
    options
    );
  }, []);

    const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30]
  });

    var marker;
    let i=0;

  function MapView() {
    let map = useMap();
    map.setView([coords.latitude,coords.longitude], map.getZoom());
    map.on('click', onMapClick);
    function onMapClick(e) {
        if(i>0)
            map.removeLayer(marker);
        i++;
        marker=new L.Marker(e.latlng,{icon:customIcon}).addTo(map);
        setFormData(prevFormData =>{
                return{
                    ...prevFormData,
                    latitude:e.latlng.lat,
                    longitude:e.latlng.lng
                }
            })
    };
    return null;
  }



    return(
        <div className='Home'>
        <form className='form'>
        <label>Name</label><br/>
        <input type="text" name="name" onChange={handleChange}></input><br/><br/>
        <label>Jurisdiction</label><br/>
        <input type="text" name="jurisdiction"  onChange={handleChange}></input><br/><br/><br/>
        <select name="type" id="type" onChange={handleChange}>
        <option>Type</option>
        {gettypes}
        </select><br/><br/>
        <label>Number</label><br/>
        <input type="number" name="number" onChange={handleChange}></input><br/><br/>
        <label>Description</label><br/>
        <textarea name="description" onChange={handleChange}></textarea><br/><br/>
       <div className='leaflet-container'> 
       {coords.latitude!=0&&
        <MapContainer
        classsName="map"
        center={[coords.latitude,coords.longitude]}
        zoom={5}
        scrollWheelZoom={true}
        >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <MapView />
        </MapContainer>}</div><br/>
        <button onClick={onSubmit}>Submit</button><br/><br/>
        </form>
        <ActiveCalls/>
        <button className="logOutButton" onClick={()=>window.location.href="http://localhost:3000/"}>
        Log Out
        </button>
        </div>
    );
}

export default Form;