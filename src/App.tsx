import { useEffect, useState } from "react";
import "./App.css";

const randomColors = [
  "#8B4513", 
  "#CD853F", 
  "#DAA520", 
  "#6B8E23", 
  "#4682B4",
  "#483D8B", 
];


function App() {
  const [selectedColor, setSelectedColor] = useState(
    randomColors[Math.floor(Math.random() * randomColors.length)]
  );
  const [colorOptions, setColorOptions] = useState<string[]>(randomColors);
  const [score, setScore] = useState<number>(0);
  const [animation, setAnimation] = useState("");
  const [gameStatus, setGameStatus] = useState<string>("");

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const generateColorOptions = (color: string) => {
    const colorList = [color];
    while (colorList.length < 6) {
      const newColor = generateRandomColor();
      if (!colorList.includes(newColor)) {
        colorList.push(newColor);
      }
    }
    setColorOptions(colorList.sort(() => Math.random() - 0.5));
  };

  const startNewgame = () => {
    const newTargetColor = generateRandomColor();
    setSelectedColor(newTargetColor);
    generateColorOptions(newTargetColor);
  };

  const checkColorGuess = (colorGuessed: string) => {
    if (selectedColor === colorGuessed) {
      setScore(score + 1);
      setGameStatus("Correct!");
      setTimeout(startNewgame, 1000);
      setAnimation("bounce");
      setTimeout(() => setAnimation(""), 500); 
    }else{
      setGameStatus("Missed it! Take another guess.");
      setScore(0)
      setAnimation("shake");
      setTimeout(() => setAnimation(""), 500); 
    }
  };
  


  useEffect(() => {}, []);



  return (
    <div className="main-content">
      <h1>Color Guessing Game</h1>
      <p data-testid="gameInstructions" className="game-instruction">
        Can you guess the correct color!!
      </p>

      <div
        className={`${animation} color-box`}
        data-testid="colorBox"
        style={{ backgroundColor: selectedColor }}
      ></div>

      <div className="color-options">
        {colorOptions.map((color) => (
          <button
            data-testid="colorOption"
            key={color}
            style={{ backgroundColor: color }}
            onClick={() => checkColorGuess(color)}
          ></button>
        ))}
      </div>

      <p className="game-status" data-testid="gameStatus">
        {gameStatus}
      </p>

      <p className="score" data-testid="score">
        {score}
      </p>

      <button
        data-testid="newGameButton"
        className="new-game"
        onClick={startNewgame}
      >
      New game
      </button>
    </div>
  );
}

export default App;
