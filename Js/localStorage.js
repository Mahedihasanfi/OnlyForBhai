import { wpmElement } from "./typedText.js";

export const accuracyElement = document.getElementById("accuracy");

export default function myLocalStorage() {
  document.addEventListener("DOMContentLoaded", function () {
    const saveButton = document.getElementById("saveButton");
    const dataTable = document
      .getElementById("dataTable")
      .getElementsByTagName("tbody")[0];

    saveButton.addEventListener("click", function () {
      const timestamp = new Date().toLocaleString();

      // Generate wpm and accuracy data
      const wpmdata = `${wpmElement.innerText}, ${timestamp}`;
      const accuracydata = `${accuracyElement.innerText}, ${timestamp}`;

      let savedData = JSON.parse(localStorage.getItem("savedData")) || [];
      // Add the new data to the array
      savedData.push({ wpmdata, accuracydata });

      localStorage.setItem("savedData", JSON.stringify(savedData));

      // Update the table
      updateTable(savedData);
    });

    // Function to update the table with saved data
    function updateTable(dataArray) {
      // Clear existing rows
      dataTable.innerHTML = "";

      // Add new rows to the table
      for (const entry of dataArray) {
        const row = document.createElement("tr");
        const wpmdataCell = document.createElement("td");
        const accuracydataCell = document.createElement("td");

        wpmdataCell.textContent = entry.wpmdata;
        accuracydataCell.textContent = entry.accuracydata;

        row.appendChild(wpmdataCell);
        row.appendChild(accuracydataCell);

        dataTable.appendChild(row);
      }
    }

    // Initial table update when the page loads
    const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
    updateTable(savedData);
  });
}
