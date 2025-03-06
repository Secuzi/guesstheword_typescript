import { languages } from "./utils/languages";
import { useState } from "react";
import clsx from "clsx";
function App() {
  // States
  const [currentWord, setCurrentWord] = useState("regineeeeeexd");
  const [guessedCharacters, setGuessedCharacters] = useState<string[]>([]);
  // Derived States
  const currentWordArr = currentWord.split("");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  console.log(guessedCharacters);
  function addGuess(letter: string) {
    if (guessedCharacters.includes(letter)) {
      return;
    }

    setGuessedCharacters((prevCharacters) => [...prevCharacters, letter]);
  }

  // TODO: Implement dynamic adding of letters for the output

  //1. How do I make sure that the box is still there when there are no guesses but when I click on a button
  //   and it is correct the letter will appear to its corresponding boxes

  const alphabetElements = alphabet.split("").map((letter) => {
    const guessedCharacter = guessedCharacters.includes(letter);
    const isGuessCorrect = guessedCharacter && currentWord.includes(letter);
    const isGuessIncorrect = guessedCharacter && !currentWord.includes(letter);

    return (
      <button
        key={letter}
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

  const currentWordElements = currentWordArr.map((character) => (
    <span className="currentword-element">{character.toUpperCase()}</span>
  ));

  const languagesElements = languages.map((language, index) => {
    const styles = {
      backgroundColor: language.backgroundColor,
      color: language.color,
    };

    return (
      <span key={index} style={styles} className="language-element">
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
