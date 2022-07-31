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
          alert("You lose! correct word was " + currentWord);
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
      <div className="socials">
        <a
          href="https://github.com/YahyaBdd/wordle-clone.git"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            style={{
              color: "whitesmoke",
              width: "2rem",
              height: "2rem",
              margin: "1rem",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-github"
            viewBox="0 0 16 16"
          >
            {" "}
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
              fill="white"
            ></path>{" "}
          </svg>
        </a>
        <a
          href="https://stackoverflow.com/users/17551643/yahyabdd"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            style={{
              color: "whitesmoke",
              width: "2rem",
              height: "2rem",
              margin: "1rem",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-stack-overflow"
            viewBox="0 0 16 16"
          >
            {" "}
            <path
              d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"
              fill="white"
            ></path>{" "}
            <path
              d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"
              fill="white"
            ></path>{" "}
          </svg>
        </a>
      </div>
      <div className="title-container">
        <h1>Wordle</h1>
      </div>
      <div className="controls">
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
      </div>
      {/* <p>currentWord = {currentWord}</p> */}
      <div className="game">
        <Box
          grid={grid.grid}
          currentWord={currentWord}
          verifieAtt={verifieAtt}
        />
      </div>
    </div>
  );
}

export default App;
