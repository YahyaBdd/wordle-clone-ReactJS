import logo from './logo.svg';
import './App.css';
import Box from './components/Box';
import { useState, useEffect, useRef } from 'react';
import words from './words.txt';


function renderGrid(rows, cols) {
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

const generateWordList = async () => {
  let wordList;
  await fetch(words)
    .then((response) => response.text())
    .then((result) => {
      const wordArr = result.split("\n");
      //todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordList = wordArr;
    });
  return { wordList };
};

function App() {
  //console.log('App started');
  const [wordList, setwordList] = useState([]);
  console.log(wordList)
  const [currentWord,setCurrentWord] = useState("");
  console.log(`current word is ${currentWord}`);
  const [grid, setGrid] = useState(
    {grid: renderGrid(6,5),
      row: 0,
      col: 0,
    }
    ) 

   useEffect(()=>{
    let handleKeyDown = (e) =>{
    
      let newGrid = grid.grid;  
      if(grid.col<grid.grid[0].length){
        
        newGrid[grid.row][grid.col] = e.key;
        
        setGrid({
            grid: newGrid,
            row: grid.row,
            col: grid.col+1,
        })        
              
      } else {  
        newGrid[grid.row+1][0] = e.key;
  
        setGrid({
            grid: newGrid,
            row: grid.row+1,
            col: 1,
        })
      }
      
    }
    console.log('useEffect for click handelling called');
    document.addEventListener('keydown',handleKeyDown,true)
    return ()=>{
      document.removeEventListener('keydown',handleKeyDown,true)
    }
   },[grid])
   useEffect(()=>{
    console.log('useEffect for wordList called');
    generateWordList().then(({wordList})=>{
      
      setwordList(wordList);
      setCurrentWord("react");
      
    }
    )
  },[])
    

  let renderBox = ()=>{
    let rndmWord;
    let wrdLength = parseInt(document.getElementById("wordLength").value);
    let wrdList = wordList.filter((word)=>{
      return word.length === wrdLength
    });
    rndmWord = wrdList[Math.floor(Math.random() * wrdList.length)];
    setCurrentWord(rndmWord);
    
     setGrid({
       grid: renderGrid(document.getElementById('nbAttempts').value,document.getElementById('wordLength').value),
       row: 0,
       col: 0,
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
      <p>currentWord = {currentWord}</p> 
      

      <Box grid={grid.grid} currentWord={currentWord}/>
      
    </div>
  );
}


export default App;
