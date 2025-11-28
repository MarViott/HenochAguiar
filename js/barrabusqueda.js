console.log('Script de búsqueda cargado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado');
    
    // Esperar un poco para que todo se cargue
    setTimeout(function() {
        console.log('Verificando jQuery:', typeof jQuery !== 'undefined');
        console.log('Verificando toastr:', typeof toastr !== 'undefined');
        
        const searchInput = document.getElementById('header-search-input');
        const searchBtn = document.getElementById('header-search-btn');

        if (!searchInput || !searchBtn) {
            console.error('ERROR: No se encontraron los elementos de búsqueda');
            return;
        }
        
        console.log('Elementos encontrados, inicializando...');

        // Función de búsqueda
        function realizarBusqueda() {
            const termino = searchInput.value.trim().toLowerCase();
            
            console.log('Buscando:', termino);
            
            if (!termino) {
                alert('Por favor, ingresa un término de búsqueda');
                return;
            }

            let resultadosEncontrados = 0;

            // Limpiar highlights anteriores
            document.querySelectorAll('mark').forEach(mark => {
                mark.replaceWith(mark.textContent);
            });

            // Buscar en tarjetas
            const cards = document.querySelectorAll('.card');
            console.log('Tarjetas encontradas:', cards.length);
            
            cards.forEach(card => {
                const texto = card.textContent.toLowerCase();
                
                if (texto.includes(termino)) {
                    card.style.display = 'flex';
                    resultadosEncontrados++;
                    
                    // Resaltar
                    const h3 = card.querySelector('h3');
                    if (h3 && h3.textContent.toLowerCase().includes(termino)) {
                        h3.innerHTML = h3.textContent.replace(
                            new RegExp(termino, 'gi'),
                            match => `<mark style="background-color: yellow;">${match}</mark>`
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
                const texto = item.textContent.toLowerCase();
                
                if (texto.includes(termino)) {
                    item.style.display = 'block';
                    resultadosEncontrados++;
                    
                    // Expandir
                    const collapse = item.querySelector('.accordion-collapse');
                    const button = item.querySelector('.accordion-button');
                    
                    if (collapse) collapse.classList.add('show');
                    if (button) {
                        button.classList.remove('collapsed');
                        button.setAttribute('aria-expanded', 'true');
                    }

                    // Resaltar en todos los nodos de texto relevantes
                    const body = item.querySelector('.accordion-body');
                    if (body) {
                        // Puedes agregar aquí más selectores si tienes otros tipos de nodos
                        const nodos = body.querySelectorAll('strong, em, div, p, span');
                        nodos.forEach(nodo => {
                            if (nodo.textContent.toLowerCase().includes(termino)) {
                                nodo.innerHTML = nodo.textContent.replace(
                                    new RegExp(termino, 'gi'),
                                    match => `<mark style="background-color: yellow;">${match}</mark>`
                                );
                            }
                        });
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            // Mostrar resultado - FORZAR toastr
            console.log('Resultados encontrados:', resultadosEncontrados);
            console.log('toastr existe?', typeof toastr);
            
            if (resultadosEncontrados > 0) {
                const mensaje = `Se encontraron ${resultadosEncontrados} resultado(s)`;
                
                // Intentar toastr primero
                try {
                    if (window.toastr) {
                        console.log('Llamando a toastr.success');
                        window.toastr.success(mensaje, 'Búsqueda completada');
                    } else {
                        throw new Error('Toastr no disponible');
                    }
                } catch(e) {
                    console.error('Error con toastr:', e);
                    alert(mensaje);
                }
            } else {
                try {
                    if (window.toastr) {
                        console.log('Llamando a toastr.info');
                        window.toastr.info('No se encontraron resultados', 'Sin resultados');
                    } else {
                        throw new Error('Toastr no disponible');
                    }
                } catch(e) {
                    console.error('Error con toastr:', e);
                    alert('No se encontraron resultados');
                }
            }
        }

        // Limpiar
        function limpiarBusqueda() {
            document.querySelectorAll('.card').forEach(card => card.style.display = 'flex');
            document.querySelectorAll('.accordion-item').forEach(item => item.style.display = 'block');
            document.querySelectorAll('mark').forEach(mark => mark.replaceWith(mark.textContent));
        }

        // Event listeners
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            realizarBusqueda();
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                realizarBusqueda();
            }
        });

        searchInput.addEventListener('input', function(e) {
            if (e.target.value === '') limpiarBusqueda();
        });

        console.log('Búsqueda inicializada correctamente');
        
    }, 1000); // Esperar 1000ms para que todo se cargue
});