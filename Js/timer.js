import { typeText } from "./main.js";

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
    }
  }
}
