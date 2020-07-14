//Set Name Function
let name1;
let name2;
let nameArr = document.querySelectorAll(".playerName");
let playerlabel = document.querySelector("#playerLabel");
var p1 = document.getElementById("p1Name");
var p2 = document.getElementById("p2Name");
let back = document.querySelector("#backToMenu")
var winning = document.querySelector(".turnIndicator");

let submit = document.querySelector("#submitButton");
submit.addEventListener("click", startTwoPlayer);

function startTwoPlayer(){
  name1 = p1.value;
  name2 = p2.value;
  setName();
  document.querySelector(".launchForm").classList.add("hideBoard");
  document.querySelector(".board").classList.remove("hideBoard");
}

function setName(){
    if(!name1){
      name1 = "Player 1"
      nameArr[0].textContent = name1;
    }
    else{
      nameArr[0].textContent = name1;
    }

    if(!name2){
      name2 = "Player 2"
      nameArr[1].textContent = name2;
    }
    else{
      nameArr[1].textContent = name2;
    }
    playerlabel.textContent = name1;
}

back.addEventListener("click", ()=>{
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].style.backgroundColor = "#dee9ec";
    boxes[i].style.color = "black";
  }
  currentPlayer = "x";
  name1 = "";
  name2 = "";
  p1.value = "";
  p2.value = "";
  nameArr[0].textContent = "";
  nameArr[1].textContent = "";

  document.querySelector(".launchForm").classList.remove("hideBoard");
  document.querySelector(".board").classList.add("hideBoard");
  gameStatus = true;
})

//stores player turns
let currentPlayer = "x";
let currentPlayerName = name1;

//stores the status of the game, whether its over or still in play
let gameStatus = true;

//Gets all Boxes elements
const boxes = document.getElementsByClassName("box");

//loops through all the elements
for (let i = 0; i < boxes.length; i++) {
  //adds event listener to each box;
  boxes[i].addEventListener("click", function() {
    //checks if the box has an x or an o in it and also checks if the game is still on
    if (boxes[i].innerHTML.trim() == "" && gameStatus) {
      //adds x or o for the current play in their choosen box
      boxes[i].textContent = currentPlayer;

      //changes player turns
      currentPlayer = (currentPlayer == "x" ? "o" : "x");
      currentPlayerName = (currentPlayer == "x" ? name1 : name2);

      playerlabel.textContent = currentPlayerName;

      //checks 3 matching x's or o's
      if (
        boxes[0].innerHTML == boxes[1].innerHTML &&
        boxes[1].innerHTML == boxes[2].innerHTML &&
        boxes[0].innerHTML.trim() != ""
      ) {
        showWinner(0, 1, 2);
      } else if (
        boxes[3].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[5].innerHTML &&
        boxes[3].innerHTML.trim() != ""
      ) {
        showWinner(3, 4, 5);
      } else if (
        boxes[6].innerHTML == boxes[7].innerHTML &&
        boxes[7].innerHTML == boxes[8].innerHTML &&
        boxes[6].innerHTML.trim() != ""
      ) {
        showWinner(6, 7, 8);
      } else if (
        boxes[0].innerHTML == boxes[3].innerHTML &&
        boxes[3].innerHTML == boxes[6].innerHTML &&
        boxes[0].innerHTML.trim() != ""
      ) {
        showWinner(0, 3, 6);
      } else if (
        boxes[1].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[7].innerHTML &&
        boxes[1].innerHTML.trim() != ""
      ) {
        showWinner(1, 4, 7);
      } else if (
        boxes[2].innerHTML == boxes[5].innerHTML &&
        boxes[5].innerHTML == boxes[8].innerHTML &&
        boxes[2].innerHTML.trim() != ""
      ) {
        showWinner(2, 5, 8);
      } else if (
        boxes[0].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[8].innerHTML &&
        boxes[0].innerHTML.trim() != ""
      ) {
        showWinner(0, 4, 8);
      } else if (
        boxes[2].innerHTML == boxes[4].innerHTML &&
        boxes[4].innerHTML == boxes[6].innerHTML &&
        boxes[2].innerHTML.trim() != ""
      ) {
        showWinner(2, 4, 6);
      }
    }
  });
}

//resets the game
document.getElementById("reset").addEventListener("click", function() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].style.backgroundColor = "#dee9ec";
    boxes[i].style.color = "black";
  }
  currentPlayer = "x";
  playerlabel.textContent = name1;
  gameStatus = true;
});

//displays the winner

function showWinner(x, y, z) {
  boxes[x].style.backgroundColor = "#0d8b70";
  boxes[x].style.color = "white";
  boxes[y].style.background = "#0d8b70";
  boxes[y].style.color = "white";
  boxes[z].style.background = "#0d8b70";
  boxes[z].style.color = "white";
  gameStatus = false;
  playerlabel.classList.remove("turnIndicator");
  playerlabel.classList.add("winMessage");
  
  if(currentPlayer == 'o'){
    winning.textContent = name1 + " wins!";
  }
  else{
    winning.textContent = name2 + " wins!";
  }
}