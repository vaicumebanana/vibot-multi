const { GoogleGenerativeAI } = require("@google/generative-ai");

export default async function handler(req, res) {
  const { prompt } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash" });
    const result = await model.generateContent({
      contents: [{
        parts: [{
          text: `Gere uma imagem realista de: ${prompt}`
        }]
      }]
    });
    
    const imageData = result.response.candidates[0].content.parts[0].data;
    res.status(200).json({ imageUrl: `data:image/png;base64,${imageData}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
