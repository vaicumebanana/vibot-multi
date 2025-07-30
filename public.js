document.getElementById('generate-btn').addEventListener('click', async () => {
  const prompt = document.getElementById('prompt').value;
  const resultDiv = document.getElementById('result');
  
  try {
    const response = await fetch('/.netlify/functions/generateVideo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    const data = await response.json();
    resultDiv.innerHTML = `
      <video src="${data.videoUrl}" controls></video>
      <a href="${data.videoUrl}" download>Baixar Vídeo</a>
    `;
  } catch (error) {
    resultDiv.innerHTML = `Erro: ${error.message}`;
  }
});
