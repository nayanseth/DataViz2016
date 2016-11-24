numViews = 0, numVotes = 0, numAnswers = 0;

var stopwords = ["a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];

var request;
var question = "";
var data;

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


function extractQuestion(){
  question=document.getElementById('question').value;
  question=question.split(' ');

  for(var i =0;i<question.length;i++) {

    for(var j =0;j<stopwords.length;j++) {
      if(question[i]==stopwords[j]) {
        question.splice(i,1);
        i--;
        break;
      }
    }
  }

  recommendPosts();

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

  recommendPosts();

}

function recommendPosts() {

  /*
  if(numViews == 0 || numVotes== 0 || numAnswers ==0) {
    alert("Please specify parameters");
    return;
  }
  */

  var finalPosts;
  var parentNode = document.getElementById("recommendPosts");
  var child = document.getElementById("recommendedPosts");

  if(child) {
    parentNode.removeChild(child);
  }

  var div= document.createElement("div");
  parentNode.appendChild(div);
  div.setAttribute("id","recommendedPosts");

  if(question) {
    for(var i =0;i<data.length;i++) {
      var dataQuestion = data[i]["title"];
      for(var j=0;j<question.length;j++){

        if(question[j]=="r") {
            question[j] = question[j].toUpperCase();
        }

        if(dataQuestion.includes(question[j]) && data[i]["views"]>=numViews && data[i]["votes"]>=numVotes /*&& data[i]["answers"]>=numAnswers*/) {
          console.log(data[i]["tags"]);

          var p = document.createElement("p");
          div.appendChild(p);

          p.appendChild(document.createTextNode(dataQuestion));

        }
        break;
      }
    }
  }
}

function init() {
 loadData(function(response) {
  // Parse JSON string into object
    data = JSON.parse(response);
 });
}

init();
