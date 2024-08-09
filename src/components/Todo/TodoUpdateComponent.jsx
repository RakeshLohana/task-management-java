import {   useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import { useEffect, useState } from "react";
import { getOneTodobyIdd, updateTodoApi ,addTodoapi} from "./api/TodoApiService";
import { Formik,Form,Field,  ErrorMessage } from "formik";
import {  useNavigate } from "react-router-dom";





export default function TodoUpdateComponent(){




    const {id}=useParams();

    const authContext=useAuth();
    const username=authContext.username;

    const navigate=useNavigate();

      
    useEffect(
            ()=>   retrieveOneTodo(),
            [id]
    )

    const [description,setDescription]=useState(null);
    const [targetDate,setTargetDate]=useState(null);


    function retrieveOneTodo(){

        if(id!=-1){
            getOneTodobyIdd(username,id)
            .then((response)=>{
                setDescription(response.data.description);
                setTargetDate(response.data.targetDate);
    
            })
            .catch((error)=>console.log(error))

        }
 



    }


function onSubmitFunction(values){

    if(id!=-1){    
        const todo={
            id: id,
            username:username,
            description:values.description,
            targetDate:values.targetDate,
            done:false
            
    
        } 
     
    updateTodoApi(username,id,todo)
    .then((response)=>{
        console.log(response);
        navigate("/todos");

    })
    .catch((error)=>{
        console.log(error);

    })

    }else{
        const todo={
            username:username,
            description:values.description,
            targetDate:values.targetDate,
            done:false
            
    
        }

        addTodoapi(username,todo)
        .then((response)=>{
            console.log(response);
            navigate("/todos");
    
        })
        .catch((error)=>{
            console.log(error);
    
        })


    }


}


function validatio(values){
    let errors={
     

    }

    if(values.description.length<5){
         errors.description="Enter atleast 5 characters";
    }

    if(values.targetDate==null || values.targetDate===""){
        errors.targetDate="Enter a target date";
   }

    console.log(values);
    return errors;
}



    return(

        <>
     <h1>Enter Todo Details</h1>

       <Formik initialValues={{description,targetDate}}
       enableReinitialize={true}
       onSubmit={onSubmitFunction}
       validate={validatio}
       validateOnChange={false}
       validateOnBlur={false}
       >
        

        {
            (props)=>(
              

                <Form>
                      <ErrorMessage
                      component="div"
                      name="description"
                      className="alert alert-warning "
                      />


                      <ErrorMessage
                      component="div"
                      name="targetDate"
                      className="alert alert-warning "
                      />
                    
                
                    <fieldset className="form-group">
                        <label>Description</label>
                        <Field type="text" className="form-control" name="description" />

                        <label>Date</label>
                        <Field type="date" className="form-control" name="targetDate" />

                    </fieldset>
                    <div>
                    <button className="btn btn-success m-5" type="submit" >Save</button>


                    </div>

                </Form>

            )
        }


       </Formik>




        </>


        
   
    );




}