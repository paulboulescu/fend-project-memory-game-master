
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

// 
function generateValues(values) {
	let cardValues = [];
	for(let i=0; i<values.length; i++) {
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
		card.addEventListener('click', openCard);
	}
}

// initialize the game
initialize();
createInteraction();