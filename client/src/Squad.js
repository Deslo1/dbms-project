import React from "react";
import axios from "axios";
import "./styles/Squad.css";
import { useLocation } from "react-router-dom";

function Squad(){

    const {state} = useLocation();
    console.log(state.data)
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

    const [formData, setFormData] = React.useState(
        {
            name: "",
            jurisdiction: "",
            type: "",
            number: 0,
            description: ""
        }
    )


    React.useEffect(() => {
    axios.get(`http://localhost:3001/?jurisdiction=${jurisdiction}`).then( (response) => {
    setFormData(response.data.data.activecalls)
    })
    }, []);


    return(
        <div className="squadContainer">
            <div className="sidebar">
            <h1>{name} {number}</h1><br/>
            <h1>{jurisdiction}</h1><br/>
            <table>
            <tr>
            <th>Name</th>
            <th>Role</th>
            </tr> 
            {members}
            </table>
            </div>
            <div>
        <table>
        <h3>Active Calls</h3>
        <tr>
            <td>Type</td>
            <td>Name</td>
            <td>Area</td>
            <td>Priority</td>
        </tr> 
        {formData.length>0&&(formData.map(data=>{
        return(
        <tr>
            <td>{data.type}</td>
            <td>{data.name}</td>
            <td>{data.jurisdiction}</td>
            <td>0</td>
        </tr>
        )
        }))}
        </table>
            </div>
        </div>
    )
}

export default Squad;