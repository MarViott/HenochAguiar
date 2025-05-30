 document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".share-icon").forEach(icon => {
        icon.addEventListener("click", (event) => {
            const card = event.target.closest(".card");
            const urlToShare = encodeURIComponent(window.location.href + "#" + card.id);
            const textToShare = encodeURIComponent("Mira esta publicación:");

            // Opciones de compartir
            const shareOptions = {
                instagram: `https://www.instagram.com/`,
                twitter: `https://twitter.com/intent/tweet?url=${urlToShare}&text=${textToShare}`,
                linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${urlToShare}`,
                whatsapp: `https://api.whatsapp.com/send?text=${textToShare} ${urlToShare}`
            };

            // Crear el menú emergente
            const shareMenu = document.createElement("div");
            shareMenu.classList.add("share-menu-container");
            shareMenu.innerHTML = `
                <div class="share-menu">
                    <a href="${shareOptions.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="${shareOptions.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>
                    <a href="${shareOptions.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <a href="${shareOptions.whatsapp}" target="_blank"><i class="fab fa-whatsapp"></i></a>
                </div>
            `;

            // Posicionar el menú cerca del ícono
            const iconRect = icon.getBoundingClientRect();
            shareMenu.style.position = "absolute";
            shareMenu.style.top = `${iconRect.bottom + window.scrollY}px`;
            shareMenu.style.left = `${iconRect.left + window.scrollX}px`;
            document.body.appendChild(shareMenu);

            // Cierra el menú al hacer clic fuera
            const closeMenu = (e) => {
                if (!shareMenu.contains(e.target) && e.target !== icon) {
                    shareMenu.remove();
                    document.removeEventListener("click", closeMenu);
                }
            };
            document.addEventListener("click", closeMenu);
        });
    });
});