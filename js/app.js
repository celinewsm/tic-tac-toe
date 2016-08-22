console.log('JS loads');
//create gameboard array
// var gameboard = [ [0,0,0],
// 				  [0,0,0,],
// 				  [0,0,0]]

// document.addEventListener('DOMContentLoaded', function() {
//   console.log("DOM loaded");

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

			//randomize turn between com and user
			var random = Math.random();
			console.log("random value: " + random);
			if ( random < 0.5) {
				updateData();
				comTurn();
				updateData();
				checkScore();
			}
	}

	//playerturn
	var grid = document.getElementsByClassName("box")
	var delay=500;

	function playerTurn() {

		if (endGame !== true && this.classList.length === 1 ) {
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
			// to add delay in component
			setTimeout(function() {
				comTurn();
				updateData();
				checkScore();
			}, delay);

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
		if (endGame !== true) {

			for (var i = 0 ; i < 3 ; i++) {
				if (boardData[i][0] === boardData[i][1] && boardData[i][0] === boardData[i][2] && boardData[i][0] !== undefined) {
					winningSymbol = boardData[i][0];
					declareWinner();
				}
				else if (boardData[0][i] === boardData[1][i] && boardData[2][i] === boardData[0][i] && boardData[0][i] !== undefined){
					winningSymbol = boardData[0][i];
					declareWinner();
					return;
				}
			}
			if (boardData[0][0] === boardData[1][1] && boardData[2][2] === boardData[0][0] && boardData[0][0] !== undefined) {
					winningSymbol = boardData[0][0];
					declareWinner();
					return;
			}
			else if (boardData[0][2] === boardData[1][1] && boardData[2][0] === boardData[0][2] && boardData[0][2] !== undefined) {
				winningSymbol = boardData[0][2];
				declareWinner();
				return;
				}

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

		}
	}

	//to stop playerTurn and comTurn
	var endGame;
	var userScore = [];
	var comScore = [];
	var userIs;
	var toInsertPopUp = document.getElementById("toInsert");

	function matchUserSymbol() {
		if (selected === "chooseO"){
			userIs = "O";
		}
		else if (selected === "chooseX") {
			userIs = "X"
		}
	}

	function declareWinner() {
		matchUserSymbol();
		if (winningSymbol === userIs){
				console.log("User won!");
				toInsertPopUp.innerHTML='<div id="popUpDiv"><h1>Congratulations! <br /> You won!</h1></div>';
				endGame = true;
				userScore.push(1);
			}
		else if (winningSymbol !== userIs){
				console.log("Computer won!");
				toInsertPopUp.innerHTML='<div id="popUpDiv"><h1>Sorry, you lost! <br /> Try again!</h1></div>';
				endGame = true;
				comScore.push(1);
			}
	}


	// var threeWins = false;
	// function compareThree() {
	// 	for (var i = 0 ; i < (userScore.length - 2) ; i++)
	// 	if (userScore[i]=== 1 && userScore[i] === userScore[i+1] && userScore[i+1] === userScore[i+2]) {
	// 		threeWins = true;
	// 	}
	// }


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
		}
		console.log("waiting for symbol to be selected")
		for (var i = 0; i < grid.length; i++) {
		    grid[i].addEventListener('click', playerTurn);
		}
		console.log("waiting for div to be clicked")
		document.getElementById("reset").addEventListener('click', reset);
		console.log("waiting for reset button to be clicked")
	}

	executeListeners();

	// });
