import logo from './logo.svg';
import './App.css';
import Box from './components/Box';
import { useState, useEffect, useRef } from 'react';
import words from './words.txt';


function renderDefaultGrid(rows, cols) {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(' ');
    }
    grid.push(row);
  }
  return grid;
  
}

function App() {

  //const [boxParam, setBoxParam] = useState({nbrAttempts: 4, wordLenght : 4,});
  // const [attempt, setAttempt] = useState({attempt: 0, lettre: 0});
  //const [currentWord,setCurrentWord] = useState('')
  const [grid, setGrid] = useState(
    {grid: renderDefaultGrid(4,4),
      row: 0,
      col: 0,
    }
    ) 

   useEffect(()=>{
    let handleKeyDown = (e) =>{
    
      let newGrid = grid.grid;
      console.log('1st newGrid ', newGrid);
  
      if(grid.col<grid.grid[0].length){
        console.log('if is true');
        console.log(`row ${grid.row} col ${grid.col}`);
        newGrid[grid.row][grid.col] = e.key;
        console.log('modified newGrid :', newGrid);
        setGrid({
            grid: newGrid,
            row: grid.row,
            col: grid.col+1,
        })
        //document.removeEventListener('keydown',handleKeyDown,true)
        
              
      } else {
        console.log('else is true');
        console.log(`row ${grid.row} col ${grid.col}`);
  
        newGrid[grid.row+1][0] = e.key;
  
        setGrid({
            grid: newGrid,
            row: grid.row+1,
            col: 1,
        })
      }
      
    }

    document.addEventListener('keydown',handleKeyDown,true)
    return ()=>{
      document.removeEventListener('keydown',handleKeyDown,true)
    }
   },[grid])

  //  useEffect(()=>{
  //   setCurrentWord(generateWordSet())
    
  //  },[setCurrentWord])

  let renderBox = ()=>{
    setGrid({
      grid: renderDefaultGrid(document.getElementById('nbAttempts').value,document.getElementById('wordLength').value),
      row: 0,
      col: 0,
    })
  }

  //let generateWordSet = async () => {
    
  //   let todaysWord;
  //   await fetch(words)
  //     .then((response) => response.text())
  //     .then((result) => {
  //       const wordArr = result.split("\n");
  //       todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
  //       //console.log(todaysWord)
  //     });
  //   return todaysWord ;
  // };

  

  return (
    
    <div className="App">
      
      {/* add input field with number of attempts as label */}
      <label htmlFor="nbAttempts">Attempts</label>
      <input type="number" id="nbAttempts"/>

      <label htmlFor="nbAttempts">Word length</label>
      <input type="number" id="wordLength"/>

      <button onClick={()=>renderBox()}>OK</button>
      

      <Box grid={grid.grid}/>
      
    </div>
  );
}


export default App;
