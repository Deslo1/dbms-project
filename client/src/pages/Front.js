import React from "react";
import {useNavigate} from "react-router-dom";
import "./../styles/Front.css";


function Front(){
    const navigate=useNavigate();

    function frontPage(){
        navigate("/login");
    }

    function squadlist(){
        navigate("/squadlist");
    }

    return(
    <div className="front-container">
    <p className="head-text">Pick Your Role</p>
    <p className="blink">_</p>
    <div className="box-div">
    <div className="box" id="dispatch-box" onClick={frontPage}><p className="dispatch-text">Dispatch</p></div>
    <div className="box" id="squad-box" onClick={squadlist}><p className="squad-text">Squad</p></div>
    </div>
    </div>)
}

export default Front;