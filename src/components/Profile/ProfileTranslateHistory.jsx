import {useState,useEffect} from 'react';
const apiURL = process.env.REACT_APP_API_URL

const ProfileTranslateHistory = () => {

    //get the user's translate history from the database
    const [history,setHistory] = useState([]);
    const username = JSON.parse(localStorage.getItem('translator')).id;

    useEffect(() => {
        const getHistory = async () => {
            const historyFromServer = await fetchHistory();
            setHistory(historyFromServer);
        }
        getHistory();
    },[]);

    const fetchHistory = async () => {
        try {

            const res = await fetch(`${apiURL}/translations?username=${username}`);
            const data = await res.json();
            console.log(data.translate)
            return data.translate;

        }catch (e){

            console.log(e);
            return e
        }

    }

    return(
        <>
            <h1>Profile Translate history</h1>
            <ul className="list-group">
                {history.map(translate => (
                    <li key={translate.id} className="list-group-item">
                        {translate.text} - {translate.language}
                    </li>
                ))}
            </ul>
        </>
    )
}
export default ProfileTranslateHistory;