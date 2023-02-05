import './styles/App.css';
import Form from "./Form.js";
import Login from './Login.js';
import Squad from './Squad';
import ShowMap from "./ShowMap"
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/dispatch" exact element={<Form />}/>
        <Route path="/squad"  element={<Squad />} />
        <Route path="/"  element={<Login />} />
      </Routes>
    </BrowserRouter>
    <button className="logOutButton" onClick={()=>window.location.href="http://localhost:3000/"}>
        Log Out
      </button>
    </div>
  );
}

export default App;
