// Configuración de Toastr
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

document.getElementById("secureForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let form = event.target;
    let username = form.username.value.trim();
    let email = form.email.value.trim();
    let mensaje = form.mensaje.value.trim();
    let ocupacion = form.ocupacion.value;

    // Validación del nombre
    if (username.length < 3) {
        toastr.error('El nombre debe tener al menos 3 caracteres.', 'Error de validación');
        return;
    }

    // Validación del email
    if (!email.includes("@") || !email.includes(".")) {
        toastr.error('Por favor, ingresa un correo válido.', 'Error de validación');
        return;
    }

    // Validación de ocupación
    if (!ocupacion) {
        toastr.warning('Por favor, selecciona tu ocupación.', 'Campo requerido');
        return;
    }

    // Validación del mensaje
    if (mensaje.length < 10) {
        toastr.error('El mensaje debe contener al menos 10 caracteres.', 'Error de validación');
        return;
    }

    // Mostrar mensaje de carga
    toastr.info('Enviando tu mensaje...', 'Procesando');
    
    // Simular envío exitoso (el formulario se enviará a Formspree)
    setTimeout(() => {
        toastr.success('¡Tu mensaje ha sido enviado correctamente!', 'Éxito');
        form.submit();
    }, 1000);
});