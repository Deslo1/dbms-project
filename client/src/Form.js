import React from 'react';
import './styles/Form.css';

function Form(){
    const types=["Domestic Abuse","Armed Assault","Public Nuisance"];
    const gettypes=types.map(type=>{
        return(<option value={type}>{type}</option>)});
    return(
        <div>
        <form className='form'>
        <label>Name</label><br/>
        <input type="text" ></input><br/><br/>
        <label>Jurisdiction</label><br/>
        <input type="text" ></input><br/><br/><br/>
        <select name="type" id="type">
        <option>Type</option>
        {gettypes}
        </select><br/><br/>
        <label>Number</label><br/>
        <input type="text" ></input><br/><br/>
        <label>Description</label><br/>
        <textarea cols="50" rows="10"></textarea><br/>
        <input type='submit'></input>
        </form>
        </div>
    );
}

export default Form;