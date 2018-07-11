/*
 * Create a list that holds all of your cards
 */
function getCardList() {
	var cardArr = [];
	var list = document.getElementsByClassName("deck")[0].childNodes;

	for(var i = 0; i < list.length; i++) {
		if (typeof list[i].value !== 'undefined') {
			cardArr.push(list[i].childNodes[1].className);
		};
	}

	return cardArr;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function newGame() {
	var list = shuffle(getCardList());  // Get new array of cards
	var deck = document.getElementsByClassName("deck")[0];
	var card;

	for(var i = 0; i < deck.childNodes.length; i++) {
		if (typeof deck.childNodes[i].value !== 'undefined') {
			card = list.pop();

			deck.childNodes[i].childNodes[1].className = card;
			deck.childNodes[i].className = "card";
			deck.childNodes[i].onclick = card => flipCard(card);
		};
	}

	// Reset all the global variables
	openCards = matchedCards = [];
	moves = 0;

	// Reset the moves counter
	incrementMoves(moves);

	// Reset the stars
	resetStars();

	// Reset timer
	resetTimer();
}

// When the webpage first loads up a new game is launched
newGame();

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
 var openCards, matchedCards = [];
 var starCount = 3;
 var moves, timer = 0;
 var myTimer;

function flipCard(card) {
	var deckSize = 16;

	// Check if timer is working. If not then make it work
	if(moves === 0) startTimer();

	if (card.path[0].className === "card")  {
		card.path[0].className = "card open show";

		// Push card into openCards array then check if the openCards deck has an even number of cards
		if (openCards.push(card.path[0]) && (openCards.length % 2 === 0)) {
			// If so then pop the first two from the array and begin comparing them
			var card1 = openCards.pop();
			var card2 = openCards.pop();

			// Wait 1/2 seconds to let the user see their second selection
			setTimeout(function() {
				// Increment the moves counter by 1
				incrementMoves(++moves);

				if (card1.childNodes[1].className === card2.childNodes[1].className) {
					card1.className = card2.className = "card match";

					// Push matched cards into matchedCards array that tracks all the cards that have been matched
					matchedCards.push(card1.childNodes[1].className);
					matchedCards.push(card2.childNodes[1].className);

					if (matchedCards.length >= deckSize) {
						// At this point the game is complete and the timer should stop
						stopTimer();

						var playerMessage = `<p>Congratulations!</p><p>You beat this game in ${moves} moves</p><p>You've earned ${starCount} stars!</p><p>And it took you ${timer} Seconds!</p><p>Want to play again</p>`;
						
						var modal = document.getElementById('winnerModal');
						var modalMessage = document.getElementById('modalMessage');

						// Insert player message into modal then display it
						modalMessage.innerHTML = playerMessage;
						modal.style.display = "block";
					};
				} else {
					card1.className = card2.className = "card";
				}
			}, 500);
		};
	}
}

function incrementMoves(moves) {
	document.getElementsByClassName("moves")[0].innerHTML = moves;
	monitorStars(moves);
}

function monitorStars(moves) {
	if ((moves >= 10) && (moves < 15)) {
		document.getElementsByClassName("stars")[0].childNodes[5].childNodes[0].className = "fa-star";
		starCount = 2;
	} else if (moves >= 15) {
		document.getElementsByClassName("stars")[0].childNodes[3].childNodes[0].className = "fa-star";
		starCount = 1;
	}
}

function resetStars() {
	// fill in all the stars
	document.getElementsByClassName("stars")[0].childNodes[3].childNodes[0].className = "fa fa-star";
	document.getElementsByClassName("stars")[0].childNodes[5].childNodes[0].className = "fa fa-star";

	// reset the starCount global variable to 3
	starCount = 3;
}

function resetTimer() {
	timer = 0;

	// Clear out the previous timer
	clearTimeout(myTimer);

	document.getElementsByClassName("timer")[0].innerHTML = timer;
}

function startTimer() {
	// Clear out the previous timer
	clearTimeout(myTimer);

	myTimer = setInterval(function() {
		document.getElementsByClassName("timer")[0].innerHTML = timer++;
	}, 1000);
}

function stopTimer() {
	setTimeout(function() {
		clearTimeout(myTimer);
	}, 1000);
}