const theLeftSide = document.querySelector('#leftSide');
const theRightSide = document.querySelector('#rightSide');

const easyNumFaces = 2;
const normalNumFaces = 3;
const hardNumFaces = 5;

let numTries = 0;
let numberOfFaces;

// Difficulty Level buttons
const easyBtn = document.querySelector('#easy');
const normalBtn = document.querySelector('#normal');
const hardBtn = document.querySelector('#hard');

// Button click events
easyBtn.addEventListener('click', easyLevelHandler);
normalBtn.addEventListener('click', normalLevelHandler);
hardBtn.addEventListener('click', hardLevelHandler);

const turnOffButtons = () => {
	easyBtn.removeEventListener('click', easyLevelHandler);
	normalBtn.removeEventListener('click', normalLevelHandler);
	hardBtn.removeEventListener('click', hardLevelHandler);
};

// Button click handler functions
function easyLevelHandler() {
	generateFaces(easyNumFaces);
	theLeftSide.scrollIntoView();
	turnOffButtons();
	numberOfFaces = 2;
}

function normalLevelHandler() {
	generateFaces(normalNumFaces);
	theLeftSide.scrollIntoView();
	turnOffButtons();
	numberOfFaces = 3;
}

function hardLevelHandler() {
	generateFaces(hardNumFaces);
	theLeftSide.scrollIntoView();
	turnOffButtons();
	numberOfFaces = 5;
}

// Gernerate Faces function
function generateFaces(number) {
	for (i = 0; i < number; i++) {
		let face = document.createElement('img');
		face.src = 'https://chadaltenberger.github.io/smile-finder-game/smile.png';

		// Check screen size: if small then make the random area smaller
		if (window.innerWidth < 500) {
			let randomTop = Math.floor(Math.random() * 100) + 1;
			let randomLeft = Math.floor(Math.random() * 100) + 1;
			face.style.top = randomTop + 'px';
			face.style.left = randomLeft + 'px';
		} else {
			let randomTop = Math.floor(Math.random() * 400) + 1;
			let randomLeft = Math.floor(Math.random() * 400) + 1;
			face.style.top = randomTop + 'px';
			face.style.left = randomLeft + 'px';
		}

		theLeftSide.appendChild(face);
	}

	const leftSideImages = theLeftSide.cloneNode(true);
	leftSideImages.removeChild(leftSideImages.lastChild);
	theLeftSide.addEventListener('click', gameOver);
	theRightSide.appendChild(leftSideImages);

	theLeftSide.lastChild.addEventListener('click', nextRound);
}

// Next Round function
function nextRound() {
	event.stopPropagation();

	while (theLeftSide.firstChild) {
		theLeftSide.removeChild(theLeftSide.firstChild);
	}
	while (theRightSide.firstChild) {
		theRightSide.removeChild(theRightSide.firstChild);
	}

	numberOfFaces += numberOfFaces;
	generateFaces(numberOfFaces);

	numTries++;
}

// Game Over function
function gameOver() {
	alert(`Game over! You completed ${numTries} rounds!`);

	function removeAllChildNodes(parent) {
		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
	}
	const lContainer = document.querySelector('#leftSide');
	const rContainer = document.querySelector('#rightSide');
	removeAllChildNodes(lContainer);
	removeAllChildNodes(rContainer);

	alert('Play again');

	window.scrollTo(0, 0);
	// gameIsRunning = false;

	easyBtn.addEventListener('click', easyLevelHandler);
	normalBtn.addEventListener('click', normalLevelHandler);
	hardBtn.addEventListener('click', hardLevelHandler);

	// document.body.removeEventListener('click', gameOver);
	leftSideImages.removeEventListener('click', nextRound);
}

window.onbeforeunload = () => window.scrollTo(0, 0);

if (window.innerWidth < 500) {
	let text = document.querySelector('.instructions-text');
	text.innerHTML = 'Click on the extra smiley face on the top.';
}
