numViews = 0, numVotes = 0, numAnswers = 0;

var request;
var data;

function extractQuestion(){
  var question=document.getElementById('question').value;
  question=question.split(' ');
  console.log(question);

}

function loadData(callback) {

  if(window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else {
    request = new ActiveObject("Microsoft.XMLHTTP");
  }

  request.open("GET","data/data.json");

  request.onreadystatechange = function () {
    if (request.readyState == 4 && request.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(request.responseText);
    }
  };
  request.send(null);
}

function OnChange(id) {

  if(id=="votes-text") {
    numVotes = document.getElementById("votes").value;
    document.getElementById(id).innerHTML = "Votes: " + document.getElementById("votes").value;
  } else if (id=="views-text") {
    numViews = document.getElementById("views").value;
    document.getElementById(id).innerHTML = "Views: " + document.getElementById("views").value;
  } else {
    numAnswers = document.getElementById("answers").value;
    document.getElementById(id).innerHTML = "Answers: " + document.getElementById("answers").value;
  }

  recommendPosts(numVotes,numViews,numAnswers);

}

function recommendPosts(votes,views,answers) {

  console.log(votes);
  console.log(views);
  console.log(answers);
}

function init() {
 loadData(function(response) {
  // Parse JSON string into object
    data = JSON.parse(response);
 });
}
