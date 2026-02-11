/**
 * Modal de Vista Previa
 * Gestiona la apertura y cierre del modal con información detallada de las cards
 */

(function() {
  'use strict';

  // Elementos del DOM
  const modal = document.getElementById('previewModal');
  const closeBtn = document.querySelector('.close-modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalMeta = document.getElementById('modalMeta');
  const modalMedia = document.getElementById('modalMedia');
  const modalReadMore = document.getElementById('modalReadMore');
  const modalShare = document.getElementById('modalShare');

  let currentLink = '';

  /**
   * Abre el modal con el contenido de la card
   */
  function openModal(cardData) {
    // Título
    modalTitle.textContent = cardData.title || 'Sin título';

    // Imagen
    if (cardData.image) {
      modalImage.innerHTML = `<img src="${cardData.image}" alt="${cardData.title}">`;
      modalImage.style.display = 'block';
    } else {
      modalImage.innerHTML = '';
      modalImage.style.display = 'none';
    }

    // Descripción
    modalDescription.innerHTML = cardData.description || 'Sin descripción disponible.';

    // Meta información (fecha y fuente)
    modalMeta.innerHTML = '';
    if (cardData.date) {
      modalMeta.innerHTML += `<span class="modal-date">📅 ${cardData.date}</span>`;
    }
    if (cardData.source) {
      modalMeta.innerHTML += `<span class="modal-source">📰 ${cardData.source}</span>`;
    }

    // Media (audio/iframe)
    if (cardData.media) {
      modalMedia.innerHTML = cardData.media;
      modalMedia.style.display = 'block';
    } else {
      modalMedia.innerHTML = '';
      modalMedia.style.display = 'none';
    }

    // Link del artículo completo
    currentLink = cardData.link || '#';

    // Mostrar el modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
  }

  /**
   * Cierra el modal
   */
  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentLink = '';
  }

  /**
   * Extrae los datos de una card
   */
  function extractCardData(card) {
    const data = {};

    // Título
    const titleElement = card.querySelector('h3');
    data.title = titleElement ? titleElement.textContent.trim() : '';

    // Imagen
    const imgElement = card.querySelector('img');
    data.image = imgElement ? imgElement.src : null;

    // Descripción
    const descElement = card.querySelector('.card-text');
    data.description = descElement ? descElement.innerHTML : '';

    // Link
    const linkElement = card.querySelector('.btn a');
    data.link = linkElement ? linkElement.href : '';

    // Media (audio o iframe)
    const audioElement = card.querySelector('audio');
    const iframeElement = card.querySelector('iframe');
    
    if (audioElement) {
      data.media = audioElement.outerHTML;
    } else if (iframeElement) {
      data.media = iframeElement.outerHTML;
    }

    // Extraer fecha y fuente del texto de la descripción
    const emElement = descElement ? descElement.querySelector('em') : null;
    if (emElement) {
      const metaText = emElement.textContent;
      // Intentar extraer fecha (buscar patrones de fecha)
      const dateMatch = metaText.match(/(\d{1,2}\s+de\s+\w+\s+de\s+\d{4})/i);
      if (dateMatch) {
        data.date = dateMatch[1];
      }
      data.source = metaText;
    }

    return data;
  }

  /**
   * Inicializa los listeners
   */
  function init() {
    // Cerrar modal con el botón X
    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModal();
      }
    });

    // Botón "Leer artículo completo"
    if (modalReadMore) {
      modalReadMore.addEventListener('click', function() {
        if (currentLink) {
          window.open(currentLink, '_blank', 'noopener,noreferrer');
        }
      });
    }

    // Botón "Compartir"
    if (modalShare) {
      modalShare.addEventListener('click', function() {
        if (currentLink && navigator.share) {
          navigator.share({
            title: modalTitle.textContent,
            url: currentLink
          }).catch(err => console.log('Error al compartir:', err));
        } else if (currentLink) {
          // Fallback: copiar al portapapeles
          navigator.clipboard.writeText(currentLink).then(() => {
            // Mostrar notificación si Toastr está disponible
            if (typeof toastr !== 'undefined') {
              toastr.success('¡Link copiado al portapapeles!');
            } else {
              alert('¡Link copiado al portapapeles!');
            }
          });
        }
      });
    }

    // Agregar botones de vista previa a todas las cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      // Verificar si ya tiene el botón
      if (card.querySelector('.btn-preview')) {
        return;
      }

      // Crear botón de vista previa
      const previewBtn = document.createElement('button');
      previewBtn.className = 'btn-preview';
      previewBtn.innerHTML = '👁️ Vista Previa';
      previewBtn.setAttribute('aria-label', 'Ver vista previa del artículo');

      // Insertar el botón antes del botón "Leer más"
      const btnContainer = card.querySelector('.btn');
      if (btnContainer) {
        btnContainer.parentElement.insertBefore(previewBtn, btnContainer);
      } else {
        // Si no hay botón, agregarlo al final del contenido
        const cardText = card.querySelector('.card-text');
        if (cardText) {
          cardText.parentElement.insertBefore(previewBtn, cardText.nextSibling);
        }
      }

      // Listener para abrir el modal
      previewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const cardData = extractCardData(card);
        openModal(cardData);
      });
    });
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer funciones globalmente si se necesitan
  window.ModalPreview = {
    open: openModal,
    close: closeModal
  };

})();
