import logo from './logo.svg';
import './App.css';
import Box from './components/Box';
import { useState } from 'react';

function App() {

  const [boxParam, setBoxParam] = useState({nbrAttempts: 4, wordLenght : 4,});
  

  let renderBox = ()=>{
    console.log(document.getElementById('nbAttempts').value);
    setBoxParam({
      nbrAttempts: document.getElementById('nbAttempts').value,
      wordLenght : document.getElementById('wordLength').value,
    })
  }

  return (
    <div className="App">
      
      {/* add input field with number of attempts as label */}
      <label htmlFor="nbAttempts">Attempts</label>
      <input type="number" id="nbAttempts"/>

      <label htmlFor="nbAttempts">Word length</label>
      <input type="number" id="wordLength"/>

      <button onClick={()=>renderBox()}>OK</button>
      
      <Box nbrAttempts={boxParam.nbrAttempts} wordLenght={boxParam.wordLenght}  />
      
    </div>
  );
}

export default App;
