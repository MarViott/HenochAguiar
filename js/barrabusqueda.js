console.log('Script de búsqueda cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, inicializando búsqueda...');
    
    const searchInput = document.getElementById('header-search-input');
    const searchBtn = document.getElementById('header-search-btn');

    console.log('Input encontrado:', searchInput);
    console.log('Botón encontrado:', searchBtn);

    if (!searchInput || !searchBtn) {
        console.error('ERROR: No se encontraron los elementos de búsqueda');
        return;
    }

    // Función de búsqueda
    function realizarBusqueda() {
        const termino = searchInput.value.trim().toLowerCase();
        
        console.log('=== INICIANDO BÚSQUEDA ===');
        console.log('Término:', termino);
        
        if (!termino) {
            alert('Por favor, ingresa un término de búsqueda');
            return;
        }

        let resultadosEncontrados = 0;

        // Limpiar highlights anteriores
        document.querySelectorAll('mark').forEach(mark => {
            const texto = mark.textContent;
            mark.replaceWith(texto);
        });

        // Buscar en tarjetas
        const cards = document.querySelectorAll('.card');
        console.log('Tarjetas encontradas:', cards.length);
        
        cards.forEach(card => {
            const titulo = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const texto = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
            
            if (titulo.includes(termino) || texto.includes(termino)) {
                card.style.display = 'flex';
                resultadosEncontrados++;
                
                // Resaltar en h3
                const h3 = card.querySelector('h3');
                if (h3 && h3.textContent.toLowerCase().includes(termino)) {
                    h3.innerHTML = h3.textContent.replace(
                        new RegExp(termino, 'gi'),
                        match => `<mark style="background-color: yellow; padding: 2px;">${match}</mark>`
                    );
                }
                
                // Resaltar en card-text
                const cardText = card.querySelector('.card-text');
                if (cardText && cardText.textContent.toLowerCase().includes(termino)) {
                    const originalText = cardText.textContent;
                    cardText.innerHTML = originalText.replace(
                        new RegExp(termino, 'gi'),
                        match => `<mark style="background-color: yellow; padding: 2px;">${match}</mark>`
                    );
                }
            } else {
                card.style.display = 'none';
            }
        });

        // Buscar en acordeones
        const accordionItems = document.querySelectorAll('.accordion-item');
        console.log('Acordeones encontrados:', accordionItems.length);
        
        accordionItems.forEach(item => {
            const textoCompleto = item.textContent.toLowerCase();
            
            if (textoCompleto.includes(termino)) {
                item.style.display = 'block';
                resultadosEncontrados++;
                
                // Expandir el acordeón
                const collapse = item.querySelector('.accordion-collapse');
                const button = item.querySelector('.accordion-button');
                
                if (collapse) {
                    collapse.classList.add('show');
                }
                if (button) {
                    button.classList.remove('collapsed');
                    button.setAttribute('aria-expanded', 'true');
                }
                
                // Resaltar texto
                const body = item.querySelector('.accordion-body');
                if (body) {
                    const paragraphs = body.querySelectorAll('strong, em, div');
                    paragraphs.forEach(p => {
                        if (p.textContent.toLowerCase().includes(termino)) {
                            const originalText = p.textContent;
                            p.innerHTML = originalText.replace(
                                new RegExp(termino, 'gi'),
                                match => `<mark style="background-color: yellow; padding: 2px;">${match}</mark>`
                            );
                        }
                    });
                }
            } else {
                item.style.display = 'none';
            }
        });

        console.log('Resultados encontrados:', resultadosEncontrados);

        // Mostrar mensaje
        if (resultadosEncontrados > 0) {
            if (typeof toastr !== 'undefined') {
                toastr.success(`Se encontraron ${resultadosEncontrados} resultado(s)`, 'Búsqueda completada');
            } else {
                alert(`Se encontraron ${resultadosEncontrados} resultado(s)`);
            }
        } else {
            if (typeof toastr !== 'undefined') {
                toastr.info('No se encontraron resultados', 'Sin resultados');
            } else {
                alert('No se encontraron resultados para "' + termino + '"');
            }
        }
    }

    // Limpiar búsqueda
    function limpiarBusqueda() {
        console.log('Limpiando búsqueda...');
        
        // Mostrar todas las tarjetas
        document.querySelectorAll('.card').forEach(card => {
            card.style.display = 'flex';
        });

        // Mostrar todos los acordeones
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.style.display = 'block';
        });

        // Quitar highlights
        document.querySelectorAll('mark').forEach(mark => {
            const texto = mark.textContent;
            mark.replaceWith(texto);
        });
    }

    // Event listeners
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Click en botón de búsqueda');
        realizarBusqueda();
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('Enter presionado');
            realizarBusqueda();
        }
    });

    searchInput.addEventListener('input', function(e) {
        if (e.target.value === '') {
            limpiarBusqueda();
        }
    });

    console.log('Sistema de búsqueda completamente inicializado');
});