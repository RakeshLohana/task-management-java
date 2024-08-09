import { useState } from "react"
import "./Counter.css"
import  CounterButton  from "./CounterButton";


export default function Counter(){
  
    const [count,setCount]=useState(0);


    
    function incrementCounterParentFunction(by){
        setCount(count+by);
    }

    function decrementCounterParentFunction(by){

        if(count>0&& count>=by){
            setCount(count-by);

        }
    }

    function resetButton(){

            setCount(0);

    
    }


    return(
        <>
          <CounterButton by={1} incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction} />
          <CounterButton by={2}  incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
          <CounterButton by={5}  incrementMethod={incrementCounterParentFunction} decrementMethod={decrementCounterParentFunction}/>
          <span  className="totalCount">{count}</span>
          <div>
          <button className="resetButton"  onClick={resetButton}>Reset</button>
         </div>          

        </>

    )
}


