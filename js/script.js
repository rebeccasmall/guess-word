const guessedLetters = document.querySelector(".guessed-letters");
// Unordered list where the guessed letters will appear
const guessButton = document.querySelector(".guess");
// Button to submit guess
const input = document.querySelector(".letter");
// Text input where player will guess letter 
const wordInProgress = document.querySelector(".word-in-progress");
// Empty paragraph where the word in progress will appear 
const remaining = document.querySelector(".remaining");
// Paragraph where the remaining guesses will display
const span = document.querySelector("span");
// Span element where the remaining guesses will appear
const message = document.querySelector(".message");
// Empty paragraph where message will appear when player gueses a letter
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

const updateWordProgress = function () {
    let placeholders = [];
    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
        placeholders.push("●");
    }
    wordInProgress.innerText = placeholders.join("");
};

updateWordProgress();