mocha.setup('bdd');
const expect = chai.expect;

describe('Search Container', function() {
    it('should have a div with class "search-container"', function() {
        const container = document.querySelector('.search-container');
        expect(container).to.exist;
    });

    it('should contain an input with id "search-input" and placeholder "Buscar..."', function() {
        const input = document.getElementById('search-input');
        expect(input).to.exist;
        expect(input.type).to.equal('text');
        expect(input.placeholder).to.equal('Buscar...');
    });

    it('should contain a button with id "search-button" and title "Buscar"', function() {
        const button = document.getElementById('search-button');
        expect(button).to.exist;
        expect(button.title).to.equal('Buscar');
    });

    it('should contain an <i> element with class "fas fa-search" inside the button', function() {
        const button = document.getElementById('search-button');
        const icon = button.querySelector('i.fas.fa-search');
        expect(icon).to.exist;
    });
});

mocha.run();

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('header-search-input');
    const searchBtn = document.getElementById('header-search-btn');

    if (!searchInput || !searchBtn) return;

    // Función de búsqueda
    function realizarBusqueda() {
        const termino = searchInput.value.trim().toLowerCase();
        
        if (!termino) {
            toastr.warning('Por favor, ingresa un término de búsqueda', 'Búsqueda vacía');
            return;
        }

        // Buscar en tarjetas
        const cards = document.querySelectorAll('.card');
        let resultadosEncontrados = 0;

        cards.forEach(card => {
            const titulo = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const texto = card.querySelector('.card-text')?.textContent.toLowerCase() || '';
            
            if (titulo.includes(termino) || texto.includes(termino)) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.5s ease';
                resultadosEncontrados++;
                
                // Highlight del término buscado
                highlightText(card, termino);
            } else {
                card.style.display = 'none';
            }
        });

        // Buscar en acordeón (página de clipping)
        const accordionItems = document.querySelectorAll('.accordion-body');
        accordionItems.forEach(item => {
            const texto = item.textContent.toLowerCase();
            const accordionButton = item.closest('.accordion-item')?.querySelector('.accordion-button');
            
            if (texto.includes(termino)) {
                item.closest('.accordion-item').style.display = 'block';
                resultadosEncontrados++;
                highlightText(item, termino);
            } else {
                item.closest('.accordion-item').style.display = 'none';
            }
        });

        // Mostrar mensaje de resultados
        if (resultadosEncontrados > 0) {
            toastr.success(`Se encontraron ${resultadosEncontrados} resultado(s)`, 'Búsqueda completada');
        } else {
            toastr.info('No se encontraron resultados', 'Sin resultados');
        }
    }

    // Resaltar texto encontrado
    function highlightText(element, termino) {
        const textos = element.querySelectorAll('h3, .card-text, p');
        textos.forEach(texto => {
            const contenido = texto.innerHTML;
            const regex = new RegExp(`(${termino})`, 'gi');
            texto.innerHTML = contenido.replace(regex, '<mark style="background-color: yellow; padding: 2px;">$1</mark>');
        });
    }

    // Limpiar búsqueda
    function limpiarBusqueda() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'flex';
        });

        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
            item.style.display = 'block';
        });

        // Remover highlights
        const marks = document.querySelectorAll('mark');
        marks.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }

    // Event listeners
    searchBtn.addEventListener('click', realizarBusqueda);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            realizarBusqueda();
        }
    });

    // Limpiar búsqueda cuando se borra el input
    searchInput.addEventListener('input', (e) => {
        if (e.target.value === '') {
            limpiarBusqueda();
        }
    });

    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});