//import { timeS  } from "./xs.js";

const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const mistakesElement = document.getElementById("mistakes");
const startButton = document.getElementById("startButton");
const wpmElement = document.getElementById("wpm");
const resetButton = document.getElementById("resetButton");
const timerElement = document.getElementById("timer");
const accuracyElement = document.getElementById("accuracy");

let mistakes;
quoteInputElement.disabled = true;

/* document.addEventListener("DOMContentLoaded", async () => {
  //document.getElementById("quoteDisplay").innerText = ""; //await getRandomQuote()
  displayRandomQuote();
}); */

async function displayRandomQuote() {
  quoteDisplayElement.innerText = "";
  let quote = await getRandomQuote();
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
}

// Function to fetch API data
async function getRandomQuote() {
  try {
    const response = await fetch(
      "https://poetrydb.org/title/Ozymandias/lines.json"
    );
    const data = await response.json();
    const text = data[0].lines.join(" "); // Parse the data array directly
    return text;
  } catch (error) {
    throw error;
  }
}

let characterTyped;
function fromInput() {
  quoteInputElement.addEventListener("input", () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span");
    const arrayValue = quoteInputElement.value.split("");
    mistakes = 0;
    characterTyped = 0;
    let correctWords = 0; // Count of words with correct characters
    let currentWordCorrect = true; // Flag to track correctness of current word

    arrayQuote.forEach((characterSpan, index) => {
      const character = arrayValue[index];

      if (character == null) {
        characterSpan.classList.remove("correct");
        characterSpan.classList.remove("incorrect");
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
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
        characterSpan.classList.remove("correct");
        characterSpan.classList.add("incorrect");
        mistakes++;
        currentWordCorrect = false; // Set currentWordCorrect to false for the current word
      }
    });

    mistakesElement.innerText = `Mistakes: ${mistakes}`;
    let accuracy = Math.round(((arrayValue.length - mistakes) / arrayValue.length) * 100) || 0;
    accuracyElement.innerText = `Accuracy: ${accuracy}%`;

    let wpm = Math.round((correctWords) / 1); // Calculate WPM using correct words only
    wpmElement.innerText = `WPM: ${wpm}`;
  });
}



fromInput();

function startTyping() {
  quoteInputElement.value = "";
  quoteInputElement.disabled = false;
  startButton.disabled = true;
  resetButton.disabled = false;
  mistakes = 0;
  accuracy = 0;
  wpm = 0;
  displayRandomQuote(); // Display a new quote when starting
}

document.getElementById("startButton").addEventListener("click", async () => {
  startTimer();
  displayRandomQuote(); // Display a new quote when starting
  startTyping();
});

let timerInterval;
function startTimer() {
  const targetTime = new Date().getTime() + 60 * 1000;
  timerInterval = setInterval(updateTimer, 1000);
  function updateTimer() {
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime;
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "Time is up!";
      quoteInputElement.disabled = true;
    }
  }
}

// Event listener for keydown event on the document
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    startButton.click(); // Simulate a click on the startButton when "Enter" is pressed
  } else if (event.key === "Escape") {
    resetButton.click(); // Call the reset function when "Esc" is pressed
  }
});

document.getElementById("resetButton").addEventListener("click", function () {
  location.reload();
});

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  const dataTable = document
    .getElementById("dataTable")
    .getElementsByTagName("tbody")[0];

  saveButton.addEventListener("click", function () {
    // Get the current date and time
    const timestamp = new Date().toLocaleString();

    // Generate some sample data
    const data1 = `Data 1 - ${wpmElement.innerText} ${timestamp}`;
    const data2 = `Data 2 - ${accuracyElement.innerText} ${timestamp}`;

    // Get existing data from local storage
    let savedData = JSON.parse(localStorage.getItem("savedData")) || [];

    // Add the new data to the array
    savedData.push({ data1, data2 });

    // Save the updated array back to local storage
    localStorage.setItem("savedData", JSON.stringify(savedData));

    // Update the table
    updateTable(savedData);
  });

  // Function to update the table with saved data
  function updateTable(dataArray) {
    dataTable.innerHTML = ""; // Clear existing rows

    // Add new rows to the table
    for (const entry of dataArray) {
      const row = document.createElement("tr");
      const data1Cell = document.createElement("td");
      const data2Cell = document.createElement("td");

      data1Cell.textContent = entry.data1;
      data2Cell.textContent = entry.data2;

      row.appendChild(data1Cell);
      row.appendChild(data2Cell);

      dataTable.appendChild(row);
    }
  }

  // Initial table update when the page loads
  const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  updateTable(savedData);
});
