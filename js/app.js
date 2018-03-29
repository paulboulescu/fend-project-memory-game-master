
// 
// Initialization
// 

// Initialization function used every time before game starts
function initialize() {
	// select card values, two of each
	let cardValues=generateValues(availableValues);
	// shuffle the card values using the provided "shuffle" method
	cardValues=shuffle(cardValues);
	// create the HTML for each card
	createCards(cardValues);
	// reset matches counter
	openCards = [];
	// counts the number of moves
	movesCounter = 0;
	// counts the number of matches
	matchesCounter = 0;
	// update counter
	updateCounter();
	// prepare the timer
	gameStarted = false;
}

// generate a list with pairs of values
function generateValues(values) {
	// create an empty array
	let cardValues = [];
	// loop through the available card values
	for(let i=0; i<values.length; i++) {
		// add two of each card value to the list
		cardValues[2*i]=values[i];
		cardValues[2*i+1]=values[i];
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
	// select all cars from the DOM
	let cards = document.querySelectorAll('.card');
	// use counter to select each value from the shuffled card values
	let counter = 0;
	// loop over each of the selected card Elements
	for (card of cards){
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
	// select the 'Moves' element
	const moves = document.querySelector('.moves');
	// update number of moves

	moves.textContent=`${movesCounter} ${ (movesCounter==1) ? 'Move' : 'Moves'}`;

	// select all stars from the DOM
	const stars = document.querySelectorAll('.stars .fa');
	// loop over each of the selected stars
	for (let starIndex = 0; starIndex < stars.length; starIndex++) {
		// determine the rank for current score
		let scoreIndex = 0;
		while (movesCounter>movesScore[scoreIndex]){
			scoreIndex++;
		}
		// determine state for each star (full/half/empty)
		let currentRating = Math.max(Math.min(scoreIndex-2*starIndex, ratings.length-1),0);
		for (let ratingIndex = 0; ratingIndex<ratings.length ; ratingIndex++){
			if (ratingIndex === currentRating){
				stars[stars.length-1-starIndex].classList.add(ratings[ratingIndex]);
			}else{
				stars[stars.length-1-starIndex].classList.remove(ratings[ratingIndex]);
			}
		}
	}
}

// add event listeners for all interactive elements
function createInteraction(){
	// select all cards from the DOM
	let cards = document.querySelectorAll ('.card');
	// loop over each of the selected card elements
	for (let card of cards){
		// add event listeners for cards
		card.addEventListener('click', clickCard);
	}
	// select the restart button
	let restart = document.querySelector('.restart');
	// add event lister for restart
	restart.addEventListener('click', clickRestart);

	let playAgain = document.querySelector('.game-over .play-button');
	playAgain.addEventListener('click', clickPlayAgain);
}

// 
// Game states
// 

// checks if two matching cards are opened
function checkMatch() {
	// chck if two cards are opened
	if (openCards.length==2) {
		// check if cards values match
		if (openCards[0].firstElementChild.className==openCards[1].firstElementChild.className) {
			//update matches counter
			matchesCounter++;
			// cards values match
			cardsMatch();
		} else{
			// cards values don't match
			cardsNoMatch();
		}
		// increse moves counter
		movesCounter++;
		// update moses counter
		updateCounter();
	}
}

// check if game is over
function checkGameOver() {
	if(matchesCounter===availableValues.length){
		console.log("urmeaza sa arat end message");
		showEndMessage();
		resetTimer()
	}
}

// show game over message
function showEndMessage() {
	const pop = document.querySelector('.game-over');
	// make message visible
	pop.classList.add('open')
	const message = document.querySelector('.game-over .message');
	// determine the number of stars
	let scoreIndex = 0;
	while (movesCounter>movesScore[scoreIndex]){
		scoreIndex++;
	}
	const noOfStars = (3-(Math.min(scoreIndex , movesScore.length - 1)*0.5));
	const {seconds, minutes} = calculateTime();
	const timeValue = determineTimeValue(seconds, minutes);
	const recordMessage = checkRecord();
	// show custom message
	message.textContent=`In ${timeValue}, with ${movesCounter} ${ (movesCounter==1) ? 'move' : 'moves'}, and ${noOfStars} ${ (noOfStars==1) ? 'star' : 'stars'}. ${recordMessage}`;
	currentScreen = 'result';
}


// checks for user's all time record and returns custom message
function checkRecord() {
	// retrieves the user's all time best score, if it's available 
	let bestMoves = localStorage.bestMoves ? localStorage.bestMoves : null;
	if (bestMoves){
		if(bestMoves < movesCounter) {
				return `Your all time record is ${bestMoves} ${ (movesCounter==1) ? 'move' : 'moves'}. Try harder!`;
			} else if (Number(bestMoves) === Number(movesCounter)) {
				return 'It\'s the same as your previous record!';
			} else {
				bestMoves = localStorage.bestMoves = movesCounter;
				return 'This is a new record! 2';
			}
	} else {
		bestMoves = localStorage.bestMoves = movesCounter;
		return 'This is a new record! 1';
	}
}

// localStorage.removeItem("bestMoves");


// 
// Card states
// 

// opens a card
function openCard(target) {
	// open the card
	target.classList.add('open');
	target.classList.add('show');
	// add to open cards list
	openCards.push(target);
}

// closes a card
function closeCard(array) {
	// loops through an array of previously opened non-matching cards
	for(let index = 0; index < array.length; index++) {
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
	for(let index = 0; index < openCards.length; index++) {
		let card = openCards[index];
		// shows the matching animation
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.add('match');
	}
	// removes the matching cards from the list
	openCards=[];
}

// non-matching cards
function cardsNoMatch() {
	// loops through the opened cards
	for(let index = 0; index < openCards.length; index++) {
		let card = openCards[index];
		// shows the non-matching animation
		card.classList.remove('open');
		card.classList.remove('show');
		card.classList.add('no-match');
	}
	// creats a copy of the open cards array - allows the user to open new cards before the non-matching animation ended
	let openCardsCopy=openCards.slice();
	// runs the closing cards animation when non-validation animation ends
	setTimeout(function(){closeCard(openCardsCopy)},800);
	// removes the matching cards from the list - allows the user to open new cards
	openCards=[];
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
	if(gameStarted===false){
		startTimer();
		gameStarted=true;
	}
}

// hide game over message
function clickPlayAgain() {
	const pop = document.querySelector('.game-over');
	// make message invisible
	pop.classList.remove('open')
	// initialize the game
	initialize();
	// adds interaction to cards and restart button
	createInteraction();
	currentScreen = 'deck';
}

// 
// Timer
// 

// start timer
function startTimer() {
	gameTimer = setInterval(timerFunction, 1000);
	startTime = performance.now();
}

// update timer
function timerFunction() {
	passedTime = performance.now()-startTime;
	updateTime();
}

// calculate minutes and seconds
function calculateTime() {
	const minutes = Math.floor(passedTime/60000);
	const seconds = Math.floor((passedTime-minutes*60000)/1000);
	return {seconds, minutes};
}

// create the time string for display
function determineTimeValue(seconds, minutes) {
	if(minutes<100){
		const timeValue=`${ (minutes<10) ? ('0'+minutes.toString()) : minutes.toString() }:${ (seconds<10) ? ('0'+seconds.toString()) : seconds.toString() }`;
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
	const displayTimer = document.querySelector('.timer');
	const timeValue = determineTimeValue(seconds, minutes);
	displayTimer.textContent=timeValue;
}

function resetTimer() {
	clearInterval(gameTimer);
	const displayTimer = document.querySelector('.timer');
	displayTimer.textContent='00:00';
}

// 
// First run
// 

// available card values
const availableValues=[
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
const movesScore=[12, 15, 18, 20, 22, 24, 26]

// states for each star - full/half/empty
const ratings=[
	'fa-star',
	'fa-star-half-full',
	'fa-star-o'
]

// creates an empty list that stores the list of opened cards for match checking
let openCards = [];

// counts the number of moves
let movesCounter = 0;

// counts the number of matches
let matchesCounter = 0;

// prepare the timer
let gameTimer;
let startTime;
let passedTime;
let gameStarted = false;

// used to determine action based on keypress
let currentScreen = 'deck';

// initialize the game - asigns card values - resets the counter
initialize();

// adds interaction to cards and restart button
createInteraction();

// adds keyboard interaction
document.addEventListener('keyup', function (event) {
	var key = event.key || event.keyCode;
	if (key === 'r' && currentScreen === 'deck') {
		clickRestart();
	}
	if (key === 'Enter' && currentScreen === 'result') {
		clickPlayAgain();
	}
});

