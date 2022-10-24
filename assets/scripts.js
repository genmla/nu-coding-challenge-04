
//render array of scores from highest to lowest
//log high scores in local storage, push values into highscore array, sort array
//numberArray.sort(compareNumbers);
//or append new score above or below depending on value (how would we do this for multiple values?)

var start = document.getElementById("start");
var startBtn = document.getElementById("startBtn");
var time = 90;
var timer = document.getElementById("timer");
var quiz = document.getElementById("quiz")
var score = 0;
var response = document.getElementById("response");
var correctmsg = document.getElementById("correctmsg");
var incorrectmsg = document.getElementById("incorrectmsg");
var nextBtn = document.createElement("button");
nextBtn.textContent = "Next Question";
var final = document.getElementById("final");
var submitBtn = document.getElementById("submitBtn");
var highscore = document.getElementById("highscore");
var highscores = [];
var previousHighScores = [];
var againBtn = document.getElementById("againBtn");
var clearBtn = document.getElementById("clearBtn");

startBtn.addEventListener("click", function () {
    var timerFunction = setInterval(function () {
        time--
        timer.textContent = "Time Left: " + time + "s";

        if (time === 0 || quiz.children.length < 1) {
            clearInterval(timerFunction);
            timer.style.display = "none"
            quiz.style.display = "none"
            response.style.display = "none"
            final.style.display = "block"
        }
    }, 1000);
    start.style.display = "none";
    quiz.style.display = "block";
})

quiz.addEventListener("click", function (event) {
    var answer = event.target;
    console.log(answer)

    if (answer.matches("span")) {
        response.style.display = "block"
        correctmsg.style.display = "block"
        this.parentElement.append(nextBtn)
        nextBtn.style.display = "block"
        score = score + 10
    }
    else if (answer.matches("li")) {
        response.style.display = "block"
        incorrectmsg.style.display = "block"
        this.parentElement.append(nextBtn)
        nextBtn.style.display = "block"
        time = time - 5
    }
});

nextBtn.addEventListener("click", function () {
    this.style.display = "none";
    response.style.display = "none"
    correctmsg.style.display = "none";
    incorrectmsg.style.display = "none";
    quiz.removeChild(quiz.children[0]);
    //removes first question of quiz if questions still exist
    if (quiz.hasChildNodes()) {
        quiz.children[0].setAttribute("style", "display: block;")
    }
    //why doesn't this do this: end timer countdown, hides timer, shows final page (IT DOES NOW HAHA, it was an issue with children <0, that's no possible)
    else if (quiz.children < 1) {
        clearInterval(timerFunction);
        this.style.display = "none";
        timer.style.display = "none"
        quiz.style.display = "none"
        response.style.display = "none"
        final.style.display = "block"
    }
})

var finish = document.createElement("h2");
finish.textContent = "Finished!"
final.children[0].append(finish)

submitBtn.addEventListener("click", function (event) {
    event.preventDefault()

    final.style.display = "none";
    // LogRoundScore();
    finalscore = (score + time) * 10
    console.log(finalscore)

    // LogRoundInitials();
    var initials = document.querySelector("#initials").value;
    console.log(initials)

    highscore.style.display = "block";

    var finalscorep = document.createElement("p");
    finalscorep.textContent = "You scored " + finalscore + " this round!";
    highscore.children[0].append(finalscorep);

    //working

    previousHighScores = JSON.parse(localStorage.getItem("highscores"))
    console.log(previousHighScores)

    var thisroundLog = {
        initialslog: initials,
        finalscorelog: finalscore
    };
    localStorage.setItem("thisroundLog", JSON.stringify(thisroundLog))
    console.log(thisroundLog)

    previousHighScores.push(thisroundLog)   
    localStorage.setItem("highscores", JSON.stringify(previousHighScores))
    console.log(highscores)

    var thisroundli = document.createElement("li")
    thisroundli.textContent = thisroundLog.finalscorelog + " .................... " + thisroundLog.initialslog
    highscore.children[2].append(thisroundli)
    //working  

    var initialsli = document.createElement("li");
    initialsli.textContent = initials;
    var highli = document.createElement("li");
    highli.textContent = finalscore;
    highscore.children[2].append(initialsli)
    highscore.children[2].append(highli)
})

//issue: does not display highscore div and it is driving me to rage
//PREVENT DEFAULT DUDE IT WAS A FOOOOOORM!!!

againBtn.addEventListener("click", function () {
    location.reload()
})

clearBtn.addEventListener("click", function () {
    highscoresList.innerHTML = ""
    localStorage.setItem("highscores", "")
})