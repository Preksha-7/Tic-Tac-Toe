let mode = "";
let flag = 1;
let board = ["", "", "", "", "", "", "", "", ""];

function setmode(selectmode) {
  // Set the game variable to selected mode
  mode = selectmode;
  //Hide selection mode ui
  document.getElementById("modeselect").classList.add("hide");
  // show the game UI
  document.getElementById("game").classList.remove("hide");
  // Update UI to indicate it is player X turn
  document.getElementById("print").innerText = "Player X's Turn";
  // Show the reset button along with the grid
  document.getElementById("resetBtn").classList.remove("hide");
}

function makemove(position) {
  // Check if specified position is empty for 0 based indexing
  if (board[position - 1] === "") {
    // If flag is 1 , it is X's turn
    if (flag === 1) {
      document.getElementById("b" + position).innerText = "X"; // Sets the value of button at specified position to be X
      board[position - 1] = "X"; // Update the array to record move of player X
      document.getElementById("b" + position).disabled = true; //Disabled button to prevent future changes
      flag = 0; // Indicates it is player O's turn
    } else {
      document.getElementById("b" + position).innerText = "O";
      board[position - 1] = "O";
      document.getElementById("b" + position).disabled = true;
      flag = 1;
    }
    func();

    if (mode === "oneplayer" && flag === 0) {
      setTimeout(cmove, 700); // Computer's move
    }
  }
}

function cmove() {
  let emptypos = []; // Initialize an array to store empty positions
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      emptypos.push(i + 1); // Find and add all the empty positions to array
    }
  }

  let comppos = findwinmove("O"); // Computer checks for winning opportunities

  if (!comppos) {
    comppos = findwinmove("X"); // If no winning move, try to block winning move of the user
  }

  if (!comppos && emptypos.length > 0) {
    comppos = emptypos[Math.floor(Math.random() * emptypos.length)]; // If no strategic move, select random position
  }

  if (comppos) {
    // if a position is found, update the UI
    document.getElementById("b" + comppos).innerText = "O";
    board[comppos - 1] = "O";
    document.getElementById("b" + comppos).disabled = true;
    flag = 1;
    func();
  }
}

function findwinmove(symbol) {
  const wincomb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]; //Array of winning combos

  for (let combo of wincomb) {
    // Iterates through the wincomb array
    let [index1, index2, index3] = combo; // Stores value in combo to three individual variables- Destructuring indices
    if (
      board[index1] === symbol &&
      board[index2] === symbol &&
      board[index3] === ""
    ) {
      return index3 + 1;
    }
    if (
      board[index1] === symbol &&
      board[index3] === symbol &&
      board[index2] === ""
    ) {
      return index2 + 1;
    }
    if (
      board[index2] === symbol &&
      board[index3] === symbol &&
      board[index1] === ""
    ) {
      return index1 + 1;
    }
  }

  return null;
}

function func() {
  let b1 = board[0];
  let b2 = board[1];
  let b3 = board[2];
  let b4 = board[3];
  let b5 = board[4];
  let b6 = board[5];
  let b7 = board[6];
  let b8 = board[7];
  let b9 = board[8]; // Declare variables for array values

  if (
    (b1 == "X" && b2 == "X" && b3 == "X") ||
    (b1 == "X" && b4 == "X" && b7 == "X") ||
    (b7 == "X" && b8 == "X" && b9 == "X") ||
    (b3 == "X" && b6 == "X" && b9 == "X") ||
    (b1 == "X" && b5 == "X" && b9 == "X") ||
    (b3 == "X" && b5 == "X" && b7 == "X") ||
    (b2 == "X" && b5 == "X" && b8 == "X") ||
    (b4 == "X" && b5 == "X" && b6 == "X") // Conditions for player X to win
  ) {
    document.getElementById("print").innerHTML = "Player X won";
    disableAll();
  } else if (
    (b1 == "O" && b2 == "O" && b3 == "O") ||
    (b1 == "O" && b4 == "O" && b7 == "O") ||
    (b7 == "O" && b8 == "O" && b9 == "O") ||
    (b3 == "O" && b6 == "O" && b9 == "O") ||
    (b1 == "O" && b5 == "O" && b9 == "O") ||
    (b3 == "O" && b5 == "O" && b7 == "O") ||
    (b2 == "O" && b5 == "O" && b8 == "O") ||
    (b4 == "O" && b5 == "O" && b6 == "O") // Conditions for player O to win
  ) {
    document.getElementById("print").innerHTML = "Player O won";
    disableAll(); // everything is disabled after the winning message is displayed
  } else if (board.indexOf("") === -1) {
    document.getElementById("print").innerHTML = "Match Tie"; // Match tie condition
  } else {
    document.getElementById("print").innerHTML =
      flag === 1 ? "Player X's Turn" : "Player O's Turn";
  }
}

function disableAll() {
  for (let i = 1; i <= 9; i++) {
    document.getElementById("b" + i).disabled = true; // Disbaling function
  }
}

function myfunc_2() {
  location.reload(); // Reset
}
