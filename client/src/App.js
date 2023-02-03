import './styles/App.css';
import Form from "./Form.js";
import Login from './Login.js';
import Squad from './Squad';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    </div>
  );
}

export default App;
