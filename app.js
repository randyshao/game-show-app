const startClicked = document.querySelector('.start-btn');
const mainWindow = document.querySelector('.game-card');
const letterClicked = document.querySelector('#keyboard');
const secretPhrase = document.querySelector('#phrase');
const phraseLetters = secretPhrase.getElementsByTagName('li');
const phrases = ['Hello my name is Randy', 'Ok boomer', 'Why are you running', 'What are those', 'Peanut Butter Jelly Time'];
let wrongGuesses = 0;

startClicked.addEventListener('click', (e) => {
    e.target.parentNode.style.display = 'none';
    mainWindow.setAttribute('id', 'main');
});

function getRandomPhraseAsArray(phrases) {
    const word = phrases[Math.floor(Math.random() * phrases.length)].toUpperCase();
    const wordArray = word.split('');
    return wordArray;
    // Gets a random phrase from the array and returns an array of characters from the string
};

function addPhraseToDisplay(phrase) {

    for (i = 0; i < phrase.length; i++) {
        const slot = document.createElement('li')
        const letter = document.createTextNode(phrase[i]);
        slot.appendChild(letter);
        secretPhrase.appendChild(slot);

        if (letter.textContent === ' ') {
            slot.className = 'space';
            console.log(slot);
        } else {
            slot.className = 'letter';
            console.log(slot);
        }
    }
    // create empty slots to represent the length of the string
    // loops through the array of characters
    // for each character, create a list item and append the character to the list item, and append the li to the ul
    // if the character is a letter, add the class "letter" to the list item
};

letterClicked.addEventListener('click', (e) => {

    const buttonChosen = e.target.textContent.toUpperCase();
    checkLetter(buttonChosen);
});

function checkLetter(letter) {
    for (i = 0; i < phraseLetters.length; i++) {
        if (letter === phraseLetters[i].textContent) {
            phraseLetters[i].className = 'letter-revealed';
        }  
    }
            // loop over the letters in the word, if the value of the letter matches with a letter thats in the phrase, make it appear and return that letter.
            // else, replace a live heart with a dead heart and return "null"
            // disable chosen buttons

};

function checkWin(letter) {
    // Check to see if the number of letters with class "show", matches with the number of letters with class "letters"
    // if the number of wrong guesses is over 5, display the you lose screen card.
};

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

