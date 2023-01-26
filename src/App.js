import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route,useNavigate} from "react-router-dom";
import Login from "./components/login/login";
import TextF from "./components/translate/TextF";
import Profile from "./components/Profile/Profile";
import ProfileTranslateHistory from "./components/Profile/ProfileTranslateHistory";


function App( ) {
//its a comment
    // const navigate = useNavigate();
    //<Route path="/" element={<Login/>}/>
    return (

    <BrowserRouter>
      <div className="App stripe-connect-background ">
      <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/TextF" element={<TextF/>}/>
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/ProfileTranslateHistory" element={<ProfileTranslateHistory/>}/>
      </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
