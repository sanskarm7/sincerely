const dotenv = require("dotenv").config()

const OpenAI = require("openai");

const API_KEY = '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';

const openai = new OpenAI(API_KEY);

console.log("REACHED")

async function passive_aggressive_scale(text, scale) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "given this text: ${text}" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

passive_aggressive_scale("i love sunshine and rainbows", );