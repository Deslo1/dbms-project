import React from 'react';
import axios from "axios";
import './styles/Form.css';

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
                description: ""
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
            console.log("Data : ");
            console.log(formData);
            axios.post("http://localhost:3001",formData).then((response) => {
                console.log('success');
            });
  }



    return(
        <div>
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
        <input type='submit' onClick={onSubmit}></input><br/><br/>
        </form>
        </div>
    );
}

export default Form;