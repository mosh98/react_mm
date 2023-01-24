import {useForm} from "react-hook-form";
import {loginUser} from "../Profile/user";

import {useState, useEffect} from "react";
import {storageSave} from "../../utils/storage";
import {useHistory} from 'react-router-dom';

const usernameConfig = {
    required: true,
    minLength: 2,
}
const LoginForm = () => {

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    //Local State
  const [loading,setLoading] = useState(false)
  const [apiError,setApiError] = useState(null)

    /*useEffect(()) => {
      if(user){
      }
    }*/

    //Event handler
    const onSubmit = async ({username}) => {

        setLoading(true)

        const [error, user] = await loginUser(username) //data is username ofc

        if (error !== null){
            setApiError(error)
        }
        if(user !== null){
            //you typically store a auth token of some kind
            storageSave('translator',username)
        }

        setLoading(false)

    };

    //Render Functions
    const errorMessage = () => {

        if (!errors.username) {
            return null
        }
            if (errors.username.type === "required") {
                return <span>Username is required</span>
            }
            if (errors.username.type === "minLength") {
                return <span>Username must be at least 2 characters</span>
            }
    }

    return (
        <>
            <h2> Write a Username </h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <fieldset>
                    <label htmlFor="username">Username:</label>
                    <input type="text"
                           placeholder="johndoe"
                           {...register("username", usernameConfig)} />
                    {errorMessage()}
                    {errorMessage()}
                </fieldset>

                <button type="submit" disabled={loading}> Continue </button>

                {loading && <p>Logging in...</p>}
                {apiError && <p>{apiError}</p>}

            </form>

        </>
    );
}


export default LoginForm