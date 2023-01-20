import {useForm} from "react-hook-form";
import {loginUser} from "../Profile/api/user/user";

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
    const onSubmit = async ({username}) => {
        //console.log(data);
        //make a most request to the api: https://bling-bling.herokuapp.com/
        const [error, user] = await loginUser(username) //data is username ofc
        console.log('Error:',error)
        console.log('User:',user)

    };

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
                <button type="submit"> Continue </button>
            </form>

        </>
    );
}


export default LoginForm