import {  useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useAuth } from "./security/AuthContext";


export default function Login() {



  
    const [username, setUsername] = useState("in28minutes");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const navigate = useNavigate();


    const authContext=useAuth();
  
    function handleUsernameChange(event) {
      setUsername(event.target.value);
    }
  
    function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  
    async function handleSubmit() {
      if (await authContext.login(username,password)) {

        setErrorMessage(false);
        navigate(`/Welcome/${username}`);
  
  
      } else {
        setErrorMessage(true);
      }
    }
  

  
    function ErrorMessageComponent() {
      if (errorMessage) {
        return (
          <div className="showErrorMessage">
            Authenticated Failed.Please check your credentials
          </div>
        );
      }
  
      return null;
    }
  
    return (
      <div className="Login">
        <ErrorMessageComponent />
        {/* Below are shortcut ways to showErrorMessage and showSuccessMessage */}
        {/* {successMessage && <div  className='showSuccessMessage'>Authenticated Successfully</div>}
              {errorMessage && <div  className='showErrorMessage'>Authenticated Failed.Please check your credentials</div>} */}
  
        <div className="LoginForm">
            <h1>Time to login!!</h1>
            
          <div>
            <label>Username </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            ></input>
          </div>
  

          <div>
            <label> Password </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            ></input>
          </div>
  
          <button type="button" name="Login" onClick={handleSubmit}> Login
          </button>
        </div>
      </div>
    );
  }