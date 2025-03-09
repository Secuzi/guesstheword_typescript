import { languages } from "./utils/languages";
import { useState } from "react";
import clsx from "clsx";
import StatusInfo from "./components/StatusInfo";
import { getRandomWord } from "./utils/words";
import ReactConfetti from "react-confetti";
function App() {
  // States
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedCharacters, setGuessedCharacters] = useState<string[]>([]);
  // Derived States
  const currentWordArr = currentWord.split("");
  const incorrectGuesses = guessedCharacters.filter(
    (character) => !currentWordArr.includes(character)
  ).length;

  const isGameWon = currentWordArr.every((char) =>
    guessedCharacters.includes(char)
  );

  const isGameLost = incorrectGuesses === languages.length - 1;
  const isRecentGuessMistake =
    guessedCharacters.length > 0 &&
    !currentWordArr.includes(guessedCharacters[guessedCharacters.length - 1]);
  const isGameOver = isGameWon || isGameLost;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  function addGuess(letter: string) {
    if (guessedCharacters.includes(letter)) {
      return;
    }

    setGuessedCharacters((prevCharacters) => [...prevCharacters, letter]);
  }

  const alphabetElements = alphabet.split("").map((letter) => {
    const guessedCharacter = guessedCharacters.includes(letter);
    const isGuessCorrect = guessedCharacter && currentWord.includes(letter);
    const isGuessIncorrect = guessedCharacter && !currentWord.includes(letter);

    return (
      <button
        key={letter}
        disabled={isGameOver}
        className={clsx("letter-btn", {
          "input-correct": isGuessCorrect,
          "input-incorrect": isGuessIncorrect,
        })}
        onClick={() => addGuess(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const currentWordElements = currentWordArr.map((character, index) => {
    const isCharacterCorrect = guessedCharacters.includes(character);

    return (
      <span
        className={clsx("currentword-element", {
          "missing-character": isGameLost && !isCharacterCorrect,
        })}
        key={index}
      >
        {isCharacterCorrect
          ? character.toUpperCase()
          : isGameOver
          ? character.toUpperCase()
          : ""}
      </span>
    );
  });

  const languagesElements = languages.map((language, index) => {
    const isLanguageDead = index < incorrectGuesses;

    const className = clsx("language-element", {
      killed: isLanguageDead && index < languages.length - 1,
    });

    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };

    return (
      <span key={index} style={styles} className={className}>
        {language.name}
      </span>
    );
  });

  const gameStatus = clsx("status container", {
    win: isGameWon,
    lose: isGameLost,
    mistake: isRecentGuessMistake && !isGameOver,
  });

  function restartGame() {
    setGuessedCharacters([]);
    setCurrentWord(getRandomWord());
  }
  return (
    <>
      <main>
        {isGameWon && <ReactConfetti recycle={false} />}
        <section className="header container">
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word in under 8 attempts to keep the programming world
            safe from Assembly!
          </p>
        </section>

        {/* Game Status */}
        <section className={gameStatus}>
          <StatusInfo
            isGameLost={isGameLost}
            isGameWon={isGameWon}
            isRecentGuessMistake={isRecentGuessMistake && !isGameOver}
            language={languages[incorrectGuesses - 1]}
          />
        </section>

        {/* Languages */}

        <section className="languages-container container">
          {languagesElements}
        </section>

        {/* random word */}
        <section className="currentword-container">
          {currentWordElements}
        </section>
        {/* Keyboard */}
        <section className="keyboard-container">{alphabetElements}</section>

        {isGameOver && (
          <button className="restart-btn" onClick={restartGame}>
            New Game
          </button>
        )}
      </main>
    </>
  );
}

export default App;
