
// 
// Initialization
// 

// Initialization function used every time before game starts
function initialize() {
	// select card values, two of each
	let cardValues = generateValues(game.resources.availableValues);
	// shuffle the card values using the provided "shuffle" method
	cardValues = shuffle(cardValues);
	// create the HTML for each card
	createCards(cardValues);
	// reset matches counter
	game.params.openCards = [];
	// counts the number of moves
	game.params.movesCounter = 0;
	// counts the number of matches
	game.params.matchesCounter = 0;
	// update counter
	updateCounter();
	// prepare the timer
	game.params.gameStarted = false;
}

// generate a list with pairs of values
function generateValues(values) {
	// create an empty array
	let cardValues = [];
	// loop through the available card values
	for (let i = 0; i < values.length; i++) {
		// add two of each card value to the list
		cardValues[2*i] = values[i];
		cardValues[2*i+1] = values[i];
	}
	return cardValues;
}

// shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        let temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// add values to cards
function createCards(values) {
	// use counter to select each value from the shuffled card values
	let counter = 0;
	// loop over each of the selected card Elements
	for (card of game.ui.cards){
		// add value to display through class
		card.firstElementChild.className = `fa ${values[counter]}`;
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.remove('no-match');
		card.classList.remove('match');
		counter++;
	}
}

// update number of moves and rating
function updateCounter() {
	// update number of moves
	game.ui.moves.textContent = `${game.params.movesCounter} ${(game.params.movesCounter === 1) ? 'Move' : 'Moves'}`;
	// loop over each of the selected stars
	for (let starIndex = 0; starIndex < game.ui.stars.length; starIndex++) {
		// determine the rank for current score
		let scoreIndex = 0;
		while (game.params.movesCounter > game.resources.movesScore[scoreIndex]){
			scoreIndex++;
		}
		// determine state for each star (full/half/empty)
		let currentRating = Math.max(Math.min(scoreIndex - 2 * starIndex, game.resources.ratings.length - 1),0);
		for (let ratingIndex = 0; ratingIndex < game.resources.ratings.length ; ratingIndex++) {
			if (ratingIndex === currentRating){
				game.ui.stars[game.ui.stars.length - 1 - starIndex].classList.add(game.resources.ratings[ratingIndex]);
			} else {
				game.ui.stars[game.ui.stars.length - 1 - starIndex].classList.remove(game.resources.ratings[ratingIndex]);
			}
		}
	}
}

// add event listeners for all interactive elements
function createInteraction() {
	// loop over each of the selected card elements
	for (let card of game.ui.cards){
		// add event listeners for cards
		card.addEventListener('click', clickCard);
	}
	// add event lister for restart
	game.ui.restartButton.addEventListener('click', clickRestart);
	game.ui.playAgainButton.addEventListener('click', clickPlayAgain);
}

// 
// Game states
// 

// checks if two matching cards are opened
function checkMatch() {
	// chck if two cards are opened
	if (game.params.openCards.length === 2) {
		// check if cards values match
		if (game.params.openCards[0].firstElementChild.className === game.params.openCards[1].firstElementChild.className) {
			//update matches counter
			game.params.matchesCounter++;
			// cards values match
			cardsMatch();
		} else {
			// cards values don't match
			cardsNoMatch();
		}
		// increse moves counter
		game.params.movesCounter++;
		// update moses counter
		updateCounter();
	}
}

// check if game is over
function checkGameOver() {
	if (game.params.matchesCounter === game.resources.availableValues.length){
		showEndMessage();
		resetTimer()
	}
}

// show game over message
function showEndMessage() {
	// make message visible
	game.ui.pop.classList.add('open')
	// determine the number of stars
	let scoreIndex = 0;
	while (game.params.movesCounter > game.resources.movesScore[scoreIndex]){
		scoreIndex++;
	}
	const noOfStars = (3-(Math.min(scoreIndex , game.resources.movesScore.length - 1)*0.5));
	const {seconds, minutes} = calculateTime();
	const timeValue = determineTimeValue(seconds, minutes);
	const recordMessage = checkRecord();
	// show custom message
	game.ui.message.textContent = `In ${timeValue}, with ${game.params.movesCounter} ${(game.params.movesCounter === 1) ? 'move' : 'moves'}, and ${noOfStars} ${(noOfStars === 1) ? 'star' : 'stars'}. ${recordMessage}`;
	game.params.currentScreen = 'result';
}

// checks for user's all time record and returns custom message
function checkRecord() {
	// retrieves the user's all time best score, if it's available 
	let bestMoves = localStorage.bestMoves ? localStorage.bestMoves : null;
	if (bestMoves) {
		if (bestMoves < game.params.movesCounter) {
				return `Your all time record is ${bestMoves} ${(game.params.movesCounter === 1) ? 'move' : 'moves'}. Try harder!`;
			} else if (Number(bestMoves) === Number(game.params.movesCounter)) {
				return 'It\'s the same as your previous record!';
			} else {
				bestMoves = localStorage.bestMoves = game.params.movesCounter;
				return 'This is a new record!';
			}
	} else {
		bestMoves = localStorage.bestMoves = game.params.movesCounter;
		return 'This is a new record!';
	}
}

// 
// Card states
// 

// opens a card
function openCard (target) {
	// open the card
	target.classList.add('open');
	target.classList.add('show');
	// add to open cards list
	game.params.openCards.push(target);
}

// closes a card
function closeCard (array) {
	// loops through an array of previously opened non-matching cards
	for (let index = 0; index < array.length; index++) {
		let card = array[index];
		// shows the closing animation
		card.classList.remove('no-match');
		// enables interaction with the card
		card.addEventListener('click', clickCard);
	}
}

// matching cards
function cardsMatch() {
	// loops through the opened cards
	for(let index = 0; index < game.params.openCards.length; index++) {
		let card = game.params.openCards[index];
		// shows the matching animation
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.add('match');
	}
	// removes the matching cards from the list
	game.params.openCards = [];
}

// non-matching cards
function cardsNoMatch() {
	// loops through the opened cards
	for(let index = 0; index < game.params.openCards.length; index++) {
		let card = game.params.openCards[index];
		// shows the non-matching animation
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.add('no-match');
	}
	// creats a copy of the open cards array - allows the user to open new cards before the non-matching animation ended
	let openCardsCopy = game.params.openCards.slice();
	// runs the closing cards animation when non-validation animation ends
	setTimeout(function() {closeCard(openCardsCopy)}, 800);
	// removes the matching cards from the list - allows the user to open new cards
	game.params.openCards = [];
}

//
// Interaction
// 

function clickRestart() {
	// reset the timer
	resetTimer();
	// initialize the game - asigns card values - resets the counter
	initialize();
	// adds interaction to cards and restart button
	createInteraction();
}

// a card is clicked
function clickCard(event) {
	// asign target element to constant
	const card = event.target;
	// disable interaction
	card.removeEventListener('click', clickCard);
	// open the card
	openCard(card);
	// check match
	checkMatch();
	// check if game is over
	checkGameOver()
	// start timer on first interaction
	if(game.params.gameStarted === false){
		startTimer();
		game.params.gameStarted = true;
	}
}

// hide game over message
function clickPlayAgain() {
	// make message invisible
	game.ui.pop.classList.remove('open')
	// initialize the game
	initialize();
	// adds interaction to cards and restart button
	createInteraction();
	game.params.currentScreen = 'deck';
}

// 
// Timer
// 

// start timer
function startTimer() {
	game.params.timer = setInterval(timerFunction, 1000);
	game.params.startTime = performance.now();
}

// update timer
function timerFunction() {
	game.params.passedTime = performance.now()-game.params.startTime;
	updateTime();
}

// calculate minutes and seconds
function calculateTime() {
	const minutes = Math.floor(game.params.passedTime/60000);
	const seconds = Math.floor((game.params.passedTime-minutes*60000)/1000);
	return {seconds, minutes};
}

// create the time string for display
function determineTimeValue(seconds, minutes) {
	if(minutes < 100){
		const timeValue = `${ (minutes < 10) ? ('0'+minutes.toString()) : minutes.toString() }:${ (seconds < 10) ? ('0' + seconds.toString()) : seconds.toString() }`;
		return timeValue;
	} else {
		const timeValue = '--:--';
		resetTimer();
		return timeValue;
	}
	
}

// update game timer
function updateTime() {
	const {seconds, minutes} = calculateTime();
	const timeValue = determineTimeValue(seconds, minutes);
	game.ui.timer.textContent=timeValue;
}

function resetTimer() {
	clearInterval(game.params.timer);
	const displayTimer = document.querySelector('.timer');
	displayTimer.textContent = '00:00';
}

// 
// First run
// 


// handle game's varoab;es
const game = {};

// handle game's resources
game.resources={};

// available card values
game.resources.availableValues = [
	'fa-diamond', 
	'fa-paper-plane-o', 
	'fa-anchor', 
	'fa-cube', 
	'fa-leaf', 
	'fa-bicycle', 
	'fa-bomb', 
	'fa-bolt'
];

// intervals for rating
game.resources.movesScore = [12, 15, 18, 20, 22, 24, 26];

// states for each star - full/half/empty
game.resources.ratings = [
	'fa-star',
	'fa-star-half-full',
	'fa-star-o'
];

// handle game's DOM elements
game.ui = {};
game.ui.message = document.querySelector('.game-over .message');
game.ui.pop = document.querySelector('.game-over');
game.ui.cards = document.querySelectorAll('.card');
game.ui.moves = document.querySelector('.moves');
game.ui.stars = document.querySelectorAll('.stars .fa');
game.ui.cards = document.querySelectorAll ('.card');
game.ui.restartButton = document.querySelector('.restart-button');
game.ui.playAgainButton = document.querySelector('.game-over .play-button');
game.ui.pop = document.querySelector('.game-over');
game.ui.timer = document.querySelector('.timer');

// handles game's parameters
game.params = {};

// creates an empty list that stores the list of opened cards for match checking
game.params.openCards = [];

// counts the number of moves
game.params.movesCounter = 0;

// counts the number of matches
game.params.matchesCounter = 0;

// prepare the timer
game.params.timer;
game.params.startTime;
game.params.passedTime;
game.params.gameStarted = false;

// used to determine action based on keypress
game.params.currentScreen = 'deck';

// initialize the game - asigns card values - resets the counter
initialize();

// adds interaction to cards and restart button
createInteraction();

// adds keyboard interaction
document.addEventListener ('keyup', function (event) {
	var pressedKey = event.key || event.keyCode;
	if (pressedKey === 'r' && game.params.currentScreen === 'deck') {
		clickRestart();
	}
	if (pressedKey === 'Enter' && game.params.currentScreen === 'result') {
		clickPlayAgain();
	}
});

