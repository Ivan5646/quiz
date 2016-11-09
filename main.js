var allQuestions = [
  {sequence: 1, question: "0. Who is Prime Minister of the United Kingdom?", choices: ["Theresa May", "Winston Churchill", "Tony Blair"], 
  correctAnswer: ["Theresa May"], userAnswer: []},
  {sequence: 2, question: "1. Which cities are located in the Great Britain?", choices: ["Paris", "Warsaw", "London", "Liverpool", "Budapest"], 
  correctAnswer:["London", "Liverpool"], userAnswer: []},
  {sequence: 3, question: "2. What is the capital of the Russian Federation?", choices: ["Prague", "Minsk", "Washington", "Moscow"], 
  correctAnswer: ["Moscow"], userAnswer: []},
  {sequence: 4, question: "3. Who was the first man in space", choices: ["Armstrong", "Leonov", "Titov", "Gagarin", "Gorbachev"], 
  correctAnswer: ["Gagarin"], userAnswer: []},
  {sequence: 5, question: "4. Who is the President of the USA", choices: ["Putin", "Psaki", "Clinton", "Obama"], 
  correctAnswer: ["Obama"], userAnswer: []},
];

for(var i=0; i<allQuestions.length; i++){  // Display navigation
  var seqSpan = document.createElement("span");
  seqSpan.setAttribute("class", "seqSpan");
  seqSpan.innerHTML = allQuestions[i].sequence;
  document.getElementById("navigation").appendChild(seqSpan);
}

getQuestion(); // call the function here to display the first question

var qInd; // question index
function getQuestion(){ // display question and choices. And all the functionality
  if (qInd===null || qInd===undefined){ // initialize qInd
    qInd = 0;
  }
  if(qInd<allQuestions.length){  // iterate through questions     
    var myP = document.createElement("p"); // Get and display question.
    myP.setAttribute("id", "myPId");
    document.getElementById("questionBlock").appendChild(myP); // appends empty paragraph
    document.getElementById("myPId").innerHTML = allQuestions[qInd].question; // inserts text from the array

    if(qInd>0){ // prevent from executing this block when the getQuestion() runs for the first time
      // Get the USER'S ANSWER (multiple answer) (get all checkboxes at once and interate through them)
      var myBoxes = document.getElementsByTagName("input");
      var boxesLength = myBoxes.length; // save the integer of the myBoxes.length to use it later
      var i=0;
      while(i<boxesLength){ // iterate through checkoboxes
        if(myBoxes[i].checked == true){
          userAnswerVar = myBoxes[i].nextSibling.innerHTML; 
          allQuestions[qInd-1].userAnswer.push(userAnswerVar); // push the user's answer to userAnswer array
        }
        i++;
      } 
      // css display different cursor on navigation nums when not allowed to go
      var myNavs = document.getElementsByClassName("seqSpan"); 
      var myNavsLength = myNavs.length;
      var navsI=0;
      while(navsI<boxesLength){
        if(allQuestions[qInd-1].userAnswer && myNavs[navsI].innerHTML == qInd){ //  Need to change cursor to pointer only to seqSpan which corresponds to question with answer
          myNavs[navsI].style.cursor = "pointer"; 
        }
        navsI++
      }
    } // end of qInd>0 condition
    for(var choiceInd=0; choiceInd<allQuestions[qInd].choices.length; choiceInd++){ // Get and display choices and checkboxes. itereates through choices
      if(qInd==0){ // do when getQuestion() is called for tyhe first time
        var myCheckbox = document.createElement("input"); // display unchecked checkboxes
        myCheckbox.setAttribute("type", "checkbox");
        myCheckbox.setAttribute("id", "myCheckbox");
        document.getElementById("choiceBlock").appendChild(myCheckbox);
      }else if(allQuestions[qInd].userAnswer==8){ // delete this condition
        for(var usAnI=0; usAnI<allQuestions[qInd].userAnswer.length; usAnI++){ // need to iterate through userAnswer
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
        }
      }else{
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
    }
      var currentChoice = allQuestions[qInd].choices[choiceInd]; // Display choices. Get the choice item. 
      var choiceSpan = document.createElement("span");             // create span element
      choiceSpan.setAttribute("id", "choiceId");
      choiceSpan.setAttribute("class", "choiceClass");
      var choiceText = document.createTextNode(currentChoice);   // create text node with choice item as text
      choiceSpan.appendChild(choiceText);                      // append text to the span 
      document.getElementById("choiceBlock").appendChild(choiceSpan);
    } // the end of for loop choiceInd<allQuestions[qInd].choices.length
  }else{  // qInd<allQuestions.length?
    // to get the user's answer (multiple asnwer)
    var myBoxes = document.getElementsByTagName("input");
    var boxesLength = myBoxes.length; // save the integer of the myBoxes.length to use it later
    var i=0;
    while(i<boxesLength){ // iterate through checkoboxes
      if(myBoxes[i].checked == true){
        userAnswerVar = myBoxes[i].nextSibling.innerHTML; 
        allQuestions[qInd-1].userAnswer.push(userAnswerVar); // push the user's answer to userAnswer array
      }
      i++;
    }

    document.getElementById("choiceBlock").innerHTML = "";

    var nextBtn = document.getElementById("next") // remove next and back buttons    
    nextBtn.parentNode.removeChild(nextBtn);
    var backBtn = document.getElementById("back")   
    backBtn.parentNode.removeChild(backBtn);

    // compare answers and get the number of correct answers
    match = []; // for test 
    numOfCorrectAnswers = 0;
    for(var a=0; a<allQuestions.length; a++){ // iterates through questions
      for(var userI=0; userI<allQuestions[a].userAnswer.length; userI++){ // iterate through userAnswer array
        for(var corI=0; corI<allQuestions[a].correctAnswer.length; corI++){ // iterate through correctAnswer array
          if(allQuestions[a].userAnswer[userI]===allQuestions[a].correctAnswer[corI]){  
            numOfCorrectAnswers++;
            match.push(allQuestions[a].userAnswer[userI]);
          }
        }
      }
    }
     result = numOfCorrectAnswers / 5 * 100  // get result in %
    document.getElementById("questionBlock").innerHTML = "Your result is " + result + "%";  // display result
  }
  qInd++; 
  console.log("qInd after incrementation eqauls to " + qInd);
  if(qInd==5){
    document.getElementById("next").innerHTML = "Finish"; console.log("change next to finish");
  }else{
    document.getElementById("next").innerHTML = "next";
  }
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
  if(qInd==5){  // code repetition 
    document.getElementById("next").innerHTML = "Finish"; console.log("change next to finish");
  }else{
    document.getElementById("next").innerHTML = "next";
  }
} // the end of back()

var mySeq = document.querySelectorAll("#seqSpan");
function navigate(){ 
  var navSpan = event.target.innerHTML; // get the value of the clicked span
  if(allQuestions[navSpan-1].userAnswer){ // make user to navigate only to answered questions
    // remove choices. Same pattern. myBoxes[0].nextSibling.parentNode.removeChild(myBoxes[0].nextSibling)
    var myChoices = document.getElementsByTagName("input");
    for (var i=0; i<myChoices.length; i++) {
      myChoices[i].nextSibling.parentNode.removeChild(myChoices[i].nextSibling);
    }
    // remove checkboxes
    var myBoxes = document.getElementsByTagName("input");
    while(myBoxes.length>0){
      myBoxes[0].parentNode.removeChild(myBoxes[0]);
    }

    document.getElementById("myPId").innerHTML = allQuestions[navSpan-1].question; // inserts question text from the array
    // display checked and unckeded boxes, choices
    // get user's answer first. Then iterate choices with 
    var choiceIndd=0;
    while(choiceIndd<allQuestions[navSpan-1].choices.length){ // iterate choices. Problem incrementing choiceIndd and jumping over an item
      //if(allQuestions[navSpan-1].userAnswer){}
      // display checked chekckboxes
      for(uI=0; uI<allQuestions[navSpan-1].userAnswer.length; uI++){ // iterate userAnswer
        var answer = allQuestions[navSpan-1].userAnswer[uI]; //     
        if(answer==allQuestions[navSpan-1].choices[choiceIndd]){ // check the box that was checked by the user. 
          var myCheckbox = document.createElement("input"); 
          myCheckbox.setAttribute("type", "checkbox");
          myCheckbox.checked = true // set the checked property. Or  myCheckbox.checked = "checked"
          myCheckbox.setAttribute("id", "myCheckbox");
          document.getElementById("choiceBlock").appendChild(myCheckbox);
          // Display choices for checked boxes
          var currentChoice = allQuestions[navSpan-1].choices[choiceIndd]; // get the choice item
          var choiceSpan = document.createElement("span");             // create span element
          choiceSpan.setAttribute("id", "choiceId");
          var choiceText = document.createTextNode(currentChoice);   // create text node with choice item as text
          choiceSpan.appendChild(choiceText);                      // append text to the span 
          document.getElementById("choiceBlock").appendChild(choiceSpan);
          choiceIndd++;
        }
      } // for loop uI>allQuestions[navSpan-1].userAnswer.length;
      while(choiceIndd<allQuestions[navSpan-1].choices.length){ // second loop to iterate choices
        // display unchecked boxes
        if(answer==allQuestions[navSpan-1].choices[choiceIndd]){ // exit the loop if it is a checked box
        }
        break
      } // second loop while to iterate choices
      if(choiceIndd<allQuestions[navSpan-1].choices.length){
        var myCheckbox = document.createElement("input"); 
        myCheckbox.setAttribute("type", "checkbox");
        myCheckbox.setAttribute("id", "myCheckbox");
        document.getElementById("choiceBlock").appendChild(myCheckbox);
        // Display choices for unchecked boxes
        var currentChoice = allQuestions[navSpan-1].choices[choiceIndd]; // get the choice item
        var choiceSpan = document.createElement("span");             // create span element
        choiceSpan.setAttribute("id", "choiceId");
        var choiceText = document.createTextNode(currentChoice);   // create text node with choice item as text
        choiceSpan.appendChild(choiceText);                      // append text to the span 
        document.getElementById("choiceBlock").appendChild(choiceSpan);
        choiceIndd++;
      }
    } // for loop iterate choices
  } // if condition allQuestions[navSpan-1].userAnswer
  qInd = navSpan; // for proper navigation    
} // the end of navigate()

function remove(){
  for(var choiceInd=0; choiceInd<allQuestions[qInd-2].choices.length; choiceInd++){ // qInd-2 removes what was added
    var checkboxEl = document.getElementById("myCheckbox"); //removes the checkboxes one by one
    checkboxEl.parentNode.removeChild(checkboxEl);
    var choiceEl = document.getElementById("choiceId"); // remove choices
    choiceEl.parentNode.removeChild(choiceEl);
  }
}


document.getElementById("next").addEventListener("click", getQuestion);
document.getElementById("next").addEventListener("click", remove);
document.getElementById("back").addEventListener("click", back);
document.getElementById("navigation").addEventListener("click", navigate);

