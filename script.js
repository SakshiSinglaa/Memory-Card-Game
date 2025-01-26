const cards = document.querySelectorAll('.card');
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Function to flip a card
function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('hover');

    if (!firstCard) {
        // First card flipped
        firstCard = this;
    } else {
        // Second card flipped
        secondCard = this;
        checkForMatch();
    }
}

// Function to check if two flipped cards match
function checkForMatch() {
    const firstImage = firstCard.querySelector('.back-view img').src;
    const secondImage = secondCard.querySelector('.back-view img').src;

    if (firstImage === secondImage) {
        // Cards match, disable them
        disableCards();
    } else {
        // Cards do not match, unflip them after a delay
        unflipCards();
    }
}

// Disable matching cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip cards that do not match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('hover');
        secondCard.classList.remove('hover');
        resetBoard();
    }, 1000);
}

// Reset board variables
function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

// Shuffle cards at the start of the game
(function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

// Add click event listener to each card
cards.forEach(card => card.addEventListener('click', flipCard));

console.log(cards);
