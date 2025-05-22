// Selecciona el botón y el body
const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

// Función para alternar el modo oscuro
function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    
    // Guarda la preferencia del usuario
    localStorage.setItem('dark-mode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

// Verifica el estado guardado en localStorage al cargar la página
if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
}

// Agrega el evento de clic al botón
toggleButton.addEventListener('click', toggleDarkMode);

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleButton = document.getElementById("toggle-theme");

  // Verificar el modo guardado
  if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark-mode");
  }

  toggleButton.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
  });
});

