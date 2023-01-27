import {createHeaders} from "../Profile";


/**
 * What is this class doing?
 * 1. Check if user exists in the database
 * 2. If user exists, return the user
 * 3. If user does not exist, create a new user
 * 4. Return the new user
 * @param username
 * @returns {Promise<*>}
 * */
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
    //create a new user

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
    //check if user exists
    //if user exists, return the user


    const [checkError, user] = await checkForUser(username)

    if (checkError !== null){
        return [checkError,null] //returning the error
    }

    if(user.length > 0) {
        return [null, user.pop()] //user.pop() is returning an object
    }




    return await createUser(username) // lasier way to write the commented out code.
}
