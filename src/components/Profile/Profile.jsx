
import ProfileTranslateHistory from "./ProfileTranslateHistory";
import {useNavigate} from "react-router-dom";
//import withAuth from "../withAuth"; FIX THIS
const Profile = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <>
            <h1>Profile</h1>

            <ProfileTranslateHistory/>
            <button onClick={goBack} type="button" class="btn btn-dark">Go Back</button>
            <button  type="button" class="btn btn-dark">Clear History</button>
        </>

)
}

export default Profile; //wrap Profile withAuth(Profile) to protect it
