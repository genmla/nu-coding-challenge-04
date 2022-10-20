//dispaly different divs according to interaction

//start with start div

//hide start div when start button is clicked

//display questions with conditions for quiz div (for loop?) after start button is clicked 
//do we keep questions in js or in html? 
//If JS we need array of questions with objects each contain question and answers - look at first sprint for array
//If HTML we can have 10 divs with answers marked with correct answer delineated

//hide quiz div when timer ends or last question answered

//display final div when timer ends or last quesiton answered

//display highscore div when submit button clicked for initials

//calculate score based on time left and correct answers
//render array of scores from highest to lowers
//log high scores in local storage, push values into highscore array, sort array
//numberArray.sort(compareNumbers);
//or append new score above or below depending on value (how would we do this for multiple values?)

//clear high scores when clear highscores button clicked

//display start div when play again button clicked

var start = document.getElementById("start")
var startBtn = document.getElementById("startBtn") 
var time = 60
var quiz = document.getElementById("quiz")
var correct = document.getElementById("correct")
var score = 0
var line = document.getElementById("line")
var correctmsg = document.getElementById("correctmsg")
var incorrectmsg = document.getElementById("incorrectmsg")
var nextBtn = document.getElementById("next")
var final = document.getElementById("final")

var submitBtn = document.getElementById("submitBtn")
var highscore = document.getElementById("highscore")
var highscoresList = document.getElementById("highscoresList")
var againBtn = document.getElementById("againBtn")
var clearBtn = document.getElementById("clearBtn")


startBtn.addEventListener("click", function() {
    start.style.display = "none";
    quiz.style.display = "block";
})


// for the quiz card, have answers be event targets
quiz.addEventListener("click", function(event) {
    var answer = event.target;

    if (answer === correct) {
        line.style.display = "block"
        correctmsg.style.display = "block"
        nextBtn.style.display = "block"
        score = score+10
    }
    else if (answer.matches("li")) {
        line.style.display = "block"
        incorrectmsg.style.display = "block"
        nextBtn.style.display = "block"
        time-5
    }
});

    nextBtn.addEventListener("click", function () {


        quiz.style.display = "none";
        final.style.display = "block";
        var finalscore = document.createElement("p")
        finalscore.textContent = "You scored " + (score + time) + " this round!"
        final.children[1].appendChild(finalscore)
    })
    

//issue: does not display highscore div and it is driving me crazy 
//PREVENT DEFAULT DUDE IT WAS A FOOOOOORM!!!
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    final.style.display = "none";
    highscore.style.display = "block";
})

againBtn.addEventListener("click", function() {
    location.reload()
})

clearBtn.addEventListener("click", function() {
    highscoresList.innerHTML = ""
})
// clearBtn.addEventListener("click", function() {

// })
// container.addEventListener("click", function(event) {
//     var element = event.target;
  
//     if (element.matches(".box")) {
//       var state = element.getAttribute("data-state");
  
//       // Use an if statement to conditionally render the number on the card
//       if (state === "hidden") {
//         // If the card is clicked while the state is "hidden", we set .textContent to the number 
//         element.textContent = element.dataset.number;
//         // Using the dataset property, we change the state to visible because the user can now see the number
//         element.dataset.state = "visible";
     
//       } else {
//         // 'Hide' the number by setting .textContent to an empty string
//         element.textContent= "";
//         // Use .setAttribute() method
//         element.setAttribute("data-state", "hidden")
       
//       }  
//     }
    
//   });

//