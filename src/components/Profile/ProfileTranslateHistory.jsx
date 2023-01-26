import {useState,useEffect} from 'react';
const apiURL = process.env.REACT_APP_API_URL

const ProfileTranslateHistory = () => {

    //get the user's translate history from the database
    const [history,setHistory] = useState([]);
    const username = JSON.parse(localStorage.getItem('translator')).username;
    //a state from deleting history


    useEffect(() => {
        const getHistory = async () => {
            const historyFromServer = await fetchHistory();

            //setHistory(historyFromServer.slice(0,10));
            setHistory(historyFromServer.slice(0,10));
        }
        getHistory();
    },[]);

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
    //make a clear history onclick function that removes the rendered history but does not clear database
    const clearHistory = () => {
        setHistory([]);

    }


    return(
        <>
            <h1>Profile Translate history</h1>
            <ul className="list-group">
                { history.map(translate => (
                    <li  className="list-group-item">
                         {translate}
                    </li>
                ))}
            </ul>
            <button type="button" onClick={clearHistory} className="btn btn-dark">Clear History</button>
        </>
    )
}
export default ProfileTranslateHistory;