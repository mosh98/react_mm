import {useForm} from "react-hook-form";
import {loginUser} from "../Profile/user";

import {useState, useEffect} from "react";
import {storageSave} from "../../utils/storage";
import {useNavigate} from 'react-router-dom';
import {useUser} from "../../context/UserContext";

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
    const {user, setUser} = useUser()
    const navigate = useNavigate()

    //Local State
  const [loading,setLoading] = useState(false)
  const [apiError,setApiError] = useState(null)


    //side effect
    useEffect(() => {
        if (user !== null) {
            navigate('/TextF')
        }}, [user])

    //Event handler
    const onSubmit = async ({username}) => {

        setLoading(true)

        const [error, userResponse] = await loginUser(username) //data is username ofc

        if (error !== null){
            setApiError(error)
        }
        if(userResponse !== null){
            //you typically store a auth token of some kind
            storageSave('translator',userResponse)
            setUser(userResponse)
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



        <div className="card w-50 mx-auto my-auto d-grid place-items-center bg-transparent" style={{margin: "2em", border: "3px solid grey"}}>
            <div className="card-body bg-transparent" >

                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <label htmlFor="username">Username:</label>
                        <input type="text" placeholder="johndoe"
                               className="form-control bg-transparent input-border" style={{ marginBottom:"1em", border: "3px solid grey"}} {...register("username", usernameConfig)} />
                        {errorMessage()}
                        {errorMessage()}
                    </fieldset>
                    <button type="submit" disabled={loading} className="btn btn-dark">Continue</button>
                    {loading && <p>Logging in...</p>}
                    {apiError && <p>{apiError}</p>}
                </form>
            </div>
        </div>

    );
}


export default LoginForm