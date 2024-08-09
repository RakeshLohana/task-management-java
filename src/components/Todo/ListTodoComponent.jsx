import { useState } from "react";
import { deleteTodoById, getTodosByUsername } from "./api/TodoApiService";
import { useEffect, } from "react";
import { useAuth } from "./security/AuthContext";
import {  useNavigate } from "react-router-dom";



export default function ListOFTodoComponents() {

    // const today=new Date();
    // const targetedDate=new Date(today.getFullYear()+12,today.getMonth(), today.getDate());


   


 const [todos, setTodos]=useState([]);
 const [message, setMessage]=useState(null);
 const navigate = useNavigate();


 const authContext=useAuth();
 const username=authContext.username;


 useEffect(
    ()=>refreshTodos(),[]
 )

    function refreshTodos(){
        getTodosByUsername(username)
        .then(response =>{
            console.log(response)
            setTodos(response.data)

    })
        .catch((error)=>console.log(error))
        .finally(()=>console.log("cleanup"))
    }
    




function deleteTodo(id){

    deleteTodoById(username,id)
    .then(
        ()=>{
            refreshTodos();
            setMessage(`Delete of todo with id: ${id} is successfull`)

        }

    )
    .catch((error) =>{
        console.log(error);

    })
    .finally(()=>console.log("cleanup"));





}


   function updateTodo(id){
    console.log("Update todo calleds")
    navigate(`/todo/${id}`);
}



function addNewTodo(){
    navigate(`/todo/${-1}`);



}



        
    //  map returns a new array with the results of the function, while forEach does not return anything and only modifies the original array.
    
        // todos.map(element=>console.log(element.id))
    
        // todos.forEach( element =>console.log(element))
    
    
    
    
        return (
          <div className="container">

      
            <h1>
             Things You Want To Do! 
            </h1>
        {  message&&  <div className="alert alert-warning" >{message}</div>}
        
            <div>
                <table className="table">
    
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>IsDone</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>


    
                            
                        </tr>
                    </thead>
    
                    <tbody>
    
                        {todos.map(todo =>  <tr key={todo.id}>
                            <td>{todo.description}</td>
                            <td>{todo.done.toString()}</td>
                            {/* <td>{todo.targetDate.toDateString()}</td> */}
                            <td>{todo.targetDate.toString()}</td>
                            <td>
                                <button className="btn btn-warning"  onClick={()=>deleteTodo(todo.id)}>Delete</button>
                            </td>
                            <td>
                                <button className="btn btn-success"  onClick={()=>updateTodo(todo.id)}>Update</button>
                            </td>

    
    
                        </tr>
    ) } 
                      
                    </tbody>
                </table>
                <button className="btn btn-success m-5"   onClick={addNewTodo}    >Add new task</button>

            </div>
          </div>
        );
      }