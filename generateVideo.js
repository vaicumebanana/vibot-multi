const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  const { prompt } = JSON.parse(event.body);
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  
  try {
    const model = genAI.getGenerativeModel({ model: "veo-3.0-generate-preview" });
    const result = await model.generateContent({ prompt });
    
    return {
      statusCode: 200,
      body: JSON.stringify({ videoUrl: result.response.videoUrl })
    };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
};
