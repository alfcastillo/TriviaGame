

//  This code will run as soon as the page loads.
window.onload = function () {

  //  Click events 
  $(".restart").click(trivia.reset);
  $(".start").click(trivia.start);
  $("#option-button-1").click(selection);
  $("#option-button-2").click(selection);
  $("#option-button-3").click(selection);
  $("#option-button-4").click(selection);
};

$(".restart").hide();
// Gets Link for Theme Song
var banglesElement = document.createElement('audio');
banglesElement.setAttribute('src', "./assets/TheBanglesWalkLikeAnEgyptian.mp3");


// Theme Button
$(".theme-button").on("click", function () {
  banglesElement.play();
  console.log("Play song");
});

$(".pause-button").on("click", function () {
  banglesElement.pause();
});


// TRIVIA QUESTIONS AND ANSWERS Object
var egyptTrivia = {
  questionNum: 0,
  questions: ["What does the word hieroglyphs mean?",
    "Ancient Egypt was responsible for the earliest known peace treaty which was between Egypt and what group of people?",
    "What was the first pyramid to be built called?",
    "What is the oldest known monumental sculpture in Egypt? (Hint: Riddle me this.)",
    "What is the name of the funerary figurine placed in tombs to serve as servants for the deceased in the afterlife.",
    "The Great Pyramids of Giza consists of how many pyramids?",
    "Which ancient Egyptian dynasty was Ramses III the pharaoh of?",
    "Which pharaoh was the father of Ramses III? (Hint: It’s not Ramses II)",
    "Which pharaoh was the first historically confirmed female pharaoh?",
    "Which female pharaoh had the longest reign?"],
  anwsers: ["Sacred Writing","The Hittites","The Pyramid of Djoser","The Sphinx","Shabti dolls","Three","The Twentieth Dynasty","Setnakhte", "Sobekneferu","Hatshepsut"],
  correctOption:["1","1","3","4","4","2","1","3","1","2"],
  q1: ["Cool Writing", "Gods writing","grafitti"],  
  q2: ["The greeks", "The Romans", "The Spartans"],
  q3: ["The Sphinx","The Crib","Setnakhte"],
// ”The Pyramid of Giza”,”The obelisk”,”The Asterix” 
// ”Baby dolls”, “The crew”,”The pose”
// “One”,”Four”,”Five” 
// ”The Cleopatra Dynasty”,”Child Destiny”,Don’t know…ask Indiana Jones” 
// “Ramses II”, “Ramses 1/2”, ”Ramses I”
// “Setnakhte”, “Cleopatra”, ”Hatshepsut”
// “Setnakhte”, “Cleopatra”, ”Sobekneferu”
}


$("#timer-panel").html("<h1 class=" + "text-center" + "><strong>01:00 </strong></h1>");

//  Variable that will hold our setInterval that runs the trivia
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;

function selection() {
  console.log("***** Selected Response *****");
  console.log("Question Number--> "+trivia.question);
  console.log("Correct Answer--> "+egyptTrivia.correctOption[trivia.question]);
  var option =$(this).attr("data-name");
  console.log("Option Selected: "+option);
  if (option === egyptTrivia.correctOption[trivia.question]){
    trivia.correct= true;
    trivia.question++;
    trivia.correctCount++;
    console.log("CORRECT DUDE");
    trivia.start();
  }
  else{
    trivia.correct = false;
    trivia.wrongCoung++;
    console.log("WRONG DUDE");
  }

  

}
function options() {
  console.log("These are the Options");
  $("#option-A").text("Cleopatra");
  $("#option-B").text("Ramsess II");
  $("#option-C").text("The Mummy");
  $("#option-D").text("Google it!");
}

//  Our trivia object.
var trivia = {
  time: 10,
  question: 0,
  correct: false,
  correctCount: 0,
  wrongCount: 0,
  
  reset: function () {

    trivia.time = 10;
    trivia.question = 0;
    console.log("Reset Button");
    //  Change the "timer-panel" div to "00:00."
    $("#timer-panel").html("<h1 class=" + "text-center" + "><strong>00:00</strong></h1>");
    // $("#question-panel").html("<h1 class="+"text-center"+"><strong>Question: "+egyptTrivia.questions[trivia.question]+"</strong></h1>"); 
    $(".start").hide();
    $(".restart").hide();
    trivia.start();
  },

  start: function () {
    console.log("Start");
    $("#question-panel").html("<h1 class=" + "text-center" + "><strong>Question: " + egyptTrivia.questions[trivia.question] + "</strong></h1>");
    options();
    var timeLeft = 1000
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

    //  Keep track of Question Timer
    if (trivia.time > 0) {
      trivia.time--;
      $("#timer-panel").html("<h1 class=" + "text-center" + "><strong>" + trivia.timeConverter(trivia.time) + "</strong></h1>");
      console.log("Clock Running --> intervalID: " + trivia.timeConverter(trivia.time));
    }
    else {
      console.log("Times UP");
      $("#question-panel").html("<h1 class=" + "text-center" + "><strong>TIMES UP!</strong></h1>");
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
