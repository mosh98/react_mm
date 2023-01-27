import {useState,useEffect} from 'react';
import {createHeaders} from "./index";
import {useNavigate} from "react-router-dom";
import {storageRemove} from "../../utils/storage";
import {useUser} from "../../context/UserContext";
const apiURL = process.env.REACT_APP_API_URL

/**
 * Shows the profile history and other button actions
 *
 * */

const ProfileTranslateHistory = () => {

    //get the user's translate history from the database
    const {user,setUser} = useUser()
    const [history,setHistory] = useState([]);
    const username = JSON.parse(localStorage.getItem('translator')).username;
    const userIdX2 = JSON.parse(localStorage.getItem('translator')).id


    const navigate = useNavigate();
    const goBack = () => {
        // go back to the login page
        console.log("go back: ",history);
        navigate(-1);
    }

    useEffect(() => {

        const getHistory = async () => {
            //only show the last 10 translations
            const historyFromServer = await fetchHistory();

            setHistory(historyFromServer.slice(0,10));
            //setHistory(historyFromServer);
        }
        getHistory();
    },[]);


    //make a fetch history function
    const fetchHistory = async () => {
        //get the translation list from api/database
        try {
            const response = await fetch(`${apiURL}?username=${username}`)
            if(!response.ok){
                throw new Error("Could not fetch the data for that resource");
            }
            const data = await response.json();
            setUser(data[0])

            return data[0].translations.reverse();

        }catch (e){
            console.log(e);
            return e
        }
    }

    const clearHistoryFromAPI = async () => {
        //clear the history from the API basically remove
        let userId = JSON.parse(localStorage.getItem('translator')).id

        //make a patch request to the API on translations with EMPTY list
        try {
            const response = await fetch(`${apiURL}/${userId}`, {
                method: 'PATCH',
                headers: createHeaders(),
                body: JSON.stringify({translations: []})
            })
            if (!response.ok) {
                throw new Error("Could not fetch the data for that resource");
            }
            const data = await response.json();
            setUser(data)
            return data;

        } catch (e) {
            console.log(e);
            return e
        }
    }

    //make a clear history onclick function that removes the rendered history from the page
    const clearHistory = () => {
        //clear the history from the page
        setHistory([]);

        //clear the history from the local storage
        //storageRemove('translator'); //clear the translator from the local storage
        localStorage.setItem('translator',JSON.stringify({id:userIdX2,username:username,translations:[]}));

        //also clear history from the API
        clearHistoryFromAPI();
    }
    return(
        <div className="card w-50 mx-auto my-auto d-grid place-items-center bg-transparent .col-6">
            <div className="card-body w-50 bg-transparent mx-auto my-auto d-grid place-items-center col-7 " >
                <h5>{JSON.parse(localStorage.getItem('translator')).username}'s Translate history</h5>
                <ul className="list-group bg-transparent stripe-connect-border">
                    { history.map(translate => (
                        <li  className="list-group-item bg-transparent" style={{border:"7em"}}>
                            {translate}
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={clearHistory} className="btn btn-dark">Clear History</button>
                <button onClick={goBack} type="button" className="btn btn-dark stripe-connect-border button-hover">Go
                    Back
                </button>
            </div>
        </div>

    )
}
export default ProfileTranslateHistory;