//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "How can you created rounded corners using CSS3?",
        options: ["border[round]: 30px;", "corner-effect: round;", "border-radius: 30px;", "alpha-effect: round-corner;"],
        correct: "border-radius: 30px;",
    },
    {
        id: "1",
        question: "How do you add shadow to elements in CSS3?",
        options: ["box-shadow: 10px 10px 5px grey;", "shadow-right: 10px shadow-bottom: 10px;", "shadow-color: grey;", "alpha-effect[shadow]: 10px 10px 5px grey;"],
        correct: "box-shadow: 10px 10px 5px grey;",
    },
    {
        id: "2",
        question: "How to you modify a border image using CSS3?",
        options: ["border: url(image.png);", "border-variable: image url(image.png);", "border-image: url(border.png) 30 30 round;", "None"],
        correct: "border-image: url(border.png) 30 30 round;",
    },
    {
        id: "3",
        question: "How to resize a background image using CSS3?",
        options: ["background-size: 80px 60px;", "bg-dimensions: 80px 60px;", "background-proportion: 80px 60px;", "alpha-effect: bg-resize 80px 60px;"],
        correct: "background-size: 80px 60px;",
    },
    {
        id: "4",
        question: "How to add text shadow using CSS3?",
        options: ["font: shadowed 5px 5px 5px grey;", "font-shadow: 5px 5px 5px grey;", "text-shadow: 5px 5px 5px grey;", "shadow: text 5px 5px 5px grey;"],
        correct: "text-shadow: 5px 5px 5px grey;",
    },
    {
        id: "5",
        question: "Which of these are valid CSS3 transformation statements.",
        options: ["matrix()", "modify()", "skip()", "simulate()"],
        correct: "matrix()",
    }, {
        id: "6",
        question: "How to rotate objects using CSS3?",
        options: ["object-rotation: 30deg;", "transform: rotate(30deg);", "rotate-object: 30deg;", "transform: rotate-30deg-clockwise;"],
        correct: "transform: rotate(30deg);",
    },
    {
        id: "7",
        question: "How to re-size/scale objects using CSS3?",
        options: ["transform: scale(2,4);", "scale-object: 2,4;", "scale: (2,4);", "None"],
        correct: "transform: scale(2,4);",
    },
    {
        id: "8",
        question: "How to create transition effects using CSS3?",
        options: ["transition: width 2s;", "transition-duration: 2s; transition-effect: width;", "alpha-effect: transition (width,2s);", "None"],
        correct: "transition: width 2s;",
    },
    {
        id: "9",
        question: "How to force a word wrap using CSS3?",
        options: ["word-wrap: break-word;", "text-wrap: break-word;", "text-wrap: force;", "text-wrap: force;"],
        correct: "text-wrap: break-word;",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};