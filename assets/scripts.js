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
    var finalscore = (score + time) * 10
    console.log(finalscore)

    // LogRoundInitials();
    var initials = document.querySelector("#initials").value;
    console.log(initials)

    highscore.style.display = "block";

    var finalscorep = document.createElement("p");
    finalscorep.textContent = "You scored " + finalscore + " this round!";
    highscore.children[0].append(finalscorep);

    //highscore storage hell
    var highscores = localStorage.getItem("highscores")
    if ((highscores == null)) {
        highscores = localStorage.getItem("highscores")
        //kept getting push error becuase previousHighScores was not recognized as array
        var previousHighScores = []
        //need to pull null value into previousHighScores array
        previousHighScores.push(highscores)
        console.log(previousHighScores)

        var thisroundLog = {
            initialslog: initials,
            finalscorelog: finalscore
        };

        localStorage.setItem("thisroundLog", JSON.stringify(thisroundLog))
        console.log(thisroundLog)

        previousHighScores.push(thisroundLog)
        console.log(previousHighScores)

        localStorage.setItem("highscores", JSON.stringify(previousHighScores))
        console.log(highscores)
        console.log(previousHighScores)
    }
    else {
        highscores = localStorage.getItem("highscores")
        var previousHighScores = []
        //can equal highscores value now that it is not null
        previousHighScores = JSON.parse(localStorage.getItem("highscores"))
        console.log(previousHighScores)

        var thisroundLog = {
            initialslog: initials,
            finalscorelog: finalscore
        };

        localStorage.setItem("thisroundLog", JSON.stringify(thisroundLog))
        console.log(thisroundLog)

        previousHighScores.push(thisroundLog)
        console.log(previousHighScores)

        localStorage.setItem("highscores", JSON.stringify(previousHighScores))
        console.log(highscores)
    }
    //sorts highscores from highest to lowest
    previousHighScores.sort((a,b) => {
        if (a===null){
            return 1;
        }
        if (b===null){
            return -1;
        }
        return b.finalscorelog - a.finalscorelog
    })
    console.log(previousHighScores)

    //appends top 5 highscores to html doc
    var highscoresli1 = document.createElement("li")
    highscoresli1.textContent = JSON.stringify(previousHighScores[0].initialslog + " .................... " + previousHighScores[0].finalscorelog)
    highscore.children[2].append(highscoresli1)

    var highscoresli2 = document.createElement("li")
    highscoresli2.textContent = JSON.stringify(previousHighScores[1].initialslog + " .................... " + previousHighScores[1].finalscorelog)
    highscore.children[2].append(highscoresli2)

    var highscoresli3 = document.createElement("li")
    highscoresli3.textContent = JSON.stringify(previousHighScores[2].initialslog + " .................... " + previousHighScores[2].finalscorelog)
    highscore.children[2].append(highscoresli3)

    var highscoresli4 = document.createElement("li")
    highscoresli4.textContent = JSON.stringify(previousHighScores[3].initialslog + " .................... " + previousHighScores[3].finalscorelog)
    highscore.children[2].append(highscoresli4)

    var highscoresli5 = document.createElement("li")
    highscoresli5.textContent = JSON.stringify(previousHighScores[4].initialslog + " .................... " + previousHighScores[4].finalscorelog)
    highscore.children[2].append(highscoresli5)
    //end of highscore storage hell   
})

//issue: does not display highscore div and it is driving me to rage
//PREVENT DEFAULT DUDE IT WAS A FOOOOOORM!!!
againBtn.addEventListener("click", function () {
    location.reload()
})

clearBtn.addEventListener("click", function () {
    highscoresList.innerHTML = ""
    localStorage.clear()
})