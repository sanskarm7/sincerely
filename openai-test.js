const dotenv = require("dotenv").config()

const OpenAI = require("openai");

const API_KEY = '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';

const openai = new OpenAI(API_KEY);

console.log("REACHED")

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "how was your day (one word only" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();