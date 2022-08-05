import "./App.css";
import Box from "./components/Box";
import { useState, useEffect } from "react";
import { renderGrid, generateWordList } from "./utilityFunctions";

function App() {
  const [wordList, setWordList] = useState([]);
  const [currentWord, setCurrentWord] = useState("react");
  const [gameOver, setGameOver] = useState({ over: false, winner: false });
  const [verifieAtt, setVerifieAtt] = useState(Array(6).fill(false));
  const [grid, setGrid] = useState({ grid: renderGrid(6, 5), row: 0, col: 0 });

  useEffect(() => {
    generateWordList().then(({ wordList }) => {
      setWordList(wordList);
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
    const handleKeyDown = (e) => {
      if (
        e.key.length === 1 &&
        e.key.match(/[a-z]/i) &&
        grid.col < currentWord.length
      ) {
        let newGrid = grid.grid;
        if (grid.col < grid.grid[0].length) {
          nextLettre(e, newGrid);
        }
      } else if (e.key === "Enter" && grid.col === currentWord.length) {
        if (currentWord === grid.grid[grid.row].join("")) {
          gameWon(true);
        } else if (grid.row === grid.grid.length - 1) {
          gameWon(false);
        } else {
          nextAttempt();
        }
      } else if (e.key === "Backspace") {
        deleteChar();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [grid]);

  const nextAttempt = () => {
    setVerifieAtt((prev) => {
      prev[grid.row] = true;
      return prev;
    });
    setGrid({
      grid: grid.grid,
      row: grid.row + 1,
      col: 0,
    });
  };

  const nextLettre = (e, newGrid) => {
    newGrid[grid.row][grid.col] = e.key;
    setGrid({
      grid: newGrid,
      row: grid.row,
      col: grid.col + 1,
    });
  };

  const gameWon = (won) => {
    const newVerifieAtt = verifieAtt;
    newVerifieAtt[grid.row] = true;
    setVerifieAtt(newVerifieAtt);
    if (won) {
      setGameOver({ over: true, winner: true });
    } else {
      setGameOver({ over: true, winner: false });
    }
  };

  const deleteChar = () => {
    const newGrid = grid.grid;
    newGrid[grid.row][grid.col - 1] = " ";
    setGrid({
      grid: newGrid,
      row: grid.row,
      col: grid.col - 1,
    });
  };

  const renderBox = (row, col) => {
    let rndmWord;
    const wrdList = wordList.filter((word) => word.length === col);
    rndmWord = wrdList[Math.floor(Math.random() * wrdList.length)];
    setCurrentWord(rndmWord);
    setVerifieAtt(Array(rndmWord.length).fill(false));
    setGrid({
      grid: renderGrid(row, col),
      row: 0,
      col: 0,
    });
  };

  const handleClick = () => {
    const attemptsCount = parseInt(document.getElementById("nbAttempts").value);
    const wordLength = parseInt(document.getElementById("wordLength").value);

    if (wordLength > 22) {
      alert("Please enter word length between 1 and 22");
      document.getElementById("nbAttempts").value = "";
      document.getElementById("wordLength").value = "";
    } else if (attemptsCount < 0) {
      alert("Number of attempts must be higher than 0");
      document.getElementById("nbAttempts").value = "";
      document.getElementById("wordLength").value = "";
    } else {
      renderBox(attemptsCount, wordLength);
    }
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
            className="bi bi-github"
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
            className="bi bi-stack-overflow"
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
        <input type="number" id="nbAttempts" min="1" />

        <label htmlFor="wordLength">Word length</label>
        <input type="number" id="wordLength" min="1" />

        <button onClick={handleClick}>OK</button>
      </div>
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
