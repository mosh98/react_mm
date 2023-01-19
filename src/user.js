
const apiURL = process.env.REACT_APP_API_URL
export const checkForUser = async (username) => {

    try{

        const response = await fetch(`${apiURL}?username=${username}`)

        if(!response.ok){

            throw new Error('Something went wrong')

        }

        const data = await response.json()

    } catch (error){

        console.log(error)

        return [error.message, []]
    }
}

export const createUser = async () => {

    try {

        const  response = await fetch(apiURL)
        if (!response.ok){
            throw new Error('Could not create user with username'+ username)
        }

    } catch (error){

        return [error.message(), [] ]

    }

}

export const loginUser = async (username) => {

    const [checkError, user] = await checkForUser(username)

    if(user.length > 0) {
        return [null, user.pop()]
    }

    const [createError, newUser] = await createUser(username)
}