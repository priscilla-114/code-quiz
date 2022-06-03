var beginQuiz = document.querySelector("#beginButton");
var leaderButton = document.querySelector("#leaderButton");
var timerDisplay = document.querySelector(".timer");
var gameCard = document.querySelector("#gameCard");
var question = document.querySelector("#question");
var mcA = document.querySelector("#mcA");
var mcB = document.querySelector("#mcB");
var mcC = document.querySelector("#mcC");
var mcD = document.querySelector("#mcD");
var answer = document.querySelector("#answer");
var feedback = document.querySelector("#feedback1");
var card = document.querySelector("multipleChoice");
var inputForm = document.querySelector("#inputForm");
var scoreCard = document.querySelector("#scoreCard");
var scoreButton = document.querySelector("#scoreButton")
var initialsBox = document.querySelector("#initialsBox");
var submitButton = document.querySelector("#submitButton")
var backButton = document.querySelector("#backButton");
var clearButtton = document.querySelector("#clearButton");
var start = document.querySelector(".start");

var timeLeft = questionBank.length * 6;
var q = 0;
var s = 0;
var score = 0;
var scorelist = [];
var timeInterval;

getScore();

/* timer for quiz */
function timer() {
    timeInterval = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = "Timer: " + timeLeft;

        if (timeLeft === 0 || q >= questionBank.length) {
            clearInterval(timeInterval);
            gameOver();
        }
    }, 1000);
}

/* selecting questions and answers from questionBank */
function displayQA() {
    if (q < questionBank.length) {
        question.textContent = questionBank[q].question;
        mcA.textContent = questionBank[q].selection[0];
        mcB.textContent = questionBank[q].selection[1];
        mcC.textContent = questionBank[q].selection[2];
        mcD.textContent = questionBank[q].selection[3];
    } else {
        gameOver();
    }
}

/* informing player if chosen answer is correct or incorrect */
function compareAnswer(event) {
    if (q >= questionBank.length) {
        gameOver();
        clearInterval(timeInterval);
    } else {
        if (event === questionBank[q].answer) {
            feedback1.textContent = "Correct! c:";
        } else {
            timeLeft -= 10;
            feedback1.textContent = "Incorrect! :c";
        }
        score = timeLeft;
        q++;
        displayQA();
        }
    }

/* retrieving scores from local storage */
function getScore() {
    var storedScore = JSON.parse(localStorage.getItem("highScore"));
    if (storedScore !== null) {
        scoreList = storedScore;
    }
}

/* storing score to local storage */
function saveScore() {
    localStorage.setItem("highScore", JSON.stringify(scoreList));
}

/* displaying and hiding items */
function gameOver() {
    scoreButton.innerHTML = score;
    scoreButton.style.display = "inline-block";
    gameCard.classList.add("hide");
    inputForm.classList.remove("hide");
    timerDisplay.classList.add("hide");
    leaderButton.classList.add("hide");
    leaderBoard();
}

/* adding player initials to leader board */
function addToLeaderBoard () {
    leaderBoardDiv = document.createElement("div");
    leaderBoardDiv.setAttribute("id", "playerInitials");
    document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
}

/*deleting player initials to leader board */
function removeFromLeaderBoard() {
    var removeScores = document.getElementById("playerInitials");
    if (removeScore !== null) {
        removeScore.remove();
    } else {
    }
}

/* event listeners */
beginQuiz.addEventListener("click", function (event) {
    timer();
    displayQA();
    start.classList.add("hide");
    gameCard.classList.remove("hide");
    leaderButton.style.display = "none";
    scoreCard.classList.add("hide");
});

card.addEventListener("click", function (event) {
    var event = event.target;
    compareAnswer(event.textContent.trim());
});

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var playerInitials = initalsBox.value.trim();
    var newScore = {
        player: playerInitials,
        score: score,
    };

    scoreList.push(newScore);
    saveScore();
    leaderBoard();
    inputForm.classList.add("hide");
    scoreCard.classList.remove("hide");
});

leaderButton.addEventListener("click", function (event) {
    scoreCard.classList.remove("hide");
    leaderButton.classList.add("hide");
    start.classList.add("hide");
    leaderBoard();
});
