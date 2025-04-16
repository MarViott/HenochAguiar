// Selecciona el botón y el body
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

// Alterna la clase 'dark-mode' en el body
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

// Mantener el estado del modo oscuro
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
  }

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
  
    // Guarda la preferencia del usuario
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
  console.log(localStorage.getItem('dark-mode'));