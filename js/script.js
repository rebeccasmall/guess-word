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

let word = "";
const guessedLetters = [];
let remainingGuesses = 8;
let wordArray = [];

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    console.log(data);
    wordArray = data.split("\n");
    selectRandomWord();
}

const selectRandomWord = function () {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex].trim();
    word = randomWord;
    updateWordProgress(word);
};

getWord();

const updateWordProgress = function () {
    let placeholders = [];
    for (let i = 0; i < word.length; i++) {
        console.log(word[i]);
        placeholders.push("●");
    }
    wordInProgress.innerText = placeholders.join("");
};

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
      countRemainingGuesses(letter);
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

const countRemainingGuesses = function (guess) {
    let wordUpper = word.toUpperCase();
    if (!wordUpper.includes(guess)) {
        message.textContent = `Sorry, the word has no "${guess}".`;
        remainingGuesses -= 1;
    } else {
        message.textContent = `Nice! The word has the letter "${guess}".`;
    }
    if (remainingGuesses === 0) {
        message.textContent = `Game over! The correct word was ${word.toUpperCase()}`
        span.textContent = "0";
    } else if (remainingGuesses === 1) {
        span.textContent = "1 guess"
    } else {
        span.textContent = `${remainingGuesses} guesses`;
    }
};

  const checkSuccessWord = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
  };

const startOver = function () {
    guessedLetter.classList.add("hide");
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    remaining.innerText = "";
    guessedLetters.length = 0;
    guessedLetter.innerHTML = "";
    remainingGuesses = 8;
    span.innerText = `${remainingGuesses} guesses`;
    input.value = "";
    remaining.classList.remove("hide");
    guessButton.classList.remove("hide");
    guessedLetter.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});
