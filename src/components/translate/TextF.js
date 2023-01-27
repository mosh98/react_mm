import React, { useState,useEffect } from 'react';
import Showcase from "./showcase";
import {createHeaders} from "../Profile";
import {useNavigate} from "react-router-dom";
import {storageRemove} from "../../utils/storage";

import {set} from "react-hook-form";
import {useUser} from "../../context/UserContext";
const apiURL = process.env.REACT_APP_API_URL

function TextField() {
    //defining different states and users
    //
    const {user,setUser} = useUser()
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState(''); //i dont use this anymore
    const [inputList, setInputList] = useState(user.translations); //translation list





    //fetch user translations from API
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

    }


    async function updateUserTranslations(val) {
        //check if val is empty
        //if not, then update user translation list.


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


            //upadate local storage translations
            let oldUser = JSON.parse(localStorage.getItem('translator'))
            oldUser.translations = [...inputList, val]
            localStorage.setItem('translator', JSON.stringify(oldUser))

            //update user context
            setUser(updatedUser)


            return updatedUser.translations;

        } catch (error) {
            console.error(error);
            throw error;
        }

    }
    function cleanString(str){
        //make a function that takes in a string and returns a string
        //but it removes every character that is not a english letter
        let newStr = "";
        for(let i = 0; i<str.length; i++){
            //checking if the character is a letter
            if(str[i].match(/[a-zA-Z]/)){
                newStr += str[i];
            }
        }
        return newStr;
    }




    function handleClick() {
        //when the button is clicked, update the translation list
        //and update the user translation list (i.e api call)

        setInputValue(cleanString(value));


        updateUserTranslations(value)

    }
    return (
        <div className="bg-transparent mx-auto my-auto d-grid place-items-center col-7">
            {console.log("Redering translate page:",inputList)}
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



