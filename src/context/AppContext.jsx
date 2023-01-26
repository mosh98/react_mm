import UserProivder from './UserContext'
const AppContext = ({children}) => {

    return(

        <UserProivder>
            {children}
        </UserProivder>
    )
}
export default AppContext
