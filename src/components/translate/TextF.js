import React, { useState,useEffect } from 'react';
import Showcase from "./showcase";
import {createHeaders} from "../Profile";
import {useNavigate} from "react-router-dom";
import {storageRemove} from "../../utils/storage";

import {set} from "react-hook-form";
import {useUser} from "../../context/UserContext";
const apiURL = process.env.REACT_APP_API_URL

function TextField() {

    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState(''); //i dont use this anymore
    const [inputList, setInputList] = useState([]); //translation list
    const {user,setUser} = useUser()

    //let old_input = []
    const navigate = useNavigate()

    //if logout is press, remove user from storage
    function handleClickLogout(){
        //localStorage.removeItem('translator')
        storageRemove('translator')
        setUser(null)
        navigate('/')

    }


    function handleClickProfile(){
        //navigate to profile
        navigate('/Profile')
        //setUser(null)

    }

    /*async function updateUserTranslations(val) {

        if (!val) {
            throw new Error("val is empty or not valid")
        }
        let userId = JSON.parse(localStorage.getItem('translator')).id

        try {
            const response = await fetch(`${apiURL}/${userId}`, {
                method: 'PATCH',
                headers: createHeaders(),
                body: JSON.stringify({
                    translations: [...inputList, val]
                })
            });
            if (!response.ok) {
                throw new Error(`Could not update translations history, status: ${response.status}`);
            }
            const updatedUser = await response.json();
            setInputList([...inputList, val]);
            return updatedUser.translations;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }*/
    async function updateUserTranslations(val) {

        if (!val) {
            throw new Error("val is empty or not valid")
        }
        let userId = JSON.parse(localStorage.getItem('translator')).id

        try {
            const response = await fetch(`${apiURL}/${userId}`, {
                method: 'PATCH',
                headers: createHeaders(),
                body: JSON.stringify({
                    translations: [...inputList, val]
                })
            });
            if (!response.ok) {
                throw new Error(`Could not update translations history, status: ${response.status}`);
            }
            const updatedUser = await response.json();
            setInputList([...inputList, val]);

            return updatedUser.translations;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }



    function handleClick() {
        setInputValue(value);


        updateUserTranslations(value)

    }
    return (
        <div className="bg-transparent mx-auto my-auto d-grid place-items-center col-7">

            <>
                <div class="container bg" style={{margin:"1em"}}>
                    <button type="button" class="btn btn-dark" onClick={handleClickLogout}>Log out</button>

                    <button onClick={handleClickProfile} type="button" className="btn btn-dark">Profile Page</button>
                </div>

            </>

            <>
                <div class="container bg-transparent mx-auto my-auto d-grid place-items-center col-7 " style={{margin:"1em", width:600}}>

                <input
                    type="text"
                    value={value} class="form-control stripe-connect-border" placeholder={"Enter a phrase to translate"}
                    onChange={(e) => setValue(e.target.value) } />

                    <div className={"card bg-transparent "} >


                        {inputValue ? <Showcase string={inputValue}/> : null}
                        <button onClick={handleClick} type="button" className="btn btn-dark">Translate</button>

                    </div>

                </div>
            </>

        </div>

    );
}
export default TextField;



