var allQuestions = [
  {sequence: 1, question: "1. Who is Prime Minister of the United Kingdom?", choices: ["Theresa May", "Gordon Brown", "Winston Churchill", "Tony Blair"], 
  correctAnswer:"Theresa May"},
  {sequence: 2, question: "2. What is the capital of the Great Britain?", choices: ["Paris", "Warsaw", "London", "Liverpool"], correctAnswer:"London"},
  {sequence: 3, question: "3. What is the capital of the Russian Federation?", choices: ["Prague", "Minsk", "Washington", "Moscow"], correctAnswer:"Moscow"},
  {sequence: 4, question: "4. Who was the first man in space", choices: ["Armstrong", "Titov", "Gagarin", "Gorbachev"], correctAnswer:"Gagarin"},
  {sequence: 5, question: "5. Who is the President of the USA", choices: ["Putin", "Psaki", "Clinton", "Obama"], correctAnswer:"Obama"},
];

for(var i=0; i<allQuestions.length; i++){  // Display navigation
  var seqSpan = document.createElement("span");
  seqSpan.setAttribute("id", "seqSpan");
  seqSpan.innerHTML = allQuestions[i].sequence;
  document.getElementById("navigation").appendChild(seqSpan);
}

getQuestion(); // call the function here to display the first question

var qInd; // question index
function getQuestion(){ // display question and choices. And all the functionality

  if (qInd===null || qInd===undefined){ 
    qInd = 0;
  }
  if(qInd<allQuestions.length){  // allQuestions.length == 5      Get and display question.
    var myP = document.createElement("p");
    myP.setAttribute("id", "myPId");
    document.getElementById("questionBlock").appendChild(myP); // appends empty paragraph
    document.getElementById("myPId").innerHTML = allQuestions[qInd].question; // inserts text from the array

    for(var choiceInd=0; choiceInd<allQuestions[qInd].choices.length; choiceInd++){ // Get and display choices.
      if(qInd>0){  
        myBox = document.getElementById("myCheckbox") // get the user's answer
        if(myBox.checked == true){
          console.log("you checked the box");
          userAnswerVar = myBox.nextSibling.innerHTML; 
          allQuestions[qInd-1].userAnswer = userAnswerVar; // create a new property with user's answer
        }

        var checkboxEl = document.getElementById("myCheckbox"); //removes the checkboxes one by one
        checkboxEl.parentNode.removeChild(checkboxEl);
        var choiceEl = document.getElementById("choiceId"); // remove choices
        choiceEl.parentNode.removeChild(choiceEl);
      }

      var answer = allQuestions[qInd].userAnswer // Display checkboxes
      if(answer==allQuestions[qInd].choices[choiceInd]){ // display user's checked checkbox
        var myCheckbox = document.createElement("input"); 
      myCheckbox.setAttribute("type", "checkbox");
        myCheckbox.checked = true // set the checked property. Or  myCheckbox.checked = "checked"
        myCheckbox.setAttribute("id", "myCheckbox");
        document.getElementById("choiceBlock").appendChild(myCheckbox);
      }else{ 
        var myCheckbox = document.createElement("input"); // display unchecked checkboxes
        myCheckbox.setAttribute("type", "checkbox");
        myCheckbox.setAttribute("id", "myCheckbox");
        document.getElementById("choiceBlock").appendChild(myCheckbox);
      }

      var currentChoice = allQuestions[qInd].choices[choiceInd]; // Display choices. Get the choice item. 
      var choiceSpan = document.createElement("span");             // create span element
      choiceSpan.setAttribute("id", "choiceId");
      var choiceText = document.createTextNode(currentChoice);   // create text node with choice item as text
      choiceSpan.appendChild(choiceText);                      // append text to the span 
      document.getElementById("choiceBlock").appendChild(choiceSpan);
    } // the end of for loop
  }else{
    var allCheckBoxes = document.getElementsByTagName("input");
    for(var i=0; i<allCheckBoxes.length; i++){
      if(allCheckBoxes[i].checked == true){    
        console.log("you checked the box");
        userAnswerElse = allCheckBoxes[i].nextSibling.innerHTML; 
        allQuestions[qInd-1].userAnswer = userAnswerElse;
      }
    }
    document.getElementById("choiceBlock").innerHTML = ""

    var nextBtn = document.getElementById("next") // remove next and back buttons    
    nextBtn.parentNode.removeChild(nextBtn);
    var backBtn = document.getElementById("back")   
    backBtn.parentNode.removeChild(backBtn);

     numOfCorrectAnswers = 0;
    for(var a=0; a<allQuestions.length; a++){
      if(allQuestions[a].userAnswer===allQuestions[a].correctAnswer){  // compare answers
        var numOfQuestion = allQuestions[a];
        numOfCorrectAnswers++;
      }
    }
     result = numOfCorrectAnswers / 5 * 100  // get result in %
    document.getElementById("questionBlock").innerHTML = "Your result is " + result + "%";  // display result
  }
  qInd++; 
} // the end of the getQuestion()

function back(){
  document.getElementById("myPId").innerHTML = allQuestions[qInd-2].question;  // remove question. insert the required question
  document.getElementById("choiceBlock").innerHTML = ""; // remove choices
  for(var choiceInd=0; choiceInd<allQuestions[qInd-2].choices.length; choiceInd++){ // get the previous choices

    var answer = allQuestions[qInd-2].userAnswer // Display checkboxes
    if(answer==allQuestions[qInd-2].choices[choiceInd]){ // display user's checked checkbox
      var myCheckbox = document.createElement("input"); 
      myCheckbox.setAttribute("type", "checkbox");
      myCheckbox.checked = true // set the checked property. Or  myCheckbox.checked = "checked"
      myCheckbox.setAttribute("id", "myCheckbox");
      document.getElementById("choiceBlock").appendChild(myCheckbox);
    }else{ 
      var myCheckbox = document.createElement("input"); // display unchecked checkboxes
      myCheckbox.setAttribute("type", "checkbox");
      myCheckbox.setAttribute("id", "myCheckbox");
      document.getElementById("choiceBlock").appendChild(myCheckbox);
    }

    var currentChoice = allQuestions[qInd-2].choices[choiceInd]; // Display choices. Get the choice item. 
    var choiceSpan = document.createElement("span");             // create span element
    choiceSpan.setAttribute("id", "choiceId");
    var choiceText = document.createTextNode(currentChoice);   // create text node with choice item as text
    choiceSpan.appendChild(choiceText);                      // append text to the span 
    document.getElementById("choiceBlock").appendChild(choiceSpan);
  }
  qInd--;
} // the end of back()

var mySeq = document.querySelectorAll("#seqSpan");
function navigate(){ // need to get the value of the clicked span
  var navSpan = event.target.innerHTML;
  console.log(navSpan);

  for(var choiceInd=0; choiceInd<allQuestions[navSpan-1].choices.length; choiceInd++){
    var checkboxEl = document.getElementById("myCheckbox"); //removes the checkboxes one by one 
    checkboxEl.parentNode.removeChild(checkboxEl);
    var choiceEl = document.getElementById("choiceId"); // remove choices
    choiceEl.parentNode.removeChild(choiceEl);

    // display required question and stuff
    document.getElementById("myPId").innerHTML = allQuestions[navSpan-1].question; // inserts text from the array
    var answer = allQuestions[navSpan-1].userAnswer // Display checkboxes
    if(answer==allQuestions[navSpan-1].choices[choiceInd]){ // display user's checked checkbox
      var myCheckbox = document.createElement("input"); 
      myCheckbox.setAttribute("type", "checkbox");
      myCheckbox.checked = true // set the checked property. Or  myCheckbox.checked = "checked"
      myCheckbox.setAttribute("id", "myCheckbox");
      document.getElementById("choiceBlock").appendChild(myCheckbox);
    }else{ 
      var myCheckbox = document.createElement("input"); // display unchecked checkboxes
      myCheckbox.setAttribute("type", "checkbox");
      myCheckbox.setAttribute("id", "myCheckbox");
      document.getElementById("choiceBlock").appendChild(myCheckbox);
    }

    var currentChoice = allQuestions[navSpan-1].choices[choiceInd]; // Display choices. Get the choice item. 
    var choiceSpan = document.createElement("span");             // create span element
    choiceSpan.setAttribute("id", "choiceId");
    var choiceText = document.createTextNode(currentChoice);   // create text node with choice item as text
    choiceSpan.appendChild(choiceText);                      // append text to the span 
    document.getElementById("choiceBlock").appendChild(choiceSpan);
  } // the end of for loop

  
}

document.getElementById("next").addEventListener("click", getQuestion);
document.getElementById("back").addEventListener("click", back);
document.getElementById("navigation").addEventListener("click", navigate);

