import { languages } from "./utils/languages";
import { useState } from "react";
import clsx from "clsx";
function App() {
  // States
  const [currentWord, setCurrentWord] = useState("regine");
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

  const isGameOver = isGameWon || isGameLost;
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  function addGuess(letter: string) {
    if (guessedCharacters.includes(letter)) {
      return;
    }

    setGuessedCharacters((prevCharacters) => [...prevCharacters, letter]);
  }

  // TODO: Add the status info if user wins or loses

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

  const currentWordElements = currentWordArr.map((character, index) => (
    <span className="currentword-element" key={index}>
      {guessedCharacters.includes(character) ? character.toUpperCase() : ""}
    </span>
  ));

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

  return (
    <>
      <main>
        <section className="header container">
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word in under 8 attempts to keep the programming world
            safe from Assembly!
          </p>
        </section>

        {/* Game Status */}
        <section className="status container"></section>

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
      </main>
    </>
  );
}

export default App;
