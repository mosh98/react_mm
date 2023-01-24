import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Login from "./components/login/login";

function App( ) {

    return (

    <BrowserRouter>
      <div className="App">
 // const navigate = useNavigate();
          //
      <Routes>
        <Route path="/" element={<Login/>}/>

      </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
