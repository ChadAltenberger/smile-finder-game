let numberOfFaces = 5;
const theLeftSide = document.querySelector('#leftSide');
const theRightSide = document.querySelector('#rightSide');

let numTries = 0;

function generateFaces() {
  for (i = 0; i < numberOfFaces; i++) {
    let face = document.createElement('img');
    face.src = '../assets/images/smile.png';

    let randomTop = Math.floor(Math.random() * 400) + 1;
    let randomLeft = Math.floor(Math.random() * 400) + 1;
    face.style.top = randomTop + 'px';
    face.style.left = randomLeft + 'px';

    theLeftSide.appendChild(face);
  }

  const leftSideImages = theLeftSide.cloneNode(true);
  leftSideImages.removeChild(leftSideImages.lastChild);
  theRightSide.appendChild(leftSideImages);

  theLeftSide.lastChild.addEventListener('click', nextLevel);
  document.body.addEventListener('click', gameOver);
}

function gameOver() {
  alert(`Game over! You completed ${numTries} attempts!`);

  document.body.removeEventListener('click', gameOver);
  leftSideImages.removeEventListener('click', nextLevel);
}

function nextLevel() {
  event.stopPropagation();

  while (theLeftSide.firstChild) {
    theLeftSide.removeChild(theLeftSide.firstChild);
  }
  while (theRightSide.firstChild) {
    theRightSide.removeChild(theRightSide.firstChild);
  }

  numberOfFaces += 5;
  generateFaces();

  numTries++;
}
