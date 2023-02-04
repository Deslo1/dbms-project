import React,{useState} from "react";
import ShowMap from "./ShowMap"
import axios from "axios";
import "./styles/Squad.css";
import { useLocation } from "react-router-dom";

function Squad(){

    const {state} = useLocation();
    const jurisdiction=state.data.jurisdiction;
    const name= state.data.name.substring(0,5);
    const number= state.data.name[name.length];

    const members=state.data.squad.map(data=>{
        return(
        <tr>
            <td>{data.member}</td>
            <td>{data.role}</td>
        </tr>
        )
        })

    const [formData, setFormData] = useState(
        {
            name: "",
            jurisdiction: "",
            type: "",
            number: 0,
            description: ""
        }
    )

    const [coords,setCorrds]=useState({
        latitude:0,
        longitude:0
    })
    const [checked,setChecked]=useState(false);
    const [criminal,setCriminal]=useState(null);

    function Change(name){
    setCriminal(name);
    }

    function sendReq(){
        axios.get(`http://localhost:3001/?name=${criminal}&jurisdiction=${jurisdiction}`).then((response)=>{
            console.log(response.data.data.activecalls[0].latitude);
            setCorrds({
                latitude:response.data.data.activecalls[0].latitude,
                longitude:response.data.data.activecalls[0].longitude
            })
            setChecked(true);
        })
    }

    function loadCases(){
              setChecked(false);
    }
    


    React.useEffect(() => {
    axios.get(`http://localhost:3001/?jurisdiction=${jurisdiction}`).then( (response) => {
    setFormData(response.data.data.activecalls)
    setCriminal(response.data.data.activecalls[0].name)
    })
    }, []);

    return(
        <div className="squadContainer">
            <div className="sidebar">
            <h1>{name} {number}</h1><br/>
            <h1>{jurisdiction}</h1><br/><br/><br/><br/>
            <table>
            <tr>
            <th>Name</th>
            <th>Role</th>
            </tr> 
            {members}
            </table><br/><br/><br/><br/>
            {!checked&&<button className="case-button" onClick={sendReq}>Take Case</button>}
            {checked&&<button className="case-closed" onClick={loadCases}>Case Closed</button>}
            </div>
        <div>
        {!checked&&<table>
        <h3>Active Calls</h3>
        <tr>
            <th>Type</th>
            <th>Name</th>
            <th>Area</th>
            <th>Priority</th>
            <th>Check</th>
        </tr> 
        {formData.length>0&&(formData.map(data=>{
        return(
        <tr>
            <td>{data.type}</td>
            <td>{data.name}</td>
            <td>{data.jurisdiction}</td>
            <td>0</td>
            <td><input 
            type="checkbox"
            checked={data.name===criminal?true:false}
            onChange={() =>Change(data.name)}/></td>
        </tr>
        )
        }))}
        </table>}
        {checked&&coords.latitude!=0&&<ShowMap coords={coords}/>}
        </div>
        </div>
    )
}

export default Squad;