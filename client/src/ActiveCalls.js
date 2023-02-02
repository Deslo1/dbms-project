import React from "react";
import axios from "axios";
import "./styles/ActiveCalls.css"

function ActiveCalls(){

    const [formData, setFormData] = React.useState(
            {
                name: "",
                jurisdiction: "",
                type: "",
                number: 0,
                description: ""
            }
        )

    const [data, setdata] = React.useState(
            {
                name: "",
                jurisdiction: "",
                type: "",
                number: 0,
                description: ""
            }
        )


    React.useEffect(() => {
      axios.get("http://localhost:3001/").then( (response) => {
        setFormData(response.data.data.activecalls)
      })
    }, []);


  
    


    return(
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

    )
}

export default ActiveCalls;