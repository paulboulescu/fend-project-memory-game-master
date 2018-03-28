
// list with all the available card values
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

function createCards(values) {
	// select all cars from the DOM
	let cards = document.querySelectorAll('.card .fa');
	// use counter to select each value from the shuffled card values
	let counter = 0;
	// loop over each of the selected card Elements
	for (card of cards){
		// add value to display through class
		card.classList.add(values[counter]);
		counter++;
	}
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

function resetScore() {
	// select all stars from the DOM
	const stars = document.querySelectorAll('.stars .fa');
	// loop over each of the selected stars
	for (let star of stars){
		// add full star value
		star.classList.add('fa-star');
		// remove any hald star value
		star.classList.remove('fa-star-half-full');
		// remove and empty star value
		star.classList.remove('fa-star-o');
	}
	// select the 'Moves' element
	const moves = document.querySelector('.moves');
	// reset the 'Moves' element counter to 0
	moves.textContent='0';
}

// Initialization function used every time before game starts
function initialize() {
	// select card values, two of each
	let cardValues=generateValues(availableValues);
	// shuffle the card values using the provided "shuffle" method
	cardValues=shuffle(cardValues);
	// create the HTML for each card
	createCards(cardValues);
	// reset the score
	resetScore();
}

// add event listeners for all interactive elements
function createInteraction(){
	// select all cards from the DOM
	let cards = document.querySelectorAll('.card');
	// loop over each of the selected card elements
	for (let card of cards){
		// add event listeners for cards
		card.addEventListener('click', clickCard);
	}
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
}

// opens a card
function openCard(target) {
	// open the card
	target.classList.add('open');
	target.classList.add('show');
	// add to open cards list
	openCards.push(target);
}

// checks if two matching cards are opened
function checkMatch() {
	// chck if two cards are opened
	if (openCards.length==2) {
		// check if cards values match
		if (openCards[0].firstElementChild.className==openCards[1].firstElementChild.className) {
			// cards values match
			cardsMatch();
		} else{
			// cards values don't match
			cardsNoMatch();
		}
	}
}

// matching cards
function cardsMatch() {
	// loops through the opened cards
	for(let indexCount = 0; indexCount < openCards.length; indexCount++) {
		let card = openCards[indexCount];
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
	for(let indexCount = 0; indexCount < openCards.length; indexCount++) {
		let card = openCards[indexCount];
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

// closes a card
function closeCard(array) {
	// loops through an array of previously opened non-matching cards
	for(let indexCount = 0; indexCount < array.length; indexCount++) {
		let card = array[indexCount];
		// shows the closing animation
		card.classList.remove('no-match');
		// enables interaction with the card
		card.addEventListener('click', clickCard);
	}
}

// initialize the game - asigns card values - resets the counter
initialize();
// adds interaction to cards and restart button
createInteraction();
// creates an empty list that stores the list of opened cards for match checking
let openCards=[];