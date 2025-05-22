document.getElementById("secureForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let form = event.target;
    let username = form.username.value.trim();
    let email = form.email.value.trim();
    let mensaje = form.mensaje.value.trim();
    let ocupacion = form.ocupacion.value;
    let feedback = document.getElementById("form-message");

    if (username.length < 3) {
        feedback.textContent = "El nombre debe tener al menos 3 caracteres.";
        feedback.style.color = "red";
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        feedback.textContent = "Por favor, ingresa un correo válido.";
        feedback.style.color = "red";
        return;
    }

    if (!ocupacion) {
        feedback.textContent = "Por favor, selecciona tu ocupación.";
        feedback.style.color = "red";
        return;
    }

    if (mensaje.length < 10) {
        feedback.textContent = "El mensaje debe contener al menos 10 caracteres.";
        feedback.style.color = "red";
        return;
    }

    feedback.textContent = "Enviando...";
    feedback.style.color = "green";
    
    // Enviar el formulario a Formspree
    form.submit();
});