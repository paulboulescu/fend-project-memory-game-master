
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


// Initialization function used every time before game starts
function initialize() {
	// select card values, two of each
	let cardValues=generateValues(availableValues);
	// shuffle the card values using the provided "shuffle" method
	cardValues=shuffle(cardValues);
	// create the HTML for each card
	createCards(cardValues);
}

// initialize the game
initialize();





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
