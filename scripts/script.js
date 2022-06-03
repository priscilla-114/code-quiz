var score = 0;
var questionIndex = 0;

/* DOM elements */
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");
var highscoreLink = document.querySelector(".highscore-link")
var playAgainLink = document.querySelector("#goBack")
var clearLink = document.querySelector("#clear");
var questionContainer = document.querySelector(".question-container");
var highscoreContainer = document.querySelector(".highscore-container");

/* timer variables */
var timer = document.querySelector("#start");
var currentTime = document.querySelector("#currentTime");
var secondsLeft = 61;
var holdInterval = 0;
var penalty = 5;
var ulCreate = document.createElement("ul");

/* timer for quiz */
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "00:" + secondsLeft;
            if (secondsLeft < 10) {
                currentTime.textContent = "00:0" + secondsLeft;
            }
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                gameOver();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
    return
});

/* questions and their selections */
var questions = [
    {
        title: "What is one plus one?",
        choices: ["two", "seven", "four", "thirty"],
        answer: "two"
    },

    {
        title: "Commonly used data types DO not include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    
    {
        title: "The condition in an if / else statement is enclosed with _________.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis"
    },
    
    {
        title: "Arrays in Javascript can be used to store _________.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    
    {
        title: "String values must be enclosed within _________ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
    
];

/* puts questions and selections on page */
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    
/* makes sure questions are looped through */
for (var i = 0; i < questions.length; i++) {
    var userQuestion = questions[questionIndex].title;
    var userChoices = questions[questionIndex].choices;
    questionsDiv.textContent = userQuestion;
}

var rule = document.createElement("hr");
questionsDiv.appendChild(rule);
userChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    var listBtn = document.createElement("btn")
    questionsDiv.appendChild(ulCreate);
    listBtn.textContent = newItem;
    ulCreate.appendChild(listItem);
    listItem.appendChild(listBtn);
    listBtn.setAttribute("class", "btn");
    listBtn.addEventListener("click", (compare));
});
var rule = document.createElement("hr");
questionsDiv.appendChild(rule);
};

/* informing player if chosen answer is correct or incorrect */
function compare(event) {
    var element = event.target;

    if (element.matches("btn")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // correct condition 
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is  " + questions[questionIndex].answer;
        // incorrect condition 
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect! The correct answer is  " + questions[questionIndex].answer;
        };
    };

/* determines number question user is on */
    questionIndex++;
    if (questionIndex >= questions.length) {
        gameOver();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    };
    questionsDiv.appendChild(createDiv);
};

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

/* attempt at a joke button that i spent too much time on */
const btn = document.getElementById("btn");

promptButton.addEventListener("click", ()=>{

    if(btn.innerText === "Do I Hafta?"){
        btn.innerText = "Yup, You Gotta :c";
    }else{
        btn.innerText= "Do I Hafta?";
    }
});
