// slider value
var slider = document.getElementById("pa-slider");
var PALEVEL = document.getElementById("sliderValue");

slider.oninput = function() {
    PALEVEL.innerHTML = this.value;
}


// process text input
const TEXTBODY = () => window.getSelection().toString();

function wordCount(str) {
    var ct = 0;
    for (var i = 0; i < str.length; i++)
      if (str(i) === " ") {
        ct = +1;
    }
    ct += 1;
    return ct;
}

function generate() {
    if (wordCount(TEXTBODY) <= 500) {
        response = getAPIResponse()
        
    }
    else {
        printTooLongError("Text prompt too long, try again.")
    }
}

function getAPIResponse() {
    const username = 'yourUsername';
    const password = 'yourPassword';
    const encodedCredentials = btoa(`${username}:${password}`)

    fetch('localhost:3000/api/adjust-pa.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
        },
        body: JSON.stringify({ text: TEXTBODY, pa: PALEVEL }),
    })
    .then(response => response.text())
    .then(data => console.log(data))
}

function printTooLongError() {
    var generateButton = document.getElementById("generate-button");
    if (generateButton) {
        generateButton.innerText = message;
    } else {
        console.error("Element with id 'generate-button' not found.");
    }
}


// copy button for generated text
function copy() {
    var copyText = document.getElementById("textbox");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Copied!");
}