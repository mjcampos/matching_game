var playYes = document.getElementById('playYes');
var playNo = document.getElementById('playNo');
var modal = document.getElementById('winnerModal');
var modalMessage = document.getElementById('modalMessage');

// Set initial click events for modal panel
playYes.onclick = function() {
	newGame();
	modal.style.display = "none";
	modalMessage.innerHTML = "";
}

playNo.onclick = function() {
	modal.style.display = "none";
	modalMessage.innerHTML = "";
}