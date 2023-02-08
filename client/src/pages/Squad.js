import React,{useState} from "react";
import ShowMap from "./ShowMap"
import axios from "axios";
import "./../styles/Squad.css";
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
            priority: 0,
            description: ""
        }
    )

    const [coords,setCorrds]=useState({
        latitude:0,
        longitude:0
    })
    const [checked,setChecked]=useState(false);
    const [id,setId]=useState("");

    function Change(id){
    setId(id);
    }

    function sendReq(){
        axios.get(`http://localhost:3001/id/${id}`).then((response)=>{
            setFormData(response.data.data.activecall);
            setCorrds({
                latitude:response.data.data.activecall.latitude,
                longitude:response.data.data.activecall.longitude
            })
            setChecked(true);
        })
    }

    function loadNewCases(){
              setChecked(false);
              axios.delete(`http://localhost:3001/id/${id}`).then((response)=>{
                window.location.href="http://localhost:3000/squad";
              })
    }
    


    React.useEffect(() => {
    axios.get(`http://localhost:3001/?jurisdiction=${jurisdiction}&sort=-priority`).then( (response) => {
    setFormData(response.data.data.activecalls)
    setId(response.data.data.activecalls[0]._id)
    })
    }, []);

    return(
        <div className="squadContainer">
            <div className="sidebar">
            {!checked&&<div><br/><h1>{name} {number}</h1><br/><hr/>
            <h1>{jurisdiction}</h1><br/><hr/><br/><br/>
            <table>
            <tr>
            <th>Name</th>
            <th>Role</th>
            </tr> 
            {members}
            </table></div>}
            {checked&&<div>
            <h3>Name</h3>
            {formData.name}<hr/>
            <h3>Number</h3>
            {formData.number}<hr/>
            <h3>Type</h3>
            {formData.type}<hr/>
            <h3>Description</h3>
            {formData.description}<hr/>
            </div>}<br/><br/><br/><br/>
            {!checked&&<button className="case-button" onClick={sendReq}>Take Case</button>}
            {checked&&<button className="case-closed" onClick={loadNewCases}>Case Closed</button>}
            </div>
        <div>
        {!checked&&<table>
        <h2>Calls</h2>
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
            <td>{data.priority}</td>
            <td><input 
            type="checkbox"
            checked={data._id===id?true:false}
            onChange={() =>Change(data._id)}/></td>
        </tr>
        )
        }))}
        </table>
        }
        {checked&&coords.latitude!==0&&<ShowMap coords={coords}/>}
        </div>
        {!checked&&<button className="logOutButtonSquad" onClick={()=>window.location.href="http://localhost:3000/"}>
        Log Out
        </button>}
        </div>
    )
}

export default Squad;