export const apiText = document.getElementById("apiText");

export default async function randomApiText() {
  apiText.innerText = "";
  let quote = await getRandomQuote();
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    apiText.appendChild(characterSpan);
  });
}

// Function to fetch API data
async function getRandomQuote() {
  try {
    const response = await fetch("https://poetrydb.org/title,random/Sonnet;3");
    const data = await response.json();
    const text = data[0].lines.join(" "); // Parse the data array directly
    return text;
  } catch (error) {
    throw error;
  }
}
