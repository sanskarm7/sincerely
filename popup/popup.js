// slider value
var slider = document.getElementById("pa-slider");
var PALEVEL = document.getElementById("sliderValue");

slider.oninput = function() {
    PALEVEL.innerHTML = this.value;
}

// Event handlers
var generateButton = document.querySelector('.generate-button');
generateButton.addEventListener('click', generate);

var copyButton = document.querySelector('.copy-button');
copyButton.addEventListener('click', copy);

// process text input
const TEXTBODY = window.getSelection().toString();
console.log(TEXTBODY)

function wordCount(str) {
    var ct = 0;
    for (var i = 0; i < str.length; i++)
      if (str(i) === " ") {
        ct = +1;
    }
    ct += 1;
    return ct;
}
async function getAPIResponse() {
    const url = 'http://localhost:3000/api/adjust-pa.json'
    const username = 'SincerelyTeam';
    const password = 'PassiveAggressive01011419';
    const encodedCredentials = btoa(`${username}:${password}`)
    
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Basic ${encodedCredentials}`
        },
        body: JSON.stringify({ text: 'Your feet have been smelling very bad. Please stop wearing sandals to the office.', pa: PALEVEL })
    }

    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data; // Return the data for use elsewhere
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function printTooLongError() {
    var generateButton = document.getElementById("generate-button");
    if (generateButton) {
        generateButton.innerText = message;
    } else {
        console.error("Element with id 'generate-button' not found.");
    }
}

async function generate() {
    try {
        // Send a message to the content script to get highlighted text
        const response = await sendMessageToContentScript({ action: 'getHighlightedText' });
    
        // Handle the response from the content script
        console.log('Received response in popup:', response);
        
      } catch (error) {
        console.error('Error:', error);
      }
    

    if (wordCount(TEXTBODY) <= 500) {
        generatedString = await getAPIResponse()
        document.querySelector('.text-box').innerHTML = generatedString;
    }
    else {
        printTooLongError("Text prompt too long, try again.")
    }
}

function sendMessageToContentScript(message) {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });
    });
  }
  

// copy button for generated text
function copy() {
    var copyText = document.getElementById("textbox");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Copied!");
}


