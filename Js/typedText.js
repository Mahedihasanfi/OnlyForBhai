import { typeText } from "./main.js";
import { accuracyElement } from "./localStorage.js";
import { apiText } from "./apiText.js";

export const wpmElement = document.getElementById("wpm");
const mistakesElement = document.getElementById("mistakes");
let characterTyped, mistakes;

export default function typedText() {
  typeText.addEventListener("input", () => {
    const arrayApiText = apiText.querySelectorAll("span");
    const arrayTypeText = typeText.value.split("");
    mistakes = 0;
    characterTyped = 0;
    // Count of words with correct characters
    let correctWords = 0;
    let currentWordCorrect = true;

    arrayApiText.forEach((letter, index) => {
      const character = arrayTypeText[index];

      if (character == null) {
        letter.classList.remove("correct");
        letter.classList.remove("incorrect");
      } else if (character === letter.innerText) {
        letter.classList.add("correct");
        letter.classList.remove("incorrect");
        characterTyped++;

        // Check if a new word has started
        if (character === " ") {
          // If the current word is correct, increment correctWords
          if (currentWordCorrect) {
            correctWords++;
          }
          currentWordCorrect = true; // Reset currentWordCorrect for the next word
        }
      } else {
        letter.classList.remove("correct");
        letter.classList.add("incorrect");
        mistakes++;
        currentWordCorrect = false; // Set currentWordCorrect to false for the current word
      }

        function currentWord() {
        letter.classList.remove("current-word");

        if (index === arrayTypeText.length) {
          letter.classList.add("current-word");
        }
      }
      currentWord();
    });

    mistakesElement.innerText = `Mistakes: ${mistakes}`;
    let accuracy =
      Math.round(
        ((arrayTypeText.length - mistakes) / arrayTypeText.length) * 100
      ) || 0;
    accuracyElement.innerText = `Accuracy: ${accuracy}%`;

    let wpm = Math.round(correctWords / 1); // Calculate WPM using correct words only
    wpmElement.innerText = `WPM: ${wpm}`;
  });
}
