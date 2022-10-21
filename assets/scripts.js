
//hide quiz div when timer ends (done) or last question answered

//display final div when timer ends (done) or last quesiton answered

//render array of scores from highest to lowest
//log high scores in local storage, push values into highscore array, sort array
//numberArray.sort(compareNumbers);
//or append new score above or below depending on value (how would we do this for multiple values?)

var start = document.getElementById("start");
var startBtn = document.getElementById("startBtn");
var time = 60;
var timer = document.getElementById("timer");
var quiz = document.getElementById("quiz")
var questions = quiz.children
console.log(questions)
console.log(quiz.children.length)
var liEl = document.querySelectorAll("li")
var correct = document.getElementById("correct");
var incorrect = document.getElementById("incorrect")
var score = 0;
var response = document.getElementById("response");
var line = document.getElementById("line");
var correctmsg = document.getElementById("correctmsg");
var incorrectmsg = document.getElementById("incorrectmsg");
var nextBtn = document.createElement("button");
nextBtn.textContent = "Next Question";
var final = document.getElementById("final");
var finalscoreMsg = document.getElementById("finalscore")
var submitBtn = document.getElementById("submitBtn");
var highscore = document.getElementById("highscore");
var highscoresList = document.getElementById("highscoresList");
var againBtn = document.getElementById("againBtn");
var clearBtn = document.getElementById("clearBtn");

startBtn.addEventListener("click", function () {
    var timerFunction = setInterval(function () {
        time--
        timer.textContent = "Time Left: " + time + "s";

        if (time === 0 || quiz.children.length<1) {
            clearInterval(timerFunction);
            timer.style.display = "none"
            quiz.style.display = "none"
            response.style.display = "none"
            final.style.display = "block"
        }
    }, 1000);
    start.style.display = "none";
    quiz.style.display = "block";

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
        quiz.removeChild(quiz.children[0])
        //removes first question of quiz if questions still exist
        if (quiz.hasChildNodes()) {
            quiz.children[0].setAttribute("style", "display: block;")
        }
        //why doesnt' this do this: end timer countdown, hides timer, shows final page
        else if (quiz.children<1){
            clearInterval(timerFunction);
            timer.style.display = "none"
            quiz.style.display = "none"
            response.style.display = "none"
            final.style.display = "block"
            //figure out how to make this message show up
            finalscoreMsg.innerHTML="Your score this round is " + score + time + "!"
            this.style.display = "none";
        }
    })

    //issue: does not display highscore div and it is driving me to rage
    //PREVENT DEFAULT DUDE IT WAS A FOOOOOORM!!!
    submitBtn.addEventListener("click", function (event) {
        //log initials and score in local storage
        localStorage.setItem("highscores", score)
        event.preventDefault();
        final.style.display = "none";
        highscore.style.display = "block";
    })

    againBtn.addEventListener("click", function () {
        location.reload()
    })

    clearBtn.addEventListener("click", function () {
        highscoresList.innerHTML = ""
        localStorage.setItem("highscores", "")
    })
})

//okay, listen: new plan. Take headings out questions and make ol the question element. Then append next buttont to ol that is displayed.
//that didn't work, but removing the child element did. 

    // quiz.addEventListener("click", function (event) {
    //     var answer = event.target;
    //     console.log(answer)

    //     if (answer.matches("span")) {
    //         response.style.display = "block"
    //         correctmsg.style.display = "block"
    //         this.parentElement.append(nextBtn)
    //         nextBtn.style.display = "block"
    //         score = score + 10
    //     }
    //     else if (answer.matches("li")) {
    //         response.style.display = "block"
    //         incorrectmsg.style.display = "block"
    //         this.parentElement.append(nextBtn)
    //         nextBtn.style.display = "block"
    //         time = time - 5
    //     }
    // });

    // nextBtn.addEventListener("click", function () {
    //     this.style.display = "none";
    //     response.style.display = "none"
    //     correctmsg.style.display = "none";
    //     incorrectmsg.style.display = "none";
    //     quiz.removeChild(quiz.children[0])
    //     //removes first question of quiz if questions still exist
    //     if (quiz.hasChildNodes()) {
    //         quiz.children[0].setAttribute("style", "display: block;")
    //     }
    //     //why doesnt' this do this: end timer countdown, hides timer, shows final page
    //     else{
    //         clearTimeout(timerFunction);
    //         timer.style.display = "none"
    //         quiz.style.display = "none"
    //         response.style.display = "none"
    //         final.style.display = "block"
    //         this.style.display = "none";
    //     }
    // })

    // //issue: does not display highscore div and it is driving me to rage
    // //PREVENT DEFAULT DUDE IT WAS A FOOOOOORM!!!
    // submitBtn.addEventListener("click", function (event) {
    //     //log initials and score in local storage
    //     localStorage.setItem("highscores", score)
    //     event.preventDefault();
    //     final.style.display = "none";
    //     highscore.style.display = "block";
    // })

    // againBtn.addEventListener("click", function () {
    //     location.reload()
    // })

    // clearBtn.addEventListener("click", function () {
    //     highscoresList.innerHTML = ""
    //     localStorage.setItem("highscores", "")
    // })

