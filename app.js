const startClicked = document.querySelector('.start-btn');
const resetClicked = document.querySelectorAll('.reset-btn');
const letterClicked = document.querySelector('#keyboard');
const secretPhrase = document.querySelector('#phrase');
const lives = document.querySelectorAll('#heart');
const phrases = ['Hello my name is Randy', 'Ok boomer', 'Why are you running', 'What are those', 
                'Peanut Butter Jelly Time', 'Haters Gonna Hate'];
let guessesLeft = 5;

startClicked.addEventListener('click', (e) => {
    e.target.parentNode.style.display = 'none';
    const mainWindow = document.querySelector('.game-card');
    mainWindow.setAttribute('id', 'main');
    generatePhrase();
});

function generatePhrase() {
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
}

// Gets a random phrase from the array and returns an array of characters from the string
function getRandomPhraseAsArray(phrases) {
    const word = phrases[Math.floor(Math.random() * phrases.length)].toUpperCase();
    const wordArray = word.split('');
    return wordArray;
};

function addPhraseToDisplay(phrase) {
    for (i = 0; i < phrase.length; i++) {
        const slot = document.createElement('li')
        const letter = document.createTextNode(phrase[i]);
        slot.appendChild(letter);
        secretPhrase.appendChild(slot);

        if (letter.textContent === ' ') {
            slot.className = 'space';
        } else {
            slot.className = 'letter';
        }
    }
};

letterClicked.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const buttonChosen = e.target.textContent.toUpperCase();
        e.target.disabled = true;
        e.target.classList.add('chosen');
        const value = checkLetter(buttonChosen);
        if (value === null) {
            guessesLeft--;
            lives[guessesLeft].src = 'images/lostHeart.png';
        }
        setTimeout(function() { 
            checkWin(); 
        }, 700);
    }
});

function checkLetter(letter) {
    const phraseLetters = secretPhrase.getElementsByTagName('li');
    let letterFound = false;
    for (i = 0; i < phraseLetters.length; i++) {
        if (letter === phraseLetters[i].textContent) {
            phraseLetters[i].classList.add('show');
            letterFound = true;
        }
    } 
    if (letterFound) {
        return letter;
    } else {
        return null;
    }
};

function checkWin() {
    if (guessesLeft === 0) {
        document.querySelector('#main').style.display = 'none';
        const cover = document.querySelector('#loser-cover');
        cover.style.display = 'flex';
        cover.style.backgroundColor = '#da0d0d';
    }
    else if (document.querySelectorAll(".show").length === document.querySelectorAll(".letter").length) {
        document.querySelector('#main').style.display = 'none';
        const cover = document.querySelector('#winner-cover');
        cover.style.display = 'flex';
        cover.style.backgroundColor = '#c3127c';
    }
};

for (i = 0; i < resetClicked.length; i++) {
    resetClicked[i].addEventListener('click', (e) => {
        document.querySelector('#winner-cover').style.display = 'none';
        document.querySelector('#loser-cover').style.display = 'none';
        const phraseArray = getRandomPhraseAsArray(phrases);
        while (secretPhrase.firstChild) {
            secretPhrase.removeChild(secretPhrase.firstChild);
        }
        const newButton = document.querySelectorAll('button');
        for (i = 0; i < newButton.length; i++) {
            newButton[i].disabled = false;
            newButton[i].classList.remove('chosen');
        }
        for (j = 0; j < lives.length; j++) {
            lives[j].src = 'images/liveHeart.png';
        }
        document.querySelector('#main').style.display = 'flex';
        guessesLeft = 5;
        generatePhrase();
    });
}

