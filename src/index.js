import "./styles.css";

var turn = 1; //keeps track of played turns
let player = "1"; //current player
let mark = "X"; //player 1's mark
let status = "Game on"; //shows the game status, default id game on
const cells = document.getElementsByClassName("col"); //all cell elements
const marks = document.getElementsByClassName("marks"); //each cells' content
//progress bar
var determinate = document.getElementById("det");
var width = 100;
var interval = setInterval(frame, 1000);

//Event listener fot Restart button
document.getElementById("restart").addEventListener("click", restart);

//goes through all cells and adds EventListener
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function() {
    cellClick(i);
  });
}

//Function for clicked cell
function cellClick(i) {
  //checks that the cell is empty and game is on
  if (marks[i].innerHTML.trim() === "" && status === "Game on") {
    //current player's mark is written to clicked cell
    marks[i].innerHTML = mark;
    if (mark === "X") {
      cells[i].style.backgroundColor = "grey";
    } else if (mark === "O") {
      cells[i].style.backgroundColor = "whitesmoke";
    }
    //check if there are 5 matching symbols in a row
    for (let j = 0; j < 25; j = j + 5) {
      if (
        marks[j].innerHTML !== "" &&
        marks[j].innerHTML === marks[j + 1].innerHTML &&
        marks[j].innerHTML === marks[j + 2].innerHTML &&
        marks[j].innerHTML === marks[j + 3].innerHTML &&
        marks[j].innerHTML === marks[j + 4].innerHTML
      ) {
        winner(j, j + 1, j + 2, j + 3, j + 4); //trigger winning function if winning requirements are met
      }
    }
    //check if there are 5 matching symbols in a column
    for (let k = 0; k < 5; k = k + 1) {
      if (
        marks[k].innerHTML !== "" &&
        marks[k].innerHTML === marks[k + 5].innerHTML &&
        marks[k].innerHTML === marks[k + 10].innerHTML &&
        marks[k].innerHTML === marks[k + 15].innerHTML &&
        marks[k].innerHTML === marks[k + 20].innerHTML
      ) {
        winner(k, k + 5, k + 10, k + 15, k + 20);
      }
      //check if there are 5 matching symbols accross the table
    }
    if (
      marks[0].innerHTML !== "" &&
      marks[0].innerHTML === marks[6].innerHTML &&
      marks[0].innerHTML === marks[12].innerHTML &&
      marks[0].innerHTML === marks[18].innerHTML &&
      marks[0].innerHTML === marks[24].innerHTML
    ) {
      winner(0, 6, 12, 18, 24);
    } else if (
      marks[4].innerHTML !== "" &&
      marks[4].innerHTML === marks[8].innerHTML &&
      marks[4].innerHTML === marks[12].innerHTML &&
      marks[4].innerHTML === marks[16].innerHTML &&
      marks[4].innerHTML === marks[20].innerHTML
    ) {
      winner(4, 8, 12, 16, 20);
    }
    //player is switched
    [player, mark] = change_player(player);
  }
}

function winner(a, b, c, d, e) {
  clearInterval(interval); //stop timer
  //if game is won
  //highlight winner cells
  turn = 0; //make turn 0 so that the tie message won't be executed
  cells[a].style.backgroundColor = "green";
  cells[b].style.backgroundColor = "green";
  cells[c].style.backgroundColor = "green";
  cells[d].style.backgroundColor = "green";
  cells[e].style.backgroundColor = "green";
  alert("Player " + player + " won!");
  status = "Game over"; //end game
}

//fuction for when restart button is pressed
function restart() {
  clearInterval(interval);
  determinate.style.width = "100%";
  for (let i = 0; i < cells.length; i++) {
    marks[i].innerHTML = "";
    cells[i].style.backgroundColor = "#303F9F";
  }
  //change player to player X again and set game status to "game on"
  player = "1";
  mark = "X";
  document.getElementById("player").innerHTML = player;
  status = "Game on";
  turn = 1;
}

function change_player(p) {
  var m;
  turn++;
  if (p === "1") {
    p = "2";
    m = "O";
  } else if (p === "2") {
    p = "1";
    m = "X";
  }
  //updae whose turn it is
  document.getElementById("player").innerHTML = p;
  //if all the boxes are filled but there has been no win, alert tie
  if (turn === 26) {
    alert("It's a tie! No winners here.");
  }
  //reset timer
  clearInterval(interval);
  width = 100;
  determinate.style.width = "100%";
  interval = setInterval(frame, 1000);
  return [p, m];
}

//function for timer
function frame() {
  if (width === 0) {
    [player, mark] = change_player(player);
  } else {
    width = width - 10;
    determinate.style.width = width + "%";
  }
}
