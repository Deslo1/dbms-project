import './styles/App.css';
import Form from "./pages/Form.js";
import Front from "./pages/Front.js";
import Login from './pages/Login.js';
import Squad from './pages/Squad';
import SquadList from './pages/SquadList';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/dispatch" exact element={<Form />}/>
        <Route path="/squad"  element={<Squad />} />
        <Route path="/"  element={<Front />} />
        <Route path="/login" element={<Login/>}/>
         <Route path="/squadlist" element={<SquadList/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
