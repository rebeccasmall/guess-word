const guessedLetter = document.querySelector(".guessed-letters");
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
const guessedLetters = [];

const updateWordProgress = function () {
    let placeholders = [];
    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
        placeholders.push("●");
    }
    wordInProgress.innerText = placeholders.join("");
};

updateWordProgress(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = input.value;
    console.log(guess);
    input.value = "";
    message.textContent = "";
    const result = validateInput(guess);
    console.log(result);
    if (result) {
        makeGuess(result);
        console.log("Guessed Letters Array:", guessedLetters);
      }
});

const validateInput = function (guess) {
    const acceptedLetter = /[a-zA-Z]/;
    if (guess === "") {
      message.textContent = "Please enter a letter.";
      return null;
    } else if (guess.length > 1) {
      message.textContent = "Please enter only one letter.";
      return null;
    } else if (!guess.match(acceptedLetter)) {
      message.textContent = "Please enter a valid letter from A to Z.";
      return null;
    } else {
      return guess;
    }
};

const makeGuess = function (letter) {
    letter = letter.toUpperCase();
  
    if (guessedLetters.includes(letter)) {
      message.textContent = `You already guessed "${letter}", silly. Try again.`;
    } else {
      guessedLetters.push(letter);
      message.textContent = `Good guess! "${letter}" added.`;
      console.log(guessedLetters);
      showGuessedLetters();
      updateWordInProgress(guessedLetters);
    }
  };
  
  const showGuessedLetters = function () {
    guessedLetter.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetter.append(li);
      }
  };

  const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);
    const updatedCharacters = [];

    for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      updatedCharacters.push(letter);
    } else {
      updatedCharacters.push("●");
    }
  }
  wordInProgress.innerText = updatedCharacters.join("");
  checkSuccessWord();
  }

  const checkSuccessWord = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
  };

  const remainingGuesses = 8;