import {useState,useEffect} from 'react';
const apiURL = process.env.REACT_APP_API_URL

const ProfileTranslateHistory = () => {

    //get the user's translate history from the database
    const [history,setHistory] = useState([]);
    const username = JSON.parse(localStorage.getItem('translator')).username;

    useEffect(() => {
        const getHistory = async () => {
            const historyFromServer = await fetchHistory();
            setHistory(historyFromServer);
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
            return data[0].translations;

        }catch (e){

            console.log(e);
            return e
        }

    }

    /*
    *  <h1>Profile Translate history</h1>
            <ul className="list-group">
                {history.map(translate => (
                    <li key={translate.id} className="list-group-item">
                        {translate.text} - {translate.language}
                    </li>
                ))}
            </ul>
    * **/

    return(
        <>
            <h1>Profile Translate history</h1>
            <ul className="list-group">
                {history.map(translate => (
                    <li  className="list-group-item">
                         {translate}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default ProfileTranslateHistory;