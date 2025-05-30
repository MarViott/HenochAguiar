document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".rating-section").forEach(section => {
        const cardId = section.getAttribute("data-card-id");
        const stars = section.querySelectorAll(".star");

        // Obtener calificaciones previas y calcular promedio
        const savedRatings = JSON.parse(localStorage.getItem(`ratings-${cardId}`)) || [];
        const averageRating = savedRatings.length ? savedRatings.reduce((a, b) => a + b, 0) / savedRatings.length : 0;

        updateStars(stars, Math.round(averageRating));

        stars.forEach(star => {
            star.addEventListener("click", () => {
                const value = parseInt(star.getAttribute("data-value"));

                // Guardar nueva calificación
                savedRatings.push(value);
                localStorage.setItem(`ratings-${cardId}`, JSON.stringify(savedRatings));

                // Recalcular promedio y actualizar estrellas
                const newAverage = savedRatings.reduce((a, b) => a + b, 0) / savedRatings.length;
                updateStars(stars, Math.round(newAverage));
            });
        });
    });
});

// Función para actualizar la interfaz con el promedio
function updateStars(stars, value) {
    stars.forEach(star => star.classList.remove("active"));
    for (let i = 0; i < value; i++) {
        stars[i].classList.add("active");
    }
}