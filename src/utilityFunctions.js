import words from "./words.txt";

export function renderGrid(rows, cols) {
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

export const generateWordList = async () => {
  let wordList;

  try {
    const response = await fetch(words);
    const result = await response.text();
    wordList = result.split("\n");
  } catch (err) {
    throw new Error(err);
  }

  return { wordList };
};
