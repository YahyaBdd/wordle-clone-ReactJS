import "./App.css";
import Box from "./components/Box";
import { useState, useEffect } from "react";
import words from "./words.txt";

function renderGrid(rows, cols) {
  let grid = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(" ");
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
      wordList = wordArr;
    });
  return { wordList };
};

function App() {
  const [wordList, setwordList] = useState([]);
  const [currentWord, setCurrentWord] = useState("react");
  const [gameOver, setgameOver] = useState({ over: false, winner: false });
  const [verifieAtt, setverifieAtt] = useState(Array(6).fill(false));
  const [grid, setGrid] = useState({ grid: renderGrid(6, 5), row: 0, col: 0 });
  useEffect(() => {
    generateWordList().then(({ wordList }) => {
      setwordList(wordList);
    });
  }, []);
  useEffect(() => {
    if (gameOver.over) {
      if (gameOver.winner) {
        setTimeout(() => {
          alert("Congratulations, You Have Won");
          renderBox(6, 5);
        }, 750);
      } else {
        setTimeout(() => {
          alert("You lose! play again?");
          renderBox(6, 5);
        }, 750);
      }
    }
  }, [gameOver]);

  useEffect(() => {
    let handleKeyDown = (e) => {
      if (
        e.key.length === 1 &&
        e.key.match(/[a-z]/i) &&
        grid.col < currentWord.length
      ) {
        let newGrid = grid.grid;
        if (grid.col < grid.grid[0].length) {
          newGrid[grid.row][grid.col] = e.key;

          setGrid({
            grid: newGrid,
            row: grid.row,
            col: grid.col + 1,
          });
        }
      } else if (e.key === "Enter" && grid.col === currentWord.length) {
        if (currentWord === grid.grid[grid.row].join("")) {
          let newVerifieAtt = verifieAtt;
          newVerifieAtt[grid.row] = true;
          setverifieAtt(newVerifieAtt);
          setgameOver({ over: true, winner: true });
        } else if (grid.row === grid.grid.length - 1) {
          let newVerifieAtt = verifieAtt;
          newVerifieAtt[grid.row] = true;
          setverifieAtt(newVerifieAtt);
          setgameOver({ over: true, winner: false });
        } else {
          setverifieAtt((prev) => {
            prev[grid.row] = true;
            return prev;
          });
          setGrid({
            grid: grid.grid,
            row: grid.row + 1,
            col: 0,
          });
        }
      } else if (e.key === "Backspace") {
        if (grid.col > 0) {
          let newGrid = grid.grid;
          newGrid[grid.row][grid.col - 1] = " ";
          setGrid({
            grid: newGrid,
            row: grid.row,
            col: grid.col - 1,
          });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [grid]);

  let renderBox = (row, col) => {
    let rndmWord;
    let wrdList = wordList.filter((word) => {
      return word.length === col;
    });
    rndmWord = wrdList[Math.floor(Math.random() * wrdList.length)];
    setCurrentWord(rndmWord);
    setverifieAtt(Array(rndmWord.length).fill(false));
    setGrid({
      grid: renderGrid(row, col),
      row: 0,
      col: 0,
    });
  };

  return (
    <div className="App">
      <label htmlFor="nbAttempts">Attempts</label>
      <input type="number" id="nbAttempts" />

      <label htmlFor="nbAttempts">Word length</label>
      <input type="number" id="wordLength" />

      <button
        onClick={() => {
          let x = parseInt(document.getElementById("nbAttempts").value);
          let y = parseInt(document.getElementById("wordLength").value);
          renderBox(x, y);
        }}
      >
        OK
      </button>
      <p>currentWord = {currentWord}</p>

      <Box grid={grid.grid} currentWord={currentWord} verifieAtt={verifieAtt} />
    </div>
  );
}

export default App;
