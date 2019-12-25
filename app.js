const startClicked = document.querySelector('.start-btn');
const resetClicked = document.querySelectorAll('.reset-btn');
const mainWindow = document.querySelector('.game-card');
const letterClicked = document.querySelector('#keyboard');
const secretPhrase = document.querySelector('#phrase');
const phraseLetters = secretPhrase.getElementsByTagName('li');
const phrases = ['Hello my name is Randy', 'Ok boomer', 'Why are you running', 'What are those', 'Peanut Butter Jelly Time'];
let guessesLeft = 5;

startClicked.addEventListener('click', (e) => {
    e.target.parentNode.style.display = 'none';
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
        e.target.childNodes.disabled = true;
        e.target.classList.add('chosen');
        console.log(buttonChosen);
        console.log(secretPhrase);
        const value = checkLetter(buttonChosen);
    
        if (value === null) {
            guessesLeft--;
            const heartMeter = document.querySelector('#heart-meter');
            const lives = heartMeter.getElementsByTagName('li');
            console.log(guessesLeft)
            lives[guessesLeft].src = 'images/lostHeart.png';
        }

        checkWin();
    }
});

function checkLetter(letter) {
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
        document.querySelector('#main').style.display = 'flex';
        guessesLeft = 5;
        generatePhrase();
    });
}

