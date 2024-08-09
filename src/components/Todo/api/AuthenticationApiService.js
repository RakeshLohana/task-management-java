import { apiClient } from "./ApiClient";


export const executeBasicAuthentication  =(token)=>apiClient.get(`/basicauth`,{
    headers:{
        Authorization:token
    }
});


export const executeJwtAuthenticationService  =(username,password)=>apiClient.post(`/authenticate`,{username,password});