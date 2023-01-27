
import ProfileTranslateHistory from "./ProfileTranslateHistory";
import {useNavigate} from "react-router-dom";
//import withAuth from "../withAuth"; FIX THIS
const Profile = () => {



    return (
        <>
            <h4>Profile</h4>

            <ProfileTranslateHistory/>


        </>

)
}

export default Profile; //wrap Profile withAuth(Profile) to protect it
