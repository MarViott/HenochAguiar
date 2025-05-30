document.addEventListener("DOMContentLoaded", function () {
    const menu = document.getElementById("menu");

    menu.addEventListener("click", function (event) {
        let link = event.target.closest("a");

        if (link) {
            // Remover cualquier texto previo
            document.querySelectorAll(".menu-label").forEach(label => label.remove());

            // Crear el elemento de texto dinámicamente
            let label = document.createElement("span");
            label.textContent = link.getAttribute("data-label");
            label.classList.add("menu-label");

            // Insertar el texto debajo del ícono
            link.appendChild(label);

            // Animar la aparición y desaparición
            label.style.opacity = "1";
            setTimeout(() => {
                label.style.opacity = "0";
                setTimeout(() => label.remove(), 500); // Elimina el texto tras la animación
            }, 2000);
        }
    });
});

 