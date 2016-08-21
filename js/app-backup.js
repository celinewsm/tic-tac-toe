console.log('JS loads');
//create gameboard array
// var gameboard = [ [0,0,0],
// 				  [0,0,0,],
// 				  [0,0,0]]

var boardData = new Array();
function updateData() {
	boardData = [];
	var rowCount = document.getElementsByClassName('row');
	for (var i = 0; i < rowCount.length ; i++){
		var columnCount =  	rowCount[i].getElementsByClassName("box");
	  	var cellData = new Array();
	 	for (var j = 0 ; j < columnCount.length ; j++ ){
	 	cellData.push(columnCount[j].className[4]);
	 	}
		boardData.push(cellData);
	 }
 }

//player choose

var selector = document.getElementsByClassName("selector");
var selected;
function selectSymbol() {
    selected = this.getAttribute("id");
    console.log("player has " + selected);
    document.getElementById("popUpDiv").remove();
    console.log("pop up closed");
}



//playerturn
var grid = document.getElementsByClassName("box")

function playerTurn() {
	if (endGame !== true) {
		if (selected === "chooseO") {
			this.classList.add("O");
			this.textContent = "◯";
		}
		else if (selected === "chooseX") {
			this.classList.add("X");
			this.textContent = "✕";
		}
		updateData();
		checkScore();
		comTurn();
		updateData();
		checkScore();
	}

}



//computer move
function comTurn() {
	if (endGame !== true) {
		var forRandom = [];
		for (var i = 0 ; i < boardData.length ; i ++) {
			for (var j = 0 ; j <boardData[i].length ; j++) {
				// selecting random empty grid
				if (boardData[i][j] === undefined) {
					forRandom.push([i, j]);
				}
			}
		}
		if (forRandom.length === 0 ) {
			console.log("No moves left!");
			toInsertPopUp.innerHTML='<div id="popUpDiv"><h1>No moves left!<br />  It is a tie!</h1></div>';
			return;
		}
		console.log("forRandom output: " + forRandom );
				var comSelected = forRandom[Math.floor(Math.random()*forRandom.length)];
				console.log ("comSelected output" + comSelected);
				if (comSelected[0] === 0) {
					var comSelectedGrid = comSelected[1];
				}
				else if (comSelected[0] === 1) {
					var comSelectedGrid = 3 + comSelected[1];
				}
				else if (comSelected[0] === 2) {
					var comSelectedGrid = 6 + comSelected[1];
				}
				console.log("comSelectedGrid (should be 0-8): " + comSelectedGrid)
				// inserting computer's choice
				if (selected === "chooseO") {
					console.log(grid[comSelectedGrid].classList + " orignal class")
					grid[comSelectedGrid].classList.add("X");
					grid[comSelectedGrid].textContent = "✕";
					console.log(grid[comSelectedGrid].classList + " modified class")
					console.log("computer played X")
				}
				else if (selected === "chooseX") {
					grid[comSelectedGrid].classList.add("O");
					grid[comSelectedGrid].textContent = "◯"
					console.log("computer played O")
				}
	}
}

var winningSymbol;

function checkScore () {
	for (var i = 0 ; i < 3 ; i++) {
		if (boardData[i][0] === boardData[i][1] && boardData[i][0] === boardData[i][2] && boardData[i][0] !== undefined) {
			declareWinner();
			winningSymbol = boardData[i][0];
		}
		else if (boardData[0][i] === boardData[1][i] && boardData[2][i] === boardData[0][i] && boardData[0][i] !== undefined){
			declareWinner();
			winningSymbol = boardData[0][i];
		}
	}
	if (boardData[0][0] === boardData[1][1] && boardData[2][2] === boardData[0][0] && boardData[0][0] !== undefined) {
		declareWinner();
		winningSymbol = boardData[0][0];
	}
	else if (boardData[0][2] === boardData[1][1] && boardData[2][0] === boardData[0][2] && boardData[0][2] !== undefined) {
		declareWinner();
		winningSymbol = boardData[0][2];
		}
	else {
		return;
	}
}

//to stop playerTurn and comTurn
var endGame;
var toInsertPopUp = document.getElementById("toInsert");
function declareWinner() {
	if (selected === "chooseO"){
		var userIs = "O";
	}
	else if (selected === "chooseX") {
		var userIs = "X"
	}
	if (winningSymbol === userIs){
			console.log("User won!");
			toInsertPopUp.innerHTML='<div id="popUpDiv"><h1>Congratulations! <br /> You won!</h1></div>';
			endGame = true;
		}
	else {
			console.log("Computer won!");
			toInsertPopUp.innerHTML='<div id="popUpDiv"><h1>Sorry, you lost! <br /> Try again!</h1></div>';
			endGame = true;
		}
}


function reset() {
	for (var i = 0 ; i < grid.length ; i++ ){
		grid[i].className = "box";
		grid[i].textContent = "";
	}
	if (document.getElementById("popUpDiv")!== null) {
		document.getElementById("popUpDiv").remove();
	}
	endGame = false;
	toInsertPopUp.innerHTML='<div id="popUpDiv"><h1>Choose your piece to start: <br/><span id="chooseO" class="selector">&#9711</span> or <span id="chooseX" class="selector">&#10005</span></h1></div>';
	executeListeners();
}


function executeListeners() {
	for (var i = 0; i < selector.length; i++) {
	    selector[i].addEventListener('click', selectSymbol);
			console.log("symbol selected");
	}
	console.log("waiting for symbol to be selected")
	for (var i = 0; i < grid.length; i++) {
	    grid[i].addEventListener('click', playerTurn);
			console.log("div clicked")
	}
	console.log("waiting for div to be clicked")
	document.getElementById("reset").addEventListener('click', reset);
	console.log("waiting for reset button to be clicked")
}

executeListeners();
