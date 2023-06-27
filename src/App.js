import "./App.css";

import { useState, useCallback, useEffect } from "react";

import { wordsList } from "./data/word";

import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "gameOver" },
];

function App() {
  const number = 3; //número de tentativas

  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList);

  const [pickedCategory, setPickedCategory] = useState("");
  const [pickedWord, setPickedWord] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetter, setGuessedLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState(number);

  const pickWordandCategory = useCallback(() => {
    //get some random category
    const categories = Object.keys(wordsList);
    const category = categories[Math.floor(Math.random() * categories.length)];

    //get some random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  }, [words]);

  const startGame = useCallback(() => {
    // limpando as letras
    clearLetterStages()

    //pegando palavra e categora
    const { word, category } = pickWordandCategory();

    //catch letters of picked word
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => letter.toLowerCase());

    setGuesses(number);
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickWordandCategory]);

  const verifyLetter = (letter) => {
    let lowerLetter = letter.toLowerCase();

    if (
      guessedLetter.includes(lowerLetter) ||
      wrongLetter.includes(lowerLetter)
    ) {
      return;
    }
    if (letters.includes(lowerLetter)) {
      setGuessedLetter((actualLetter) => [...actualLetter, lowerLetter]);
      setScore((actualScore) => actualScore + 100);
    } else {
      setWrongLetter((actualLetter) => [...actualLetter, lowerLetter]);
      setGuesses((e) => e - 1);
    }
  };

  //clear function
  const clearLetterStages = () => {
    setGuessedLetter([]);
    setWrongLetter([]);
  };

  //limitando contador de tentativas
  useEffect(() => {
    if (guesses === 0) {
      //reset all stages
      clearLetterStages();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  const retry = () => {
    setScore(0);
    setGuesses(number);

    setGameStage(stages[0].name);
  };

  //condição de vitória
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    
    if(guessedLetter.length === uniqueLetters.length && gameStage === stages[1].name){
      startGame()
    }
  }, [guessedLetter, startGame, letters, gameStage])

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          score={score}
          guessedLetter={guessedLetter}
          wrongLetter={wrongLetter}
          verifyLetter={verifyLetter}
          guesses={guesses}
        />
      )}
      {gameStage === "gameOver" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
