import React,{useEffect,useState} from "react";
import "./../styles/SquadList.css";
import axios from "axios";

function SquadList(){

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
    console.log(squads)

    return(
    <div>
    <video id="background-video" autoPlay loop muted>
    <source src="./videos/squadlist-background.mp4" type="video/mp4"/>
    </video>
    <div className="squad-container">
        {squads.length>0&&squads.map((squad)=>{
            let name= squad.name.substring(0,5);
            let number= squad.name[name.length];
            if(name!=='dispa')
            return(<div className="squad-list" onMouseEnter={console.log('s')}>
                <p className="squadlist-name">{name} {number}</p>
                <ul>
                {squad.squad.map((it)=>{
                    return(<li>{it.member}</li>)
                })}
                </ul>
                </div>)
        })}
    </div>
    <div className="squad-info"></div>
    </div>)
}

export default SquadList;