var allQuestions = [
  {sequence: 1, question: "1. Who is Prime Minister of the United Kingdom?", choices: ["Theresa May", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
  correctAnswer:"Theresa May"},
  {sequence: 2, question: "2. What is the capital of the Great Britain?", choices: ["Paris", "Warsaw", "London", "Liverpool", "Budapest"], correctAnswer:"London"},
  {sequence: 3, question: "3. What is the capital of the Russian Federation?", choices: ["Prague", "Minsk", "Washington", "Moscow"], correctAnswer:"Moscow"},
  {sequence: 4, question: "4. Who was the first man in space", choices: ["Armstrong", "Titov", "Gagarin", "Gorbachev"], correctAnswer:"Gagarin"},
  {sequence: 5, question: "5. Who is the President of the USA", choices: ["Putin", "Psaki", "Clinton", "Obama"], correctAnswer:"Obama"},
];

// to access a property of an object...
allQuestions[0].choices[0]





Problems:
- need to get the value of the clicked span SOLVED. You got to be a fucking idiot - navSpan = event.target.innerHTML;
  navSpan = event.target.tagName; 
  content = navSpan.innerHTML; // did not work

document.getElementById("navigation").nextSibling // giving #text

document.querySelectorAll("#seqSpan") // gives an array

event.target.value; ?
event.target.name; ?
event.target.tagName;




- cannot display a question through a function and click SOLVED
 function getQuestion(/*question/*, choice*/){ // display question and choices
  console.log("getQuestion message");
  var questionPar = document.createElement("p");
  var text = document.createTextNode(allQuestions[0].question);
  var textText = document.createTextNode("test");
  var displayText =questionPar.appendChild(text);
  questionPar.appendChild(textText);
  /*questionPar.setAttribute("id", "question");
  document.getElementById("question").innerHTML = allQuestions[0].question;*/
  
  /*for(i=0; i<3; i++){
    document.getElementById("QuestionChoice").innerHTML = allQuestions[question].choices[i];
  }*/
}

document.getElementsByTagName("button")[1].addEventListener("click", function(){
  getQuestion();
});

// solving
var myP = document.createElement("p");
myP.setAttribute("id", "myParagraph");
//document.getElementById("myParagraph").innerHTML = "chlen sobachiiy";
var myId = document.getElementById("myParagraph"); // gives null

var Block = document.getElementById("questionBlock"); // returns the id
// So it is obvious the script element is loaded after document.getElementById("myParagraph"); or somththing

// worked. I never appneded the element to the document, fucking morron
var myP = document.createElement("p");
myP.setAttribute("id", "myParagraph");
var questionBlock = document.getElementById("questionBlock");
questionBlock.appendChild(myP);
myP.innerHTML = "hey hey";


- Why is question replaces each other and choices do not? Because the question uses .innerHTML
- What is the allQuestions array? And what are these items: question, choices and correctAnswer?
allQuestions is an array that consisits of "nameless" object literals 
var allQuestions = [
  {question: "1. Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
  correctAnswer:0},
  {question: "2. What is the capital of the Great Britain?", choices: ["Paris", "Warsaw", "London", "Liverpool"], correctAnswer:2},
  {question: "3. What is the capital of the Russian Federation?", choices: ["Prague", "Minsk", "Washington", "Moscow"], correctAnswer:3},
  {question: "4. Who was first man in space", choices: ["Armstrong", "Titov", "Gagarin", "Gorbachev"], correctAnswer:2},
  {question: "5. Who is the President of the USA", choices: ["Putin", "Psaki", "Clinton", "Obama"], correctAnswer:3},
];
- How to create new item in allQuestions array and add user's answer there? Get reqired object literal allQuestions[0], then using dot notation ...
allQuestions[0].userAnswer = "this is the answer";
 - Why qInd-1 in allQuestions[qInd-1].userAnswer

if(qInd==5){document.getElementById("next").innerHTML = "Finish"}

qInd = navSpan-1;


Things to do 
- allow multiple answers.
- fix checkboxes appearing 
- if you check and do not click next, checked box won't be saved.


before release
- add var to make local variables
- possibly give question function as a callback to the cick event?

Things that are done
- display different cursor on navigation nums when not allowed to go
- allow any number of choices for one question.
- when all questions are answered (checked), if you navigate to any question, not necessearaliy the last one, and you click "next" you wil be directed to the result
- make user to navigate only answered questions
- diplay question navigation bar
- when you go back then next checkboxex are not checked
- copmare user s answer with the correct answer 
- function to get the answer Done
- last question problem. Not getting answer. 
At the last interation I got qInd == 5, why?. 
Not getting answer because now it chehkc only the frist box with Putin choice coz myBoxElse = document.getElementById("myCheckbox")
(need to get all the inputs one by one. Here it only gets the first one thruogh all iterations)
forEach does not work
SOLVED by: var allCheckBoxes = document.getElementsByTagName("input"); if(allCheckBoxes[i].checked == true) ...



Things to improve


Improve Your Quiz Application From Earlier:
Add client-side data validation: make sure the user answers each question before proceeding to the next question.
Store the quiz questions in an external JSON file.
Add a “Back” button to allow the user to go back and change her answer. The user can go back up to the first question. For the questions that the user has answered already, be sure to show the radio button selected, so that the user is not forced to answer the questions again, which she has completed.
Use jQuery to add animation (fade out the current question and fade in the next question).
Test the quiz on IE 9, and fix any bugs. This will give you a good workout 😉

Add user authentication: allow users to log in, and save their login credentials to local storage (HTML5 browser storage).
Use cookies to remember the user, and show a “Welcome, ‘First Name'” message when the user returns to the quiz.



local vars from back()
    var currentChoice = allQuestions[qInd-2].choices[choiceInd]; // Display choices. Get the choice item. 
    var choiceSpan = document.createElement("span");             // create span element
    choiceSpan.setAttribute("id", "choiceId");
    var choiceText = document.createTextNode(currentChoice);   // create text node with choice item as text
    choiceSpan.appendChild(choiceText);                      // append text to the span 
    document.getElementById("choiceBlock").appendChild(choiceSpan);