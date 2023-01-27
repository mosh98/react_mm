import LoginForm  from "./LoginForm";

const Login = () => {
    // this function is called when the app is loaded
    // it checks if the user is already logged in
    // if so, it redirects to the translation page

    return (
        <div className="bg">
            <img src="/LostInTranslation_Resources/Splash.svg" className="left-image" alt="image" />
            <img src="/LostInTranslation_Resources/Logo.png" className="left-image " alt="image" />
            <>
                <h1 className="title-header">Lost in Translation</h1>
                <h3 className="subtitle-header">Get Started</h3>
                <LoginForm/>
            </>
        </div>

    );
}
export default Login