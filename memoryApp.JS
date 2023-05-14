const gameContainer = document.querySelector("div");
let card1 = null;
let card2 = null;
let idle = false;
let progress = 0;

const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];
let shuffledColors = shuffle(colors);

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.appendChild(newDiv);
  }
}

function handleCardClick(e) {
  const currentCard = e.target;
  let backgroundColor = e.target.classList[0];
  currentCard.style.backgroundColor = backgroundColor;
  if (idle) {
    return;
  }
  if (currentCard.classList.contains("flipped")) {
    return;
  }

  card1 = card1 || currentCard;
  currentCard.classList.add("flipped");

  card2 = currentCard === card1 ? null : currentCard;
  currentCard.classList.add("flipped");

  if (card1 && card2) {
    idle = true;

    let classCompare1 = card1.classList[0];
    let classCompare2 = card2.classList[0];

    if (classCompare1 === classCompare2) {
      progress += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      idle = false;
    } else {
      setTimeout(function () {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        idle = false;
      }, 1000);
    }
  }
  if (progress === colors.length) {
    alert("GG!");
  }
}

createDivsForColors(shuffledColors);
