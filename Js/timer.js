import { wpmElement } from "./typedText.js";
import { typeText } from "./main.js";
import { accuracyElement } from "./localStorage.js";

const timerElement = document.getElementById("timer");
let timerInterval;

export default function countDown() {
  const targetTime = new Date().getTime() + 60 * 1000;
  timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime;
    const minutes = Math.floor(remainingTime / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    timerElement.textContent = `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "Time is up!";
      typeText.disabled = true;
      startButton.disabled = false;

      // Generate wpm and accuracy data
      const timestamp = new Date().toLocaleString();
      const wpmdata = `${wpmElement.innerText}, ${timestamp}`;
      const accuracydata = `${accuracyElement.innerText}, ${timestamp}`;

      // Dispatch a custom event to indicate the time is up and data should be saved
      document.dispatchEvent(
        new CustomEvent("timeIsUp", { detail: { wpmdata, accuracydata } })
      );
    }
  }
}
