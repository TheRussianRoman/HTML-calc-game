let questionElem = document.getElementById("question"),
    btn_nextQuestion = document.getElementById("btn_nextQuestion"),
    btn_checkUserAnswer = document.getElementById("btn_checkUserAnswer")
    outputTextElem = document.getElementById("outputText"),
    answerElem = document.getElementById("answer"),
    scoreElem = document.getElementById("score"),
    historyElem = document.getElementById("historyText");

let userScore = 0,  systemResult,
    resultHasBeenChecked,
    questionWasAddedInHistory,
    question = "",
    nextButtonToClick = btn_checkUserAnswer;

answerElem.addEventListener("keyup", (key) => {
    if ((key.code == `Enter`) || (key.code == `NumpadEnter`)) {
      nextButtonToClick.click();
    }
  });

  function onNextQuestionClick() {
    nextButtonToClick = btn_checkUserAnswer;
    showNextQuestion();
    
  }
  function onCheckUserAnswerClick(){
    nextButtonToClick = btn_nextQuestion;
    checkUserAnswer();
  }

showNextQuestion();
function showNextQuestion() {
        let objOperator = nextQuestion_determineOperator();

        let limit = nextQuestion_determineLimits(objOperator.num);

        let questionNumbers = nextQuestion_determineNumbers(limit);
        
        if (objOperator.num == 4) {
            let tmpResult = questionNumbers.first * questionNumbers.second;
            questionNumbers.first = tmpResult;
        }

        //swapNumbers
        if (questionNumbers.second > questionNumbers.first) {
            let tmp = questionNumbers.first;
            questionNumbers.first = questionNumbers.second;
            questionNumbers.second = tmp;
        }

        question = questionNumbers.first + " " + objOperator.string + " " + questionNumbers.second + " ="
        questionElem.value = question;

        systemResult = calcSystemResult (objOperator.num, questionNumbers.first, questionNumbers.second)

        outputTextElem.innerHTML = ""
        answerElem.value = "";
        questionWasAddedInHistory = false
        resultHasBeenChecked = false;
        btn_nextQuestion.disabled = true;
        //Сделать блокировку checkAnswer
}

function nextQuestion_determineOperator(){
    let operatorNum = Math.floor(Math.random()*4)+1;
    switch(operatorNum){
        case 1: tmpOperator = "+"; break;
        case 2: tmpOperator = "-"; break;
        case 3: tmpOperator = "*"; break;
        case 4: tmpOperator = "/"; break;
    }

    let operator = {
        string: tmpOperator,
        num: operatorNum
    }
    return operator
}

function nextQuestion_determineLimits(operator) {
    if ((operator == 1) || (operator == 2)){
       firstNumLimit = 100;
       secondNumLimit = 100;
    } else if (operator == 3) {
        firstNumLimit = 100; 
        secondNumLimit = 10;
    } else if (operator == 4) {
        firstNumLimit = 10; secondNumLimit = 10;
    }

    let limit = {
        first: firstNumLimit,
        second:secondNumLimit
    }
    return limit;
}

function nextQuestion_determineNumbers(limit) {
    let firstNum = Math.floor(Math.random()*limit.first+1);
    let secondNum = Math.floor(Math.random()*limit.second+1);
    let numbers = {
        first:firstNum,
        second:secondNum
    }
    return numbers;
}

function calcSystemResult (operatorNum, firstNum, secondNum) {
    switch (operatorNum) {
    case 1: res = firstNum + secondNum; break;
    case 2: res = firstNum - secondNum; break;
    case 3: res = firstNum * secondNum; break;
    case 4: res = firstNum / secondNum; break;
}
return res;
}



let emoji = "";

//Видит только первый раз. Почему?
function checkUserAnswer(){
    let userInput = answerElem.value
    if (resultHasBeenChecked == true) alert("Дважды отвечать на один и тот же пример нельзя.");
    if (userInput == "" ) userInput = "ответ не указан";
    else {
        userInput = parseFloat(answerElem.value)
        if ((userInput == systemResult) && (!resultHasBeenChecked)) {
            outputTextElem.innerHTML = "ВЕРНО!";  
            outputTextElem.style.color = "green";
            outputTextElem.style.background = "azure";
            emoji = "\u2714;"
            userScore++;
        } else if (!resultHasBeenChecked) {
            outputTextElem.innerHTML = "ОШИБКА!";  
            outputTextElem.style.color = "red";
            outputTextElem.style.background = `rgb(${255}, ${200}, ${200})`;
            emoji = "\u274C;"
            userScore--;
        } 
    }
    refreshScore();
    resultHasBeenChecked = true;
    
    if (questionWasAddedInHistory == false) addHistory(question, userInput);
    btn_nextQuestion.disabled = false;
    //Сделать блокировку checkAnswer
}

function refreshScore () {
    scoreElem.innerHTML = "Счёт: " + userScore;
}

function addHistory (question, userInput) {
    historyElem.value = historyElem.value + question + 
    " " + userInput + " " + emoji + "\n"; 
    emoji = "";
    questionWasAddedInHistory = true;
}

function toggleButton(btn) {
    if (btn.disabled == false) disableButton(btn);
    if (btn.disabled == true)
}

function disableButton(btn){

}

function enableButton(btn){
    
}



/*-------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------*/

//Добавить вывод времени в историю
//Затемнение неактивной кнопки
//Запретить проверять один ответ дважды
//Удалить флаг наличия примера в истории (т.к. кнопка отключена)
//Счёт правильных/неправильных/пропущенных ответов
