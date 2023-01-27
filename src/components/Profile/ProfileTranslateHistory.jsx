import {useState,useEffect} from 'react';
import {createHeaders} from "./index";
const apiURL = process.env.REACT_APP_API_URL

const ProfileTranslateHistory = () => {

    //get the user's translate history from the database
    const [history,setHistory] = useState([]);
    const username = JSON.parse(localStorage.getItem('translator')).username;



    useEffect(() => {

        const getHistory = async () => {
            const historyFromServer = await fetchHistory();

            //setHistory(historyFromServer.slice(0,10));
            //historyFromServer is already reversed from the fetchHistory function
            //setHistory(historyFromServer.slice(0,10));
            setHistory(historyFromServer.slice(0,10));
        }
        getHistory();
    },[]);

    //make a fetch history function
    const fetchHistory = async () => {
        try {

            const response = await fetch(`${apiURL}?username=${username}`)

            if(!response.ok){
                throw new Error("Could not fetch the data for that resource");
            }

            const data = await response.json();
            return data[0].translations.reverse();

        }catch (e){
            console.log(e);
            return e
        }
    }

    const clearHistoryFromAPI = async () => {
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
            return data;

        } catch (e) {
            console.log(e);
            return e
        }
    }

    //make a clear history onclick function that removes the rendered history from the page
    const clearHistory = () => {

        setHistory([]);
        //also clear history from the API
        clearHistoryFromAPI();
    }
    return(
        <div className="card w-50 mx-auto my-auto d-grid place-items-center bg-transparent .col-6">
            <div className="card-body w-50 bg-transparent " >
                <h1>Profile Translate history</h1>
                <ul className="list-group bg-transparent">
                    { history.map(translate => (
                        <li  className="list-group-item bg-transparent">
                            {translate}
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={clearHistory} className="btn btn-dark">Clear History</button>
            </div>
        </div>

    )
}
export default ProfileTranslateHistory;