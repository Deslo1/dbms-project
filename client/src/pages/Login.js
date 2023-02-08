import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./../styles/Login.css";

function Login(){

    let navigate=useNavigate();

    const [formData, setFormData] = React.useState(
            {
                name: "",
                password:""
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

    function handlSubmit(event) {
            event.preventDefault();
            axios.post("http://localhost:3001/login",formData)
            .then((response) => {
                if(response.data.page==='dispatch')
                navigate("/dispatch");
                else
                navigate("/squad",{state:{data:response.data.user}});
            });
  }

    return(
    <div className="loginContainer">
    <video id="background-video" autoPlay loop muted>
    <source src="./videos/login-background.mp4" type="video/mp4"/>
    </video>
    <form>
    <br/>
    <label>Username:</label><br/><br/>
    <input
    type="text"
    name="name"
    onChange={handleChange}
    /><br/><br/>
    <label>Password:</label><br/><br/>
    <input
    type="password"
    name="password"
    onChange={handleChange}
    /><br/><br/>
    <button onClick={handlSubmit}>Login</button>
    <br/><br/>
    </form>
    </div>
    )
}

export default Login;