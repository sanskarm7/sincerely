require("dotenv").config()

const OpenAI = require("openai");

const MY_KEY = process.env.API_KEY

const openai = new OpenAI({ apiKey: MY_KEY });

console.log("REACHED")

async function passive_aggressive_scale(text, scale) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Give me a random word." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

passive_aggressive_scale();