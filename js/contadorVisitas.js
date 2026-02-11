/**
 * Contador de Visitas
 * Sistema simple de conteo de visitas usando localStorage
 */

(function() {
  'use strict';

  /**
   * Incrementa el contador de visitas para una página específica
   */
  function incrementarVisitas(pagina) {
    const clave = `visitas_${pagina}`;
    let visitas = parseInt(localStorage.getItem(clave) || '0');
    visitas++;
    localStorage.setItem(clave, visitas.toString());
    return visitas;
  }

  /**
   * Obtiene el número de visitas de una página
   */
  function obtenerVisitas(pagina) {
    const clave = `visitas_${pagina}`;
    return parseInt(localStorage.getItem(clave) || '0');
  }

  /**
   * Actualiza el display del contador en el DOM
   */
  function actualizarDisplay(pagina) {
    const contador = document.getElementById('contador-visitas');
    if (!contador) return;

    const visitas = incrementarVisitas(pagina);
    const numero = contador.querySelector('.visitas-numero');
    const texto = contador.querySelector('.visitas-texto');

    if (numero) {
      // Animar el número
      numero.style.opacity = '0';
      setTimeout(() => {
        numero.textContent = visitas.toLocaleString('es-AR');
        numero.style.opacity = '1';
      }, 200);
    }

    if (texto) {
      texto.textContent = visitas === 1 ? 'visita' : 'visitas';
    }
  }

  /**
   * Inicializa el contador de visitas
   */
  function init() {
    // Detectar página actual desde el nombre del archivo HTML
    const path = window.location.pathname;
    let pagina = 'index';
    
    if (path.includes('publicaciones')) {
      pagina = 'publicaciones';
    } else if (path.includes('conferencias')) {
      pagina = 'conferencias';
    } else if (path.includes('clipping')) {
      pagina = 'clipping';
    } else if (path.includes('contacto')) {
      pagina = 'contacto';
    }

    // Actualizar display
    actualizarDisplay(pagina);
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer funciones globalmente
  window.ContadorVisitas = {
    incrementar: incrementarVisitas,
    obtener: obtenerVisitas,
    actualizar: actualizarDisplay,
    init: init
  };

})();
