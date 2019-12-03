const startClicked = document.querySelector('.start-btn');
const mainWindow = document.querySelector('.game-card');

startClicked.addEventListener('click', (e) => {
    e.target.parentNode.style.display = 'none';
    mainWindow.setAttribute('id', 'main');
});