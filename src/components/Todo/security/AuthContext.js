import { createContext, useContext, useState } from "react";
import {  executeJwtAuthenticationService } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";
// 1: Create a Context


 export const AuthContext=createContext();

 export const useAuth=()=>useContext(AuthContext)


//2:  Share the created context with other components
export default function AuthProvider({children}){

    //3: Put some state in the context
    const[isAuthenticated, setAuthenticated]=useState(false);
    const[username, setUsername]=useState(null);
    const[token, setToken]=useState(null);



    // async function login(username,password){


    //     const basicToken ="Basic "+window.btoa(username+":"+password)

    //     try{

    //         const response= await  executeBasicAuthentication(basicToken)
    //         console.log(response);

    //         if(response.status===200){
    //             setAuthenticated(true);
    //             setToken(basicToken)
    //             setUsername(username);
    //             apiClient.interceptors.request.use(
    //                 (config)=>{
    //                     console.log("intercepting and adding a token")
    //                     config.headers.Authorization=basicToken;
    //                     return config
    //                 }
    //             )


    //             return true
    //         }
    //         else{
    //           logout();
    
    //             return false
    //         }

    //     }catch(error){
    //         console.log(error)
    //         logout();
    //         return false;

    //     }

  



    // }





    async function login(username,password){



        try{

            const response= await  executeJwtAuthenticationService(username,password)
           

            if(response.status===200){
                const basicToken="Bearer "+response.data.token;
                console.log(response.data.token);
                setAuthenticated(true);
                setToken(basicToken)
                setUsername(username);
                apiClient.interceptors.request.use(
                    (config)=>{
                        console.log("intercepting and adding a token")
                        config.headers.Authorization=basicToken;
                        return config
                    }
                )


                return true
            }
            else{
              logout();
    
                return false
            }

        }catch(error){
            console.log(error)
            logout();
            return false;

        }

  



    }


    function logout(){
        setAuthenticated(false);
        setToken(null);
        setUsername(null);
    }


    

    

    return (

        <AuthContext.Provider  value={{ isAuthenticated, token, login,logout,username}}>
            {children}
        </AuthContext.Provider>
    );



}

