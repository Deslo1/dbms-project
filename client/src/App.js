import './styles/App.css';
import Form from "./pages/Form.js";
import Login from './pages/Login.js';
import Squad from './pages/Squad';
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
    </div>
  );
}

export default App;
