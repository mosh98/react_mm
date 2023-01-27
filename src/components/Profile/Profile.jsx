
import ProfileTranslateHistory from "./ProfileTranslateHistory";
import {useNavigate} from "react-router-dom";
const Profile = () => {
// profile page



    return (
        <>
            <h4>Profile</h4>

            <ProfileTranslateHistory/>


        </>

)
}

export default Profile; //wrap Profile withAuth(Profile) to protect it
