/** sliders/visuals */

// slider value
var TEXTBODY = '';
var slider = document.getElementById("pa-slider");
var sliderNum = document.getElementById("sliderValue");


slider.oninput = function () {
  sliderNum.innerHTML = this.value;
}
var sliderNumAsString = sliderNum.textContent;
var PALEVEL = parseInt(sliderNumAsString);


// Event handlers
var generateButton = document.querySelector('.generate-button');
generateButton.addEventListener('click', generate);

var copyButton = document.querySelector('.copy-button');
copyButton.addEventListener('click', copy);

/** text input processing */

// assign highlighted text to TEXTBODY
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { action: "getSelection" }, function (response) {
    if (response && response.selection) {
      TEXTBODY = response.selection;
      setPALevel();
      printInBox(TEXTBODY);
    }
    else {
      printInBox("No text selected.");
    }
  });
});

async function setPALevel() {
  try {

    PALEVEL = await getInitialPALevel(TEXTBODY)
    // handle response from content script
    //console.log('Set Level:', PALEVEL);
    //printInBox(generatedText + PALEVEL);

    slider.value = PALEVEL;
    sliderNum.innerHTML = PALEVEL;
  } catch (error) {
    console.error('Error:', error);
  }
}


// generate button
async function generate() {
  try {
    // send a message to content script to get highlighted text
    //const response = await sendMessageToContentScript({ action: 'getHighlightedText' });
    //console.log(TEXTBODY)
    slider.oninput = function () {
      sliderNum.innerHTML = this.value;
    }
    sliderNumAsString = sliderNum.textContent;
    PALEVEL = parseInt(sliderNumAsString);
    const generatedText = await getAPIResponse(TEXTBODY)
    // handle response from content script
    console.log('Received response in popup:', generatedText);
    printInBox(generatedText);

  } catch (error) {
    console.error('Error:', error);
  }
}

async function getInitialPALevel(inputString) {
  console.log(inputString)
  const url = 'http://localhost:3000/api/evaluatePA.json'
  const username = '#';
  const password = '#';
  const encodedCredentials = btoa(`${username}:${password}`)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Basic ${encodedCredentials}`
    },
    body: JSON.stringify({ text: inputString })
  }

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return parseInt(data['message']); // Return the data for use elsewhere
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// gets generated text from server given input
async function getAPIResponse(inputString) {
  console.log(inputString)
  const url = 'http://localhost:3000/api/adjust-pa.json'
  const username = '#';
  const password = '#';
  const encodedCredentials = btoa(`${username}:${password}`)

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Basic ${encodedCredentials}`
    },
    body: JSON.stringify({ text: inputString, pa: PALEVEL })
  }

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data['message']; // Return the data for use elsewhere
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


//helper functions
function wordCount(str) {
  var ct = 0;
  for (var i = 0; i < str.length; i++)
    if (str(i) === " ") {
      ct = +1;
    }
  ct += 1;
  return ct;
}

function printInBox(message) {
  document.getElementById('textbox').innerText = (message);
}

function printTooLongError(message) {
  var generateButton = document.getElementById("generate-button");
  if (generateButton) {
    generateButton.innerText = message;
  } else {
    console.error("Element with id 'generate-button' not found.");
  }
}


/** copying text */

// copy button for generated text
function copy() {
  var boxText = document.getElementById('textbox').innerText;
  var temp = document.createElement('input');
  temp.setAttribute('value', boxText);
  document.body.appendChild(temp);
  temp.select();
  temp.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(temp.value); // Extract value here
  document.body.removeChild(temp); // Remove the temporary input element
  //alert("Copied!");
}


