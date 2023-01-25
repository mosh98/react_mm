import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route,useNavigate} from "react-router-dom";
import Login from "./components/login/login";
import TextF from "./components/translate/TextF";


function App( ) {
//its a comment
    // const navigate = useNavigate();
    //<Route path="/" element={<Login/>}/>
    return (

    <BrowserRouter>
      <div className="App">
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/TextF" element={<TextF/>}/>


      </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
