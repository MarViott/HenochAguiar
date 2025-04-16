// Ejemplo de función de traducción usando fetch y Google Translate API
async function traducirTexto(texto) {
    const apiKey = 'TU_API_KEY'; // Reemplaza con tu clave de API
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    
    const body = {
      q: texto,
      source: 'es', // Idioma original: español
      target: 'en', // Idioma destino: inglés
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const resultado = await response.json();
    return resultado.data.translations[0].translatedText;
  }
  
  // Ejemplo de uso
  traducirTexto('Hola, ¿cómo estás?').then((traduccion) => {
    console.log(traduccion); // Output: Hello, how are you?
  });
