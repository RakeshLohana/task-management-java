import "./TodoApp.css";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";

import LogoutComponent from "./LogoutComponent";
import Welcome from "./WelcomeComponent";
import ErrorDetailComponent from "./ErrorDetailComponent";
import ListOFTodoComponents from "./ListTodoComponent";
import HeaderComponent from "./HeaderComponent";
import Login from "./LoginComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";
import TodoUpdateComponent from "./TodoUpdateComponent";



export default function TodoApp() {

  function AuthenticatedRoutes({children}){
    const authContext=useAuth();

    if(authContext.isAuthenticated){
      return children
    }
    return  <Navigate to="/"/>
  }


  return (
    <div>

      <AuthProvider>
      <BrowserRouter>
      <HeaderComponent/>

        <Routes>
          <Route path="/" element={<Login />}>  </Route>

          <Route path="/Login" element={<Login />}></Route> 


          <Route path="/Welcome/:username" element={

                           <AuthenticatedRoutes>
                              <Welcome />
                          </AuthenticatedRoutes>
          
          }></Route>


          <Route path="/todos" element={

                        <AuthenticatedRoutes>
                            <ListOFTodoComponents />
                      </AuthenticatedRoutes>
          
          }></Route>


          
           <Route path="/todo/:id" element={ 
           <AuthenticatedRoutes> 
            < TodoUpdateComponent/>
            </AuthenticatedRoutes>
          }></Route>



          <Route path="/logout" element={<AuthenticatedRoutes>  <LogoutComponent /> </AuthenticatedRoutes> }></Route>


          <Route path="*" element={<ErrorDetailComponent />}>  </Route>

        </Routes>
      </BrowserRouter>
      </AuthProvider>

    </div>
  );
}













  



