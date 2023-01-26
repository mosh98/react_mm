//Context -> exposing state
//provider -> managing state

import {createContext, useContext, useState} from "react";

const UserContext = createContext()

export const useUser = () => {

    //this function is a custom hook
    //it returns the value of the context
    return useContext(UserContext)
}

 const UserProvider = ({children}) => {
    //this function is a provider
    //it manages the state of the context
    const [user, setUser] = useState(null)
    const state =  {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider


