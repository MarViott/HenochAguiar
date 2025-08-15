document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".share-icon").forEach(icon => {
        icon.addEventListener("click", (event) => {
            const card = event.target.closest(".card");
            
            // Obtener información para compartir de diferentes maneras
            let urlToShare = window.location.href;
            let textToShare = "Mira esta publicación:";
            
            // Si la tarjeta tiene un ID, agregarlo a la URL
            if (card && card.id) {
                urlToShare += "#" + card.id;
            }
            
            // Intentar obtener el título de la tarjeta para un texto más específico
            const titleElement = card?.querySelector("h2, h3, h4, .card-title, strong");
            if (titleElement) {
                textToShare = `Mira: ${titleElement.textContent.trim()}`;
            }
            
            // Si estamos en la página de conferencias, obtener el título de la conferencia
            const conferenceTitle = card?.querySelector(".conf-container h3");
            if (conferenceTitle) {
                textToShare = `Conferencia: ${conferenceTitle.textContent.trim()}`;
            }
            
            // Codificar para URLs
            const encodedUrl = encodeURIComponent(urlToShare);
            const encodedText = encodeURIComponent(textToShare);

            // Opciones de compartir
            const shareOptions = {
                instagram: `https://www.instagram.com/`,
                twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
                linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`,
                whatsapp: `https://api.whatsapp.com/send?text=${encodedText} ${encodedUrl}`
            };

            // Crear el menú emergente
            const shareMenu = document.createElement("div");
            shareMenu.classList.add("share-menu-container");
            shareMenu.innerHTML = `
                <div class="share-menu">
                    <a href="${shareOptions.instagram}" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
                    <a href="${shareOptions.twitter}" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                    <a href="${shareOptions.linkedin}" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
                    <a href="${shareOptions.whatsapp}" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i></a>
                </div>
            `;

            // Posicionar el menú cerca del ícono
            const iconRect = icon.getBoundingClientRect();
            shareMenu.style.position = "absolute";
            shareMenu.style.top = `${iconRect.bottom + window.scrollY + 5}px`;
            shareMenu.style.left = `${iconRect.left + window.scrollX - 50}px`;
            shareMenu.style.zIndex = "1000";
            document.body.appendChild(shareMenu);

            // Cierra el menú al hacer clic fuera
            const closeMenu = (e) => {
                if (!shareMenu.contains(e.target) && e.target !== icon) {
                    shareMenu.remove();
                    document.removeEventListener("click", closeMenu);
                }
            };
            
            // Pequeño delay para evitar que se cierre inmediatamente
            setTimeout(() => {
                document.addEventListener("click", closeMenu);
            }, 100);
        });
    });
});