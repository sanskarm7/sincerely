require("dotenv").config()

const OpenAI = require("openai");

const MY_KEY = process.env.API_KEY

const openai = new OpenAI({ apiKey: MY_KEY });

console.log("REACHED")

const passiveAggressivenessLevels = {
  0: 'not passive aggressive at all',
  1: 'a little passive aggressive that is almost unnoticeable',
  2: 'a little passive aggressive',
  3: 'passive aggressive',
  4: 'very passive aggressive',
  5: "extremely passive aggressive, to the point that it's offensive",
  6: "the most passive aggressive statement that can exist from the content of this statement"
};

class TokenLengthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TokenLengthError'; // Assign a custom name to your error
  }
}

function countTokens(text) {
  // Use a regular expression to split the text by word boundaries
  const tokens = text.split(/\s+/);

  // Filter out empty tokens (resulting from multiple spaces)
  const nonEmptyTokens = tokens.filter(token => token.trim() !== '');

  return nonEmptyTokens.length;
}

const passiveAggressiveScale = async (text, value) => {
  const tokens = countTokens(text)
  const selectedScale = passiveAggressivenessLevels[value];
  if(tokens <= 500 && tokens >= 5){
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `I want to adjust the level of passive-aggressiveness of a passage: "${text}" so that it is ${selectedScale}. In other words, using a passive-aggressiveness scale from 1-7 (1 being neutral and 7 being the most passive-aggressive), change the text to have a score of ${value}. Only respond with the edited text.` }],
      model: "gpt-3.5-turbo",
    });
    const aiResponse = await completion.choices[0].message.content
    return aiResponse;
  }
  else {
    if(tokens > 500){
      throw new TokenLengthError('Please highlight less text and try again');
    }
    else{
      throw new TokenLengthError('Please highlight some text and try again');
    }
   
  }
}

module.exports = passiveAggressiveScale

/*
try {
  passive_aggressive_scale('Hello boss, I have been coming into the office and your cat has been disturbing me quite often.', 5);
} catch (error) {
  if (error instanceof TokenLengthError) {
    console.error(`${error.name}: ${error.message}`);
  } else {
    // Handle other types of errors
    console.error(error.message);
  }
}
*/
