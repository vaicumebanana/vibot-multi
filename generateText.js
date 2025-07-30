const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
  const { prompt } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    res.status(200).json({ text: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
