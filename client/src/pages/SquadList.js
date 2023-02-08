import React,{useEffect,useState} from "react";
import "./../styles/SquadList.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SquadList(){

    const navigate=useNavigate();
    const [squads,setSquads]=useState({
        jurisdiction:"",
        name:"",
        squad:[]
    }
    );

    useEffect(()=>{
        axios.get('http://localhost:3001/login')
        .then((res)=>{
            setSquads(res.data.data.allsquads);
        })
    },[])
    
    function goToLogin(squad){
        navigate('/login');
    }

    return(
    <div>
    <video id="background-video" autoPlay loop muted>
    <source src="./videos/squadlist-background.mp4" type="video/mp4"/>
    </video>
    <div className="squad-container" onClick={goToLogin}>
        {squads.length>0&&squads.map((squad)=>{
            let name= squad.name.substring(0,5);
            let number= squad.name[name.length];
            if(name!=='dispa')
            return(<div className="squad-list">
                <p className="squadlist-name">{name} {number}</p>
                <ul>
                {squad.squad.map((it)=>{
                    return(<li>{it.member}</li>)
                })}
                </ul>
                </div>)
        })}
    </div>
    </div>)
}

export default SquadList;