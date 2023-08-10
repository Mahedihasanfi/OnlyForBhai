export const apiText = document.getElementById("apiText");

export default async function randomApiText() {
  try {
    apiText.innerText = "";
    let quote = await getRandomQuote();
    const characterSpans = quote.split("").map((character) => {
      const characterSpan = document.createElement("span");
      characterSpan.innerText = character;
      return characterSpan;
    });
    apiText.append(...characterSpans);
  } catch (error) {
    showErrorToUser(error);
  }
}

// Function to fetch API data
async function getRandomQuote() {
  try {
    const response = await fetch("https://poetrydb.org/title,random/Sonnet;3");
    if (!response.ok) {
      throw new Error("Failed to fetch data from the API");
    }
    const data = await response.json();
    if (data.length === 0) {
      throw new Error("No data received from the API");
    }
    const text = data[0].lines.join(" ");
    return text;
  } catch (error) {
    throw error;
  }
}

function showErrorToUser(error) {
  apiText.innerText = `Error: ${error.message}`;
}
