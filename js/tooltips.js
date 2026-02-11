/**
 * Sistema de Tooltips Informativos
 * Muestra información adicional al pasar el mouse sobre elementos
 */

(function() {
  'use strict';

  let tooltip = null;

  /**
   * Crea el elemento tooltip si no existe
   */
  function createTooltip() {
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'custom-tooltip';
      tooltip.style.position = 'absolute';
      tooltip.style.display = 'none';
      tooltip.style.zIndex = '10000';
      document.body.appendChild(tooltip);
    }
    return tooltip;
  }

  /**
   * Muestra el tooltip
   */
  function showTooltip(element, text, position = 'top') {
    const tooltipEl = createTooltip();
    tooltipEl.textContent = text;
    tooltipEl.style.display = 'block';

    // Calcular posición
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltipEl.getBoundingClientRect();

    let top, left;

    switch(position) {
      case 'top':
        top = rect.top + window.scrollY - tooltipRect.height - 10;
        left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = rect.bottom + window.scrollY + 10;
        left = rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = rect.top + window.scrollY + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.left + window.scrollX - tooltipRect.width - 10;
        break;
      case 'right':
        top = rect.top + window.scrollY + (rect.height / 2) - (tooltipRect.height / 2);
        left = rect.right + window.scrollX + 10;
        break;
    }

    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.left = `${left}px`;
    tooltipEl.classList.add('show');
  }

  /**
   * Oculta el tooltip
   */
  function hideTooltip() {
    if (tooltip) {
      tooltip.classList.remove('show');
      setTimeout(() => {
        tooltip.style.display = 'none';
      }, 200);
    }
  }

  /**
   * Inicializa los tooltips
   */
  function init() {
    // Elementos con data-tooltip
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');

    elementsWithTooltip.forEach(element => {
      // Evitar agregar múltiples event listeners
      if (element.dataset.tooltipInitialized) return;
      element.dataset.tooltipInitialized = 'true';

      const text = element.dataset.tooltip;
      const position = element.dataset.tooltipPosition || 'top';

      element.addEventListener('mouseenter', function() {
        showTooltip(this, text, position);
      });

      element.addEventListener('mouseleave', hideTooltip);

      element.addEventListener('touchstart', function(e) {
        showTooltip(this, text, position);
        setTimeout(hideTooltip, 2000);
      });
    });

    // Agregar tooltips automáticos a elementos comunes
    addAutoTooltips();
  }

  /**
   * Agrega tooltips automáticamente a elementos comunes
   * Simplificado para mejor rendimiento
   */
  function addAutoTooltips() {
    // Solo botón de modo oscuro y subir (elementos críticos)
    const darkModeBtn = document.querySelector('.dark-mode-toggle');
    if (darkModeBtn && !darkModeBtn.dataset.tooltip) {
      darkModeBtn.dataset.tooltip = 'Cambiar tema';
      darkModeBtn.dataset.tooltipPosition = 'bottom';
    }

    const btnSubir = document.querySelector('.btn-subir');
    if (btnSubir && !btnSubir.dataset.tooltip) {
      btnSubir.dataset.tooltip = 'Volver arriba';
      btnSubir.dataset.tooltipPosition = 'left';
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer funciones globalmente
  window.Tooltips = {
    show: showTooltip,
    hide: hideTooltip,
    refresh: init
  };

})();
