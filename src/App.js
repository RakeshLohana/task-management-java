import './App.css';
import TodoApp from './components/Todo/TodoApp';

function App() {
  return (
    <div className="App">
        {/* <Counter/> */}
        <TodoApp></TodoApp>
    </div>
  );
}



//This is old method for storing 
//{property1: 'Value1', property2: 'Value2'}
// function PlayingWithProps(Properties){
  // function PlayingWithProps({property1,propert2})
//   console.log( Properties.property1);
//   console.log( Properties .property2)
//   return(
//     <div>
//     props
//     </div>
    
//   )
// }

export default App;
