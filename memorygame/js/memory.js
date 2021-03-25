





//document.querySelector("#ShowButton").innerHTML = 'Bajs'

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

  // Drop file here

function memorizeWordsGame() {

    
    var wordDiv = document.getElementById('wordGame');
    wordDiv.style.display = 'inline'

    
    this.wordsShowing = 0;

    this.numWords = allWords.length;
    this.wordList = allWords;
    
    this.startTime;
    this.endTime;
    this.endGameByTimeId;
    
    this.settingsNumWords;
    this.settingsTimePerWord;
    this.settingsFontSize;

    this.storeText;
    
    this.shuffledIds = [];

    this.maxWords = 500;
    
    // Only for debugging
   // this.numWords = 3;
   //this.wordList = ['Hejsan', 'Dat', 'Ar']


    
    this.endGameByTime = function() {
        myGame.wordsShowing = 0;
        myGame.switchWordGameMode();    
    }
    
    // I cannot have this in this function 
        // Because when we pass it through window.setTimeout then it will inherit from a
        // different this.
    this.updateTimer = function() {
        if (myGame.wordsShowing == 0) {
            var fullGameTime = myGame.settingsNumWords*myGame.settingsTimePerWord*1000;
            var currTime = new Date();
            var timeElem = document.getElementById("gridGameTitleTime")  
            timeElem.innerHTML = Math.round((fullGameTime - (currTime - myGame.startTime))/1000) + ' s';
            window.setTimeout(myGame.updateTimer, 100);
        }
    }

    this.createWords = function() {

            this.removeGame()
            let timeForGame = this.settingsNumWords*this.settingsTimePerWord*1000;
            
            // Create shuffled ids for a random word list each time
            for (var i=0; i<this.numWords; i++){
                this.shuffledIds[i] = i;
            }
        
            shuffle(this.shuffledIds);
        
        
            const gridDiv = document.createElement("div");
            gridDiv.setAttribute("id", "gridGame");
        
            timeDiv = document.createElement("div");
            timeDiv.setAttribute("id", "gridGameTitleTime");
            timeDiv.innerHTML =  timeForGame/1000 + ' s';
            gridDiv.appendChild(timeDiv);
        
            titleDiv = document.createElement("div");
            titleDiv.setAttribute("id", "gridGameTitleText");
            titleDiv.innerHTML = 'Remember these words';
            gridDiv.appendChild(titleDiv);
        
            // Create the word list
            for (var i=0; i<this.settingsNumWords; i++){
                wordDiv = document.createElement("div");
                wordDiv.setAttribute("class", "wordGrid");
                currId = this.shuffledIds[i];
                wordDiv.innerHTML = this.wordList[currId];
                gridDiv.appendChild(wordDiv);
            }
        
            gridDiv.style.fontSize = this.settingsFontSize + 'px';
        
            const currentDiv = document.getElementById("wordGame");
            
            document.body.insertBefore(gridDiv, currentDiv);
        
            this.endGameByTimeId = window.setTimeout(this.endGameByTime, timeForGame);
            window.setTimeout(this.updateTimer, 200);
        
            var btnElem = document.getElementById("submitBtn")
            btnElem.innerText = 'Done';
            window.scrollTo(0,0);
    }

    this.removeGame = function() {

            var element = document.getElementById("gridGame");
            
            // To avoid issues when we clear the board and nothing is present.
            if (element) {
                element.remove();
            
                var element = document.getElementsByClassName("memoryText");
                if (element.length >0){
                    element[0].remove();
            }
            
            
            }
            window.clearTimeout(this.endGameByTimeId);
    }

        this.obtainGuess = function() {

            this.removeGame();
        
            const gridDiv = document.createElement("div");
            gridDiv.setAttribute("id", "gridGame");
        
            titleDiv = document.createElement("div");
            titleDiv.setAttribute("id", "gridGameAnswerText");
            titleDiv.innerHTML = 'Which words can you remember?';
            gridDiv.appendChild(titleDiv);
        
            // Create text fields to input words
            for (var i=0; i<this.settingsNumWords; i++){
                labelDiv = document.createElement("div");
                labelDiv.innerHTML = i + ':';
                labelDiv.className = "gridLabel";
                gridDiv.appendChild(labelDiv);
        
                inputDiv = document.createElement("div");
                inputDiv.setAttribute("class", "inputGrid");
                var answer = document.createElement("input");
                answer.type = "text";
                answer.id = 'answer' + i;
                answer.className = 'gridInputForm';
                answer.style.fontSize = this.settingsFontSize + 'px';
                inputDiv.appendChild(answer);
                gridDiv.appendChild(inputDiv);
        
            }
        
            gridDiv.style.fontSize = this.settingsFontSize + 'px';
        
        
            const currentDiv = document.getElementById("wordGame");
            document.body.insertBefore(gridDiv, currentDiv);
        
            var btnElem = document.getElementById("submitBtn")
            btnElem.innerText = 'Submit';
            window.scrollTo(0,0);
    }

    this.checkAnswer = function() {

            var trueAnswers = [];
            for (var i=0; i< this.numWords; i++){
                currInd = this.shuffledIds[i];
                trueAnswers[i] = this.wordList[currInd];
            }
        
            var numCorr = 0;
            var writtenAnswer;

            // Check the answers the user put in with the correct ones
            for (var i=0; i < this.settingsNumWords; i++){
                userAnswer = document.getElementById('answer' + i);
                
                writtenAnswer = userAnswer.value.toLowerCase();
                
                if (writtenAnswer == trueAnswers[i].toLowerCase()) {
                    numCorr = numCorr + 1;
                    userAnswer.style.backgroundColor = '#4CFA7D';
                } else {
                    userAnswer.style.backgroundColor = '#FA3261';
                }
            }
        
            var resString = '';
            resString = "Score: " + numCorr + ' / ' + this.settingsNumWords + '.';
            resString = resString + ' Time taken: ' + (Math.round((this.endTime - this.startTime)/100))/10 + 's.';
            
            const newDiv = document.createElement("div");
            newDiv.setAttribute("class", "memoryText");
            newDiv.innerHTML = resString;
            newDiv.style.fontSize = this.settingsFontSize + 'px';
            newDiv.style.color = '#E8A800';
        
            const currentDiv = document.getElementById("wordGame");
            document.body.insertBefore(newDiv, currentDiv);
        
            var btnElem = document.getElementById("submitBtn")
            btnElem.innerText = 'Play again';
            window.scrollTo(0,document.body.scrollHeight);
    }

        // Switch between memorizing words, inputting them and verifying answers
    this.switchWordGameMode = function(){
        if (this.wordsShowing == 0) {
            this.wordsShowing = 1;
            this.endTime = new Date();
            this.obtainGuess();
            
        } else if (this.wordsShowing == 1){
            this.checkAnswer();
            this.wordsShowing = 2;
        } else {
            this.startTime = new Date();
            this.createWords();
            this.wordsShowing = 0;
        }
        
            
    }

    this.setFontSize = function() {
        var settingsFontSizeElem = document.getElementById('fontSizeField');
        var settingsExampleText = document.getElementById('settingsExampleText');
        this.settingsFontsize = Math.min(settingsFontSizeElem.value, 50);
        this.settingsFontsize = Math.max(this.settingsFontsize, 5);
        settingsFontSizeElem.value = this.settingsFontsize;
        settingsExampleText.style.fontSize = this.settingsFontsize + 'px';
        
    }
    
    this.setSettingsWords = function() {
        var settingsNumWordsElem = document.getElementById('numWordsField');
        //settingsNumWordsElem.max = this.numWords;
        settingsNumWordsElem.max = Math.min(this.numWords, this.maxWords);
    
        var settingsNumWordsText = document.getElementById('numWordsText');
        settingsNumWordsText.innerHTML = Math.min(this.numWords,this.maxWords);
        //settingsNumWordsText.innerHTML = 500;
        
        this.settingsNumWords = Math.min(settingsNumWordsElem.value, settingsNumWordsElem.max);
        this.settingsNumWords = Math.max(this.settingsNumWords, 1);
        settingsNumWordsElem.value = this.settingsNumWords;
        
    }
    
    this.setSettingsDuration = function() {
        var settingsDurationElem = document.getElementById('durationField');
        
        this.settingsTimePerWord = Math.max(settingsDurationElem.value, 1);
        settingsDurationElem.value = this.settingsTimePerWord;
        
    }

    this.settingsBtn = function() {

        var settingsDurationElem = document.getElementById('durationField');
        var settingsNumWordsElem = document.getElementById('numWordsField');
        var settingsFontSizeElem = document.getElementById('fontSizeField');
    
        this.settingsTimePerWord = settingsDurationElem.value;
        this.settingsNumWords = settingsNumWordsElem.value;
        this.settingsFontSize = settingsFontSizeElem.value;
        
        this.wordsShowing = 0;
        this.changeGameScreen('wordGame')
    }
    
    // Go back to settings from the game
    this.goBackToSettings = function() {
        window.clearTimeout(this.endGameByTimeId);
        this.wordsShowing = 1;
        this.removeGame();
        var elem = document.getElementById("gridBtnWrap");
        elem.style.display = 'none';
        this.changeGameScreen('settings');
    }

    // To go between the game screens associated with the word game
    this.changeGameScreen = function(nextScrn){
        if (nextScrn == 'wordGame'){
            // Remove and add div elements
            var settingsElem = document.getElementById('settingsScreen');
            settingsElem.style.display = 'none';
            this.startTime = new Date();
    
            var settingsElem = document.getElementById('settingsScreen');
            settingsElem.style.display = 'none';
            var wrapElem = document.getElementById('gridBtnWrap');
            wrapElem.style.display = 'grid';
            this.createWords();
        }
        else if (nextScrn == 'settings'){
            // Remove and add div elements
            //var dropZone = document.getElementById('drop_zone');
            //dropZone.style.display = 'none';
            var settingsElem = document.getElementById('settingsScreen');
            settingsElem.style.display = 'grid';
    
            this.setSettingsWords();
    
    
        } /* else if (nextScrn == 'dropWordFile') {
            var dropZone = document.getElementById('drop_zone');
            dropZone.style.display = 'flex';
            dropZone.addEventListener('dragover', wordGameHandleDragOver, false);
            dropZone.addEventListener('dragleave', wordGameHandleDragLeave, false);
            dropZone.addEventListener('drop', wordGameHandleFileSelect, false);
        } */
    }
            

}


//console.log(allWords)

//myGame = new memorizeWordsGame();
//myGame.changeGameScreen('settings');

// So I should just make the other game here
// And then enable us to switch between them



