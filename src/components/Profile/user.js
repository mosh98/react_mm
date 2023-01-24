import {createHeaders} from "./index";


/***
 * TODO:
 *      1.Check if the user exist []
 *      2. if not, Save username to the Translation API [DONE]
 *      3. else, display user
 *      4. Users that are already logged in may automatically redirected to the translation page. (cookies or some shit?)
 *      5.
 *      */
const apiURL = process.env.REACT_APP_API_URL

const checkForUser = async (username) => {


    try{

        const response = await fetch(`${apiURL}?username=${username}`)

        if(!response.ok){
            throw new Error('Something went wrong')
        }

        const data = await response.json()
        return [null, data] //return the response

    } catch (error){
        console.log(error)
        return [error.message, []] //return the data
    }
}

const createUser = async (username) => {

    //creating new ID
    const translations = []
    try {
        const  response = await fetch(apiURL,{
            method:'POST',
            headers:createHeaders(),
            body: JSON.stringify({
                username,
                translations
            })
        })

        if (!response.ok){
            throw new Error('Could not create user with username'+ username)
        }
        const data = await response.json()

        return [null,data]

    } catch (error){

        return [error.message(), [] ]
    }
}

export const loginUser = async (username) => {


    const [checkError, user] = await checkForUser(username)

    if (checkError !== null){
        return [checkError,null] //returning the error
    }

    if(user.length > 0) {
        return [null, user.pop()] //user.pop() is returning an object
    }



    /*const [createError, newUser] = await createUser(username)
    if(createError !== null){ return [null, newUser] // returning the new user }*/

    return await createUser(username) // lasier way to write the commented out code.
}