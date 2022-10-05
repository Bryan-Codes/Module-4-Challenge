var questions = [
    {
        title: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        choices: ["Throws an error", "Ignores the statements", "Gives a warning", "None of the above"],
        answer: "Ignores the statements"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "Repeats until a specific condition becomes false:",
        choices: ["What is the DOM?", "Do While Loop", "For Loop Example", "What is a variable?"],
        answer: "For Loop Example"
    },
    {
        title: "Returns the first Element within the document that matches the specified selector, or group of selectors, or null, if no matches are found.",
        choices: ["What is variable 'Hoisting'", "document.querySelectorAll()", "Multi Paradigm Language", "document.querySelector()"],
        answer: "document.querySelector()"
    },
    {
        title: "Can read and alter the elements on a webpage",
        choices: ["addEventListener", "For Loop Example", "intervalid", ".innerHTML"],
        answer: ".innerHTML"
    },
    {
        title: "Which of the following methods is used to access HTML elements using Javascript?",
        choices: ["getElementById()", "getElementByClassName()", "Both A and B", "None of the above"],
        answer: "Both A and B"
    },
    {
        title: "Which of the following keywords is used to define a variable in Javascript?",
        choices: ["var", "let", "both A and B", "none of the above"],
        answer: "both A and B"
    },
    {
        title: "Javascript is an _______ language?",
        choices: ["object-oriented", "object-based", "procedural", "none of the above"],
        answer: "object-oriented"
    },
];

var secondsLeft = 70;
var timerInterval;

var timerElement = document.getElementById("timer");
var choiceOneEl = document.getElementById("answerOneBtn");
var choiceTwoEl = document.getElementById("answerTwoBtn");
var choiceThreeEl = document.getElementById("answerThreeBtn");
var choiceFourEl = document.getElementById("answerFourBtn");
var takeQuizPane = document.getElementById("takeQuiz");
var sScore = document.getElementById("finalScore");
var sMain = document.getElementById("startQuiz");
var msgEl = document.getElementById("result");
var questionTitle = document.getElementById("Question");
var msgDone = document.getElementById("msgQuizDone");
var msgScoreEl = document.getElementById("msgScore");

var idxQuestion = 0;
var numTotalQuestions = 0;
var numCorrectAnswers = 0;
var finalscore = 0;
var blnFinalQuestion = false;
var blnCorrect = false;

takeQuizPane.addEventListener("click", function (event) {
    var element = event.target;
    if (element.matches("button")) {
        msgEl.textContent = element.getAttribute("data-answered");
        msgEl.style.color = "red";
        if (element.getAttribute("data-answered") === "Correct") {
            blnCorrect = true;
            msgEl.style.color = "green";
            numCorrectAnswers++;
        } else {
            secondsLeft -= 15;
            checkTimeRemaining();
        }
        idxQuestion++;
        loadQuestion();
    }
});

function loadQuestion() {
    var correctIndex = -99;
    if (questions[idxQuestion] === undefined) {
        blnFinalQuestion = true;
        disableQuiz();
        return;
    }
    var correctAnswer = questions[idxQuestion].answer;
    numTotalQuestions++;
    questionTitle.textContent = questions[idxQuestion].title;
    questions[idxQuestion].choices.sort(function () {
        return 0.5 - Math.random();
    });
    for (i = 0; i < questions[idxQuestion].choices.length; i++) {
        if (questions[idxQuestion].choices[i] === correctAnswer) {
            correctIndex = i;
        }
    }

    choiceOneEl.textContent = "A: " + questions[idxQuestion].choices[0];
    choiceTwoEl.textContent = "B: " + questions[idxQuestion].choices[1];
    choiceThreeEl.textContent = "C: " + questions[idxQuestion].choices[2];
    choiceFourEl.textContent = "D: " + questions[idxQuestion].choices[3];

    choiceOneEl.setAttribute("data-answered", "Incorrect");
    choiceTwoEl.setAttribute("data-answered", "Incorrect");
    choiceThreeEl.setAttribute("data-answered", "Incorrect");
    choiceFourEl.setAttribute("data-answered", "Incorrect");

    if (correctIndex === 0) {
        choiceOneEl.setAttribute("data-answered", "Correct");
    } else if (correctIndex === 1) {
        choiceTwoEl.setAttribute("data-answered", "Correct");
    } else if (correctIndex === 2) {
        choiceThreeEl.setAttribute("data-answered", "Correct");
    } else if (correctIndex === 3) {
        choiceFourEl.setAttribute("data-answered", "Correct");
    }
}

function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;

        if (!secondsLeft > 0) {
            secondsLeft = 0;
        }

        timerElement.textContent = "Time: " + secondsLeft.toString().padStart(2, '0');
        checkTimeRemaining();
    }, 1000);
}

function showFinalScore() {
    takeQuizPane.classList.add("d-none")
    sScore.classList.remove("d-none");
    document.getElementById("msgQuizDone").textContent = "All done!";
    if (!secondsLeft > 0) {
        secondsLeft = 0;
    }

    finalscore = 0;
    if (numCorrectAnswers > 0) {
        finalscore = Math.round(100 * (numCorrectAnswers / numTotalQuestions) + (0.2 * secondsLeft));
        if (finalscore > 100) {
            finalscore = 100;
        }
    }

    document.getElementById("msgScore").textContent = "Final score: " + finalscore;
}

function takeQuiz() {
    idxQuestion = 0;
    loadQuestion();
    sMain.classList.add("d-none");
    takeQuizPane.classList.remove("d-none");
    setTime();
}

function checkTimeRemaining() {
    if (secondsLeft <= 0 || blnFinalQuestion) {
        disableQuiz();
        clearInterval(timerInterval);
        showFinalScore();
    }
}

function disableQuiz() {
    choiceOneEl.disabled = true;
    choiceOneEl.classList.remove("btn-primary");
    choiceOneEl.classList.add("btn-secondary");
    choiceTwoEl.disabled = true;
    choiceTwoEl.classList.remove("btn-primary");
    choiceTwoEl.classList.add("btn-secondary");
    choiceThreeEl.disabled = true;
    choiceThreeEl.classList.remove("btn-primary");
    choiceThreeEl.classList.add("btn-secondary");
    choiceFourEl.disabled = true;
    choiceFourEl.classList.remove("btn-primary");
    choiceFourEl.classList.add("btn-secondary");
}

document.querySelector("#startBtn").onclick = function (event) {
    if (event === null) {
        return;
    }
    takeQuiz();
}

document.querySelector("#submitBtn").onclick = function (event) {
    if (event === null) {
        return;
    }
    if (document.getElementById("userInitials").value.length === 0) {
        alert("Please enter your initials to submit your quiz score.");
        return;
    }

    if (finalscore === 0) {
        alert("Sorry, your score must be above a zero to be saved on the wall of fame.");
        return;
    }

    Scores = JSON.parse(localStorage.getItem('highscores'));

    if (Scores !== null) {
        Scores.push({
            'initials': document.getElementById("userInitials").value,
            'highscore': finalscore
        });
    } else {
        Scores = [];
        Scores.push({
            'initials': document.getElementById("userInitials").value,
            'highscore': finalscore
        });
    }
    localStorage.setItem('highscores', JSON.stringify(Scores));
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("submitBtn").remove("btn-primary");
    sScore.classList.add("d-none");
    document.location.href = "index.html";
}
