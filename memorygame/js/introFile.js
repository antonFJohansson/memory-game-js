


function startBtnGame() {

    var elem = document.getElementById('selectGame')
    elem.style.display = 'none';
    elem = document.getElementById('settingsScreenBtn');
    elem.style.display = 'inline';
    btnGame = new fullBtnGame()

}

function startWordGame() {

    var elem = document.getElementById('selectGame')
    elem.style.display = 'none';
    //elem = document.getElementById('settingsScreen');
    //elem.style.display = 'inline';
    myGame = new memorizeWordsGame();
    myGame.changeGameScreen('settings');

}

/* var elem = document.getElementById('selectGame')
elem.style.display = 'none';
myGame = new memorizeWordsGame();
myGame.changeGameScreen('settings');
 */

