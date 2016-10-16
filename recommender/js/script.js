function OnChange(id) {

  if(id=="votes-text") {
    document.getElementById(id).innerHTML = "Votes: " + document.getElementById("votes").value;
  } else if (id=="views-text") {
    document.getElementById(id).innerHTML = "Views: " + document.getElementById("views").value;
  } else {
    document.getElementById(id).innerHTML = "Answers: " + document.getElementById("answers").value;
  }
}
