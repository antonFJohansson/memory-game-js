
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }



function fullBtnGame() {



    this.clickCorrectBtn = function(currId) {
        //console.log('Hej', 'b' + currId)
        //console.log(currId)
        var btnElem = document.getElementById(currId);
        //console.log(btnElem.children[0].style.backgroundColor)
        btnElem.children[0].style.backgroundColor = '#E8A800'

        numCorrectBtnPress = numCorrectBtnPress + 1;
        btnElem.setAttribute('onclick', '');
        if (numCorrectBtnPress == truePattern.length) {
            var gameTitle = document.getElementById('buttonTitle');
            gameTitle.innerHTML = 'Well done!'
            currWins = currWins + 1;
            if (currWins == numWinsToProceed) {
                currWins = 0;
                var gameTitle = document.getElementById('levelTitle');
                currLevel = currLevel + 1;
                gameTitle.innerHTML = 'Level ' + currLevel;
            }
            
            window.setTimeout(turnOffColor, 1000)
            window.setTimeout(startGame, 1500);
        }
    }

    this.clickIncorrectBtn = function(currId) {
        //console.log('Hej', 'b' + currId)
        //console.log(currId)
        var btnElem = document.getElementById(currId);
        //console.log(btnElem.children[0].style.backgroundColor)
        btnElem.children[0].style.backgroundColor = '#D63646';
        btnElem.children[0].style.borderColor = '#D63646';
        var gameTitle = document.getElementById('buttonTitle');
        gameTitle.innerHTML = 'Please try again'
        turnOffButtons();
    }

    function calcBtnPos(btnDist, numGridCols, numSquaresSide) {

        var surrGrid = Math.round((numGridCols - numSquaresSide*btnDist)/2) + 1;
        return surrGrid

    }

    function turnOffColor() {
        var currElem, currId;
        currId = 0;
        for (var i=0; i<numSquaresSide;i++) {
            
            for (var j=0; j<numSquaresSide;j++) {
                currElem = document.getElementById('b' + currId);
                currElem.children[0].style.backgroundColor = '#2D3240';
                currId = currId + 1;
            }
        }

    }


    function createBtn(currCol, currRow, currId) {

        var currBtnWrap, currBtn, currIdStr;

        currIdStr = 'b' + currId;

        currBtnWrap = document.createElement('div')
        currBtnWrap.setAttribute('id', currIdStr);
        currBtnWrap.style.gridRow = `${currRow} / ${currRow + btnDist}`;
        currBtnWrap.style.gridColumn = `${currCol} / ${currCol + btnDist}`;
        currBtn = document.createElement('div')
        currBtn.setAttribute('class', 'buttonGameBtn');
        currBtnWrap.style.backgroundColor = '#2D3240';

        if (truePattern.includes(currId)) {
            currBtn.style.backgroundColor = '#E8A800';
        }
        
        //currBtn.setAttribute('onclick', `clickCorrectBtn('${currIdStr}')`);

        currBtnWrap.appendChild(currBtn);

        return currBtnWrap
    }



    // We generate the game here

    function generateGame() {
        var gameTitle = document.getElementById('buttonTitle');
        gameTitle.innerHTML = 'Remember the pattern!'

        // If we have a game of different size we need to change the grid I think

        var parentGrid = document.getElementById('buttonGame');

        var currBtnWrap, currId, currBtn;
        currId = 0

        var currRow, currCol;
        currRow = calcBtnPos(btnDist, numGridCols, numSquaresSide);
        
        for (var i = 0; i<numSquaresSide; i++) {
            
            currCol = calcBtnPos(btnDist, numGridCols, numSquaresSide);
            console.log(currCol, currRow)
            for (var j = 0; j<numSquaresSide; j++) {
                
                
                currBtnWrap = createBtn(currCol, currRow, currId);
                parentGrid.appendChild(currBtnWrap);
                currCol = currCol + btnDist;
                
                currId = currId + 1;
            }
            currRow = currRow + btnDist;
        }

    }

    function activateGame() {
        var gameTitle = document.getElementById('buttonTitle');
        gameTitle.innerHTML = 'Can you remember the pattern?'

        var currBtn, currId, currIdStr;
        currId = 0;
        for (var i = 0; i<numSquaresSide; i++) {
            
            for (var j = 0; j<numSquaresSide; j++) {
                currIdStr = 'b' + currId;
                currBtn = document.getElementById(currIdStr);
                currBtn.children[0].style.backgroundColor = '#2D3240'

                if (truePattern.includes(currId)) {
                    currBtn.setAttribute('onclick', `btnGame.clickCorrectBtn('${currIdStr}')`);
                } else {
                    currBtn.setAttribute('onclick', `btnGame.clickIncorrectBtn('${currIdStr}')`);
                }
                
                currId = currId + 1;
            
            }
        }
    }

    function turnOffButtons() {

        var currElem, currId;
        currId = 0;
        for (var i=0; i<numSquaresSide;i++) {
            
            for (var j=0; j<numSquaresSide;j++) {
                currElem = document.getElementById('b' + currId);
                currElem.setAttribute('onclick', '');
                currId = currId + 1;
            }
        }

    }

    function removeGame() {
        var currId = 0;
        var currBtn;
        for (var i = 0; i<numSquaresSide; i++) {
            for (var j = 0; j<numSquaresSide; j++) {
                currBtn = document.getElementById('b' + currId);
                currBtn.remove();
                currId = currId + 1;
            }
        }
    }

    function startGame() {

        // If there are already buttons then we remove them.
        
        if (document.getElementById('b0') != null) {
            removeGame();
        }

        numSquaresSide = lvlToSquares[currLevel];
        numTrueSquares = Math.round(0.5*numSquaresSide*numSquaresSide);
        numCorrectBtnPress = 0;
        truePattern = [];
        for (var i = 0; i<numSquaresSide*numSquaresSide; i++) {
            truePattern.push(i)
        }
        truePattern = shuffle(truePattern).slice(0, numTrueSquares)

        generateGame()
        window.setTimeout(activateGame, timeToRemember);
    }


    this.restartGame = function() {
        currWins = 0;
        currLevel = 1;
        document.activeElement.blur();
        startGame()
    }

    this.setBtnTime = function() {

        var elem = document.getElementById('timeBtnGame')
        timeToRemember = parseInt(elem.value)*1000;
    }

    this.goBackToBtnSettings = function(){
        var elem = document.getElementById('settingsScreenBtn');
        elem.style.display = 'inline';
        elem = document.getElementById('btnGridWrap');
        elem.style.display = 'none';
    }

    this.startBtnGame = function() {
        
        var elem = document.getElementById('settingsScreenBtn');
        elem.style.display = 'none';
        elem = document.getElementById('btnGridWrap');
        elem.style.display = 'inline';


        startGame();
    }

    //var b = 'hej'
    //console.log(`I went ${b}`)
    var numGridCols = 20;
    var timeToRemember = 1000;
    var btnDist = 2;
    var numWinsToProceed = 2;


    var numSquaresSide;
    var numTrueSquares;
    var truePattern = [];
    var numCorrectBtnPress;

    var currWins = 0;
    var currLevel = 1;
    var lvlToSquares = {1: 2,
                        2: 3,
                        3: 4,
                        4: 5,
                        5: 6,
                        6: 7,
                        7: 8,
                        8: 9,
                        9: 10}


}



btnGame = new fullBtnGame()


    // So just add a settings menu and then a menu for the two games













