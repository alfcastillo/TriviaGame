

//  This code will run as soon as the page loads.
window.onload = function () {

  //  Click events 
  $(".restart").click(trivia.reset);
  $(".start").click(trivia.start);
  $("#option-button-0").click(selection);
  $("#option-button-1").click(selection);
  $("#option-button-2").click(selection);
  $("#option-button-3").click(selection);
};

$(".restart").hide();
$(".answer-panel").hide();
$(".question-panel").hide();
$(".gif").hide();

// Gets Link for Theme Song
var banglesElement = document.createElement('audio');
banglesElement.setAttribute('src', "./assets/TheBanglesWalkLikeAnEgyptian.mp3");


// Theme Button
$(".theme-button").on("click", function () {
  banglesElement.play();
  $(".gif").show();
  console.log("Play song");
});

$(".pause-button").on("click", function () {
  banglesElement.pause();
  $(".gif").hide();
});


// TRIVIA QUESTIONS AND ANSWERS Object
var egyptTrivia = {
  questionNum: 0,
  questions: [
    "What does the word hieroglyphs mean?",
    "Ancient Egypt was responsible for the earliest known peace treaty which was between Egypt and what group of people?",
    "What was the first pyramid to be built called?",
    "What is the oldest known monumental sculpture in Egypt? (Hint: Riddle me this.)",
    "What is the name of the funerary figurine placed in tombs to serve as servants for the deceased in the afterlife.",
    "The Great Pyramids of Giza consists of how many pyramids?",
    "Which ancient Egyptian dynasty was Ramses III the pharaoh of?",
    "Which pharaoh was the father of Ramses III?",
    "Which pharaoh was the first historically confirmed female pharaoh?",
    "Which female pharaoh had the longest reign?"
  ],
  anwsers: ["Sacred Writing", "The Hittites", "The Pyramid of Djoser", "The Sphinx", "Shabti dolls", "Three", "The Twentieth Dynasty", "Setnakhte", "Sobekneferu", "Hatshepsut"],
  correctOption: ["0", "0", "2", "3", "3", "1", "0", "2", "0", "1"],
  options: [
    ["Sacred Writing", "Cool Writing", "Gods writing", "grafitti"],
    ["The Hittites", "The greeks", "The Romans", "The Spartans"],
    ["The Sphinx", "The Crib", "The Pyramid of Djoser", "Setnakhte"],
    ["The Pyramid of Giza", "The Obelisk", "The Asterix", "The Sphinx"],
    ["Baby dolls", "The crew", "The pose", "Shabti dolls"],
    ["One", "Three", "Four", "Five"],
    ["The Twentieth Dynasty", "The Cleopatra Dynasty", "Child Destiny", "Don’t know…ask Indiana Jones"],
    ["Ramses II", "Ramses 3.14159", "Setnakhte", "Ramses I"],
    ["Sobekneferu", "Setnakhte", "Cleopatra", "Hatshepsut"],
    ["Setnakhte", "Hatshepsut", "Cleopatra", "Sobekneferu"],
  ],
}

// Variable that set the total amout of time for the Trivia game
var triviaTime = 60;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

function results() {
  if ((trivia.time >= 0)) {
    console.log("******** IT IS DONE ************")
    $(".start").hide();
    $(".restart").show();
    // $(".answer-panel").hide();
    $(".answer-panel").empty();
    $("#question-panel").empty()
    $("#question-panel").append("<h1 class=" + "text-center" + "><strong>Correct: " + trivia.correctCount + "</strong></h1>");
    $("#question-panel").append("<h1 class=" + "text-center" + "><strong>Wrong: " + trivia.wrongCount + "</strong></h1>");
    trivia.stop();
    banglesElement.play();
    $(".gif").show();
    // $(".answer-panel").html(<img src="/assets/images/ClosedFeistyDanishswedishfarmdog-max-1mb.gif"/>);
  }
}
function selection() {
  if ((trivia.time > 0) && (trivia.question < egyptTrivia.questions.length)) {
    console.log("***** Selected Response *****");
    console.log("Question Number--> " + trivia.question);
    console.log("Correct Answer--> " + egyptTrivia.correctOption[trivia.question]);
    var option = $(this).attr("data-name");
    console.log("Option Selected: " + option);
    if (option === egyptTrivia.correctOption[trivia.question]) {
      trivia.correct = true;
      // trivia.question++;
      trivia.correctCount++;
      console.log("CORRECT DUDE");
      $("#question-panel").html("<h1 class=" + "text-center" + "><strong>CORRECT!</strong></h1>");
      var fiveSecondTimeout = setTimeout(function () {
        console.log("THIS IS THE 1.5 seconds Timeout");
        if (trivia.question < egyptTrivia.questions.length) {
          options();
        }
        else {
          results();
          trivia.stop();
        }
      }, 1500);
    }
    else {
      trivia.correct = false;
      // trivia.question++;
      trivia.wrongCount++;
      console.log("WRONG DUDE");
      $("#question-panel").html("<h1 class=" + "text-center" + "><strong>WRONG!</strong></h1>");
      var fiveSecondTimeout = setTimeout(function () {
        console.log("THIS IS THE 1.5 seconds Timeout");
        if (trivia.question < egyptTrivia.questions.length) {
          options();
        }
        else {
          results();
          trivia.stop();
        }
      }, 1500);
    }
  }
  trivia.question++; //After all checks, increase the Trivia question number
}

// FUNCTION TO DISPLAY QUESTION OPTIONS TO BE SELECTED
function options() {
  console.log("********  Start Question: " + trivia.question + " ***********");
  $(".start").hide();
  $(".answer-panel").show();
  $("#question-panel").html("<h1 class=" + "text-center" + "><strong>Question: " + egyptTrivia.questions[trivia.question] + "</strong></h1>");
  // options();
  console.log("These are the Options");
  for (var i = 0; i < 4; i++) {
    var x = egyptTrivia.options[trivia.question][i];
    $("#option-button-" + i).html("<h1 class=" + "text-center" + "><strong>" + x + "</strong></h1>");
    console.log("****** OPTION ****** " + x);
  }

}


//  Trivia object.
var trivia = {
  time: triviaTime,
  question: 0,
  correct: false,
  correctCount: 0,
  wrongCount: 0,

  reset: function () {

    trivia.time = triviaTime;
    trivia.question = 0;
    trivia.correctCount = 0;
    trivia.wrongCount = 0;
    console.log("Reset Button");
    //  Change the "timer-panel" div to "00:00."
    $("#timer-panel").html("<h1 class=" + "text-center" + "><strong>00:00</strong></h1>");
    // $("#question-panel").html("<h1 class="+"text-center"+"><strong>Question: "+egyptTrivia.questions[trivia.question]+"</strong></h1>"); 
    $(".start").hide();
    $(".restart").hide();
    trivia.start();
  },

  start: function () {
    // console.log("********  Start Question: "+ trivia.question+" ***********");
    // $(".start").hide();
    // $(".answer-panel").show();
    // $("#question-panel").html("<h1 class=" + "text-center" + "><strong>Question: " + egyptTrivia.questions[trivia.question] + "</strong></h1>");
  
    $(".question-panel").show();
    options();
    var timeLeft = 1000;
    if (!clockRunning) {
      intervalId = setInterval(trivia.count, 1000);
      clockRunning = true;
    }
  },
  stop: function () {

    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
    console.log("Stop Watch");
    clearInterval(intervalId);
    clockRunning = false;
  },

  recordLap: function () {

  },
  count: function () {

    //  Keep track of Question Timer and Question Number
    // if ((trivia.time > 0) && (trivia.question < egyptTrivia.questions.length)) {
    if (trivia.time > 0) {
      trivia.time--;
      $("#timer-panel").html("<h1 class=" + "text-center" + "><strong>" + trivia.timeConverter(trivia.time) + "</strong></h1>");
      console.log("Clock Running --> intervalID: " + trivia.timeConverter(trivia.time));
    }
    else {
      console.log("Times UP");
      $("#timer-panel").html("<h1 class=" + "text-center" + "><strong>TIMES UP!</strong></h1>");
      results();
      trivia.stop();
      $(".start").hide();
      $(".restart").show();

    }
  },


  //  Time Converter Function

  timeConverter: function (t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes === 0) {
      minutes = "00";
    }

    else if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
  }
};
