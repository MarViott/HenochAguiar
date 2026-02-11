/**
 * Sistema de Búsqueda en Tiempo Real
 * Muestra resultados instantáneos mientras el usuario escribe
 */

(function() {
  'use strict';

  let searchInput = null;
  let searchBtn = null;
  let resultsContainer = null;
  let allCards = [];
  let searchTimeout = null;

  /**
   * Crea el contenedor de resultados si no existe
   */
  function createResultsContainer() {
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.id = 'search-results-live';
      resultsContainer.className = 'search-results-container';
      resultsContainer.style.display = 'none';
      
      // Insertar después del input de búsqueda
      const headerSearch = document.querySelector('.header-search');
      if (headerSearch) {
        headerSearch.appendChild(resultsContainer);
      }
    }
    return resultsContainer;
  }

  /**
   * Busca en tiempo real (requiere mínimo 3 caracteres)
   */
  function searchRealTime(query) {
    if (!query || query.length < 3) {
      hideResults();
      showAllCards();
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = [];

    // Limitar búsqueda para mejor rendimiento
    const cardsToSearch = allCards.length > 50 ? allCards.slice(0, 50) : allCards;

    // Buscar en las cards
    cardsToSearch.forEach((card, index) => {
      const title = card.querySelector('h3')?.textContent || '';
      const text = card.querySelector('.card-text')?.textContent || '';
      const fullText = (title + ' ' + text).toLowerCase();

      if (fullText.includes(lowerQuery)) {
        results.push({
          element: card,
          title: title,
          excerpt: getExcerpt(fullText, lowerQuery),
          index: index
        });
      }
    });

    // Mostrar resultados
    displayResults(results, query);
    filterCards(results);
  }

  /**
   * Obtiene un extracto del texto con el término resaltado
   */
  function getExcerpt(text, query, contextLength = 80) {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text.substring(0, contextLength) + '...';

    const start = Math.max(0, index - contextLength / 2);
    const end = Math.min(text.length, index + query.length + contextLength / 2);
    
    let excerpt = text.substring(start, end);
    if (start > 0) excerpt = '...' + excerpt;
    if (end < text.length) excerpt = excerpt + '...';

    // Resaltar el término
    const regex = new RegExp(`(${query})`, 'gi');
    excerpt = excerpt.replace(regex, '<mark>$1</mark>');

    return excerpt;
  }

  /**
   * Muestra los resultados en el dropdown
   */
  function displayResults(results, query) {
    const container = createResultsContainer();

    if (results.length === 0) {
      container.innerHTML = `
        <div class="search-no-results">
          <i class="fas fa-search"></i>
          <p>No se encontraron resultados para "<strong>${query}</strong>"</p>
        </div>
      `;
    } else {
      let html = `
        <div class="search-results-header">
          <strong>${results.length}</strong> resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}
        </div>
        <div class="search-results-list">
      `;

      results.slice(0, 5).forEach(result => {
        html += `
          <div class="search-result-item" data-card-index="${result.index}">
            <div class="search-result-title">${highlightText(result.title, query)}</div>
            <div class="search-result-excerpt">${result.excerpt}</div>
          </div>
        `;
      });

      if (results.length > 5) {
        html += `
          <div class="search-results-more">
            +${results.length - 5} resultado${results.length - 5 !== 1 ? 's' : ''} más
          </div>
        `;
      }

      html += '</div>';
      container.innerHTML = html;

      // Agregar eventos click a los resultados
      container.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', function() {
          const cardIndex = parseInt(this.dataset.cardIndex);
          scrollToCard(cardIndex);
          hideResults();
        });
      });
    }

    container.style.display = 'block';
  }

  /**
   * Resalta el texto buscado
   */
  function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Filtra visualmente las cards
   */
  function filterCards(results) {
    const resultIndexes = results.map(r => r.index);
    
    allCards.forEach((card, index) => {
      if (resultIndexes.includes(index)) {
        card.style.display = '';
        card.style.opacity = '1';
      } else {
        card.style.opacity = '0.3';
        card.style.pointerEvents = 'none';
      }
    });
  }

  /**
   * Muestra todas las cards
   */
  function showAllCards() {
    allCards.forEach(card => {
      card.style.display = '';
      card.style.opacity = '1';
      card.style.pointerEvents = '';
    });
  }

  /**
   * Oculta el contenedor de resultados
   */
  function hideResults() {
    if (resultsContainer) {
      resultsContainer.style.display = 'none';
    }
  }

  /**
   * Scroll suave hacia una card
   */
  function scrollToCard(index) {
    if (allCards[index]) {
      allCards[index].scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      
      // Efecto de highlight
      allCards[index].style.transition = 'all 0.3s ease';
      allCards[index].style.boxShadow = '0 0 20px rgba(232, 176, 92, 0.8)';
      setTimeout(() => {
        allCards[index].style.boxShadow = '';
      }, 2000);
    }
  }

  /**
   * Inicializa el sistema de búsqueda
   */
  function init() {
    searchInput = document.getElementById('header-search-input');
    searchBtn = document.getElementById('header-search-btn');
    allCards = Array.from(document.querySelectorAll('.card'));

    if (!searchInput || !searchBtn) {
      console.warn('Elementos de búsqueda no encontrados');
      return;
    }

    // Prevenir inicialización múltiple
    if (searchInput.dataset.searchInitialized) return;
    searchInput.dataset.searchInitialized = 'true';

    // Evento de input (búsqueda en tiempo real con debounce más largo)
    searchInput.addEventListener('input', function(e) {
      clearTimeout(searchTimeout);
      // Solo buscar si hay al menos 3 caracteres
      if (e.target.value.length < 3) {
        hideResults();
        showAllCards();
        return;
      }
      searchTimeout = setTimeout(() => {
        searchRealTime(e.target.value);
      }, 500); // Debounce de 500ms para mejor rendimiento
    });

    // Evento de foco
    searchInput.addEventListener('focus', function() {
      if (this.value.length >= 3) {
        searchRealTime(this.value);
      }
    });

    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.header-search')) {
        hideResults();
      }
    });

    // Evento del botón de búsqueda
    searchBtn.addEventListener('click', function() {
      if (searchInput.value) {
        searchRealTime(searchInput.value);
      }
    });

    // Enter para buscar
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchRealTime(this.value);
      }
    });

    // Limpiar al vaciar
    searchInput.addEventListener('blur', function() {
      setTimeout(() => {
        if (!this.value) {
          showAllCards();
        }
      }, 200);
    });
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer funciones globalmente
  window.SearchRealTime = {
    search: searchRealTime,
    refresh: init
  };

})();
