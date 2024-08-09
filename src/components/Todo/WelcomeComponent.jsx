import { useState } from "react";
import {  useParams,Link } from "react-router-dom";
import {  retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService";
import { useAuth } from "./security/AuthContext";



export default function Welcome() {

    const params =useParams();

    const[message,setMessage]=useState(null);

    const authContext=useAuth();


    function CallingRestApi(){
      // axios.get("http://localhost:8080/hello-world")
      // .then((response)=>SuccessResponse(response))
      // .catch((error)=>ErrorResponse(error))
      // .finally(()=>console.log("cleanup"))


      // retrieveHelloWorldBean()
      // .then((response)=>successResponse(response))
      // .catch((error)=>errorResponse(error))
      // .finally(()=>console.log("cleanup"))

    retrieveHelloWorldPathVariable("Rakesh",authContext.token)
    .then((response)=>successResponse(response))
    .catch((error)=>errorResponse(error))
    .finally(()=>console.log("cleanup"));

      

    }

function successResponse(response){
  console.log(response);
  setMessage(response.data.message)

}

function errorResponse(error){
  console.log(error);
}

  return (
  <div className="welcomeComponent">
    <h1>
        Welcome {params.username} 
    </h1>
    <div>
    Manage your todos - <Link to="/todos" > Go here </Link>

    </div>
    <div>
      <button className="btn btn-success m-3" onClick={CallingRestApi}>
        Call Hello World API
      </button>
    </div>
    {/* <div>
      <button className="btn btn-outline-primary m-2" onClick={CallingRestApi}>Call Hello World Path Variable</button>
    </div> */}
   
  <div className="text-info">{message}</div>




  </div>
  );

}