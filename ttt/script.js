function startGame() {
  for (var i = 1; i<10; i++) {
    clearBox(i);
  }
  document.turn = "X";
  document.winner = null;
  setMessage(document.turn + " first.")
}

function setMessage(msg) {
  document.getElementById("msg").innerText = msg;
}

function nextMove(square) {
  if (document.winner != null) {
    setMessage("Game Over.")
  }
  else if (square.innerText == "") {  
    square.innerText = document.turn; 
    switchTurn();
  } 
  else {
    setMessage("Pick another square.")
  }  
}

function switchTurn() {
  if (checkWin(document.turn)) {
    setMessage(document.turn + " won!")
    document.winner = document.turn;
  } 
  else if (checkDraw()) {
    setMessage("Draw.")
  }  
  else if (document.turn == "X") {
    document.turn = "O";
    setMessage(document.turn + "'s turn.")
  } 
  else {
    document.turn = "X";
    setMessage(document.turn + "'s turn.")
  }

}

function checkWin(move) {
  var result = false;
  if (checkRow(1, 2, 3, move) || 
      checkRow(4, 5, 6, move) || 
      checkRow(7, 8, 9, move) || 
      checkRow(1, 4, 7, move) || 
      checkRow(2, 5, 8, move) || 
      checkRow(3, 6, 9, move) || 
      checkRow(1, 5, 9, move) || 
      checkRow(3, 5, 7, move)) {
    result = true;
  }
  return result;
}

function checkDraw() {
  for (var i = 1; i < 10; i++ ) {
    if (getBox(i) == "") {
      return false;
    }
  }
  return true;
}

function checkRow(a, b, c, move) {
  var result = false;
  if (getBox(a) == move && getBox(b) == move && getBox(c) == move) {
    result = true;
  }
  return result;
}

function getBox(number) {
  return document.getElementById(number).innerText;
}

function clearBox(number) {
  document.getElementById(number).innerText = "";
}