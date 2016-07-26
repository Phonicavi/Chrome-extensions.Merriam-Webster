var request;
var vocabulary;

function setChildTextNode(elementId, text) {
  if (document.getElementById(elementId) != null) {
    document.getElementById(elementId).innerText = text;
  }
}

var sim_def, full_def;

function processResponse(responseText) {
  // tense-box quick-def-box simple-def-box card-box def-text 
  // card-box full-def-box secondary-card def-text 
  document.getElementById('content').innerHTML = responseText;
  sim_def = document.getElementsByClassName('tense-box quick-def-box simple-def-box card-box def-text ');
  full_def = document.getElementsByClassName('card-box full-def-box secondary-card def-text ');
  // document.getElementById('content').innerHTML = sim_def[0].innerHTML.toString();
  // document.getElementById('content').innerHTML = full_def[0].innerHTML.toString();
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#button').addEventListener('click', function() {
    vocabulary = document.getElementById('vocabulary').value;
    request = new XMLHttpRequest();
    request.open("GET", "http://www.merriam-webster.com/dictionary?s="+vocabulary, true);
    request.send();
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        processResponse(request.responseText);
      } else if (request.readyState == 4 && request.status != 200) {
        setChildTextNode('content', "not found");
      } else {
        setChildTextNode('content', "loading...");
      }
    }
  });
});
