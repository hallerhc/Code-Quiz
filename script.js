
var startButton = document.querySelector(".start-button");
var timerElement = document.getElementById("timer");
var pointsElement = document.getElementById("points");
var submitButton = document.querySelector(".submit-button");
var quizQuestions = document.getElementById("quiz-questions");
var quizAnswers = document.getElementById("quiz-answers");
var msgDiv = document.querySelector("#msg");

var timeLeft = 60;
var points = 0;
var timerID;
var questionIndex = 0

pointsElement.textContent = points;

var myQuestions = [
    {
        question: "Inside which HTML element do we put the javascript?",

        answers: [
             '<scripting>',
             '<js>',
             '<javascript',
             '<script>'
        ],
        correctAnswer: '<script>'
    },
    
    {
        question: "What is the correct javascript syntax to change the content of the following HTML element: <p id='demo'>This is a demonstration.<P>",
          
        answers: [
             'document.getElementById("demo").innerHTML = "HELLO WORLD!";',
             'document.getElementByName("p").innerHTML = "HELLO WORLD!";',
             'document.getElement("p").innerHTML = "HELLO WORLD!";',
             '#demo.innerHTML = "HELLO WORLD!";'
        ],
        correctAnswer: 'document.getElementById("demo").innerHTML = "HELLO WORLD!";'
    },

   {
       question:"Where is the correct place to insert javascript?",

       answers: [
             'The <body> section',
             'Both the <head> and the <body> section are correct',
             'The <head> section',
        ],
        correctAnswer: 'Both the <head> and the <body> section'
   },

   {
       question: "What is the correct syntax for referring to an external script called 'xxx.js'?",

       answers: [
           '<script src="xxx.js">',
           '<script href="xxx.js">',
           '<script name="xxx.js">',
       ],
       correctAnswer: '<script src="xxx.js"'
   },

   {  
        question: "The external JavaScript file must contain <the script> tag.",
       
       answers: [
           'True',
           'False',
       ],
       correctAnswer: 'False'
   },

   {
       question: "How do you create a function in JavaScript?",

       answers: [
           'function = myFunction()',
           'function myFunction()',
           'function: myFunction()',
       ],
       correctAnswer: 'function myFunction()'
    },

    {
        question: "How to write an IF statement in JavaScript?",

        answers: [
            'if i ==5 then',
            'if i = 5 then',
            'if (i == 5) ',
            'if i = 5',
        ],
        correctAnswer: 'if (i == 5)'
    },

    {
        question: "How does a FOR loop start?",

        answers: [
            'for(i<=5;i++)',
            'for i = 1 to 5',
            'for(i=0;i<=5;i++)',
            'for(i=0;i<=5)',
        ],
        correctAnswer: 'for(i=0;i<=5;i++)'
    },

    {
        question: "How can you add a comment in JavaScript?",

        answers: [
            '<!--This is a comment-->',
            'This is a comment',
            '//This is a comment',
        ],
        correctAnswer: '//This is a comment'
    },

    {
        question: "Which event occurs when the user clicks on an HTML element?",

        answers: [
            'onclick',
            'onmouseclick',
            'onchange',
            'onmouseover',
        ],
        correctAnswer: 'onclick'
    }
       
];


function startGame() {
    isWin = false;
    startButton.disabled = true;
    timerId = setInterval(tick, 1000);
    timerElement.textContent = `Timer: ${timeLeft}`
    getQuestion()
    
}

function tick() {
    timeLeft--;
    timerElement.textContent = `Timer: ${timeLeft}`;

    if (timeLeft<=0) {
        clearInterval(timerID);
        timeLeft = ''
        timerElement.textContent = "Times Up!";
        handleSubmit()
    }
}

function timesUp() {
    console.log("finished!");
}

function getQuestion(){
    var currentQuestion = myQuestions[questionIndex]
    quizQuestions.textContent= currentQuestion.question
    currentQuestion.answers.forEach(
        function(answer, i){
            var answerButton=document.createElement("button")
            answerButton.setAttribute("class","answer")
            answerButton.setAttribute("value", answer)
            answerButton.textContent = `${i+1}. ${answer}`;
            answerButton.onclick = handleAnswer
            quizAnswers.appendChild(answerButton)
            
    })
}

function displayMessage(type, message) {
    msgDiv.textContent = message;
    msgDiv.setAttribute("class", type);
  }
  

function handleAnswer() {
    if (this.value === myQuestions[questionIndex].correctAnswer) {
        points++;
        pointsElement.textContent = points;
        displayMessage("after", "CORRECT!!!");
        console.log("correct")
    } else {
        timeLeft -= 5;
        displayMessage("end", "INCORRECT");
        console.log('incorrect');
    }
    quizAnswers.textContent = ""
    questionIndex++
    if (questionIndex < myQuestions.length) {
        getQuestion()    
    } else {
        quizQuestions.textContent = "";
        handleSubmit()
    }
}

function handleSubmit() {
    localStorage.setItem("Username", points)
    timeLeft=0
    quizQuestions.textContent=""
    quizAnswers.textContent=""
    displayMessage("before")
}


startButton.onclick = startGame

submitButton.onclick = handleSubmit