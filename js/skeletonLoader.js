/**
 * Sistema de Skeleton Loaders
 * Muestra placeholders animados mientras se carga el contenido
 */

(function() {
  'use strict';

  /**
   * Crea un skeleton para una card
   */
  function createCardSkeleton() {
    const skeleton = document.createElement('div');
    skeleton.className = 'card skeleton-card';
    skeleton.innerHTML = `
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-button"></div>
    `;
    return skeleton;
  }

  /**
   * Muestra skeletons mientras carga
   */
  function showSkeletons(container, count = 6) {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      const skeleton = createCardSkeleton();
      container.appendChild(skeleton);
      skeletons.push(skeleton);
    }
    return skeletons;
  }

  /**
   * Remueve los skeletons
   */
  function removeSkeletons(container) {
    const skeletons = container.querySelectorAll('.skeleton-card');
    skeletons.forEach((skeleton, index) => {
      setTimeout(() => {
        skeleton.style.opacity = '0';
        setTimeout(() => skeleton.remove(), 300);
      }, index * 50);
    });
  }

  /**
   * Envuelve la carga de contenido con skeleton
   */
  function wrapWithSkeleton(container, loadFunction, skeletonCount = 6) {
    // Mostrar skeletons
    const skeletons = showSkeletons(container, skeletonCount);

    // Ejecutar función de carga
    return Promise.resolve(loadFunction()).then(result => {
      // Remover skeletons
      removeSkeletons(container);
      return result;
    }).catch(error => {
      // Remover skeletons en caso de error
      removeSkeletons(container);
      throw error;
    });
  }

  /**
   * Agrega efecto de skeleton a imágenes
   */
  function addImageSkeletons() {
    const images = document.querySelectorAll('.card img:not([data-skeleton-added])');
    
    images.forEach(img => {
      // Si la imagen ya está cargada, no hacer nada
      if (img.complete && img.naturalHeight !== 0) {
        img.dataset.skeletonAdded = 'true';
        return;
      }

      img.dataset.skeletonAdded = 'true';

      // Crear skeleton
      const skeleton = document.createElement('div');
      skeleton.className = 'skeleton skeleton-image';
      skeleton.style.position = 'absolute';
      skeleton.style.top = '0';
      skeleton.style.left = '0';
      skeleton.style.width = '100%';
      skeleton.style.height = '100%';
      skeleton.style.zIndex = '1';

      // Preparar imagen
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      // Insertar skeleton
      const parent = img.parentElement;
      if (!parent) return;
      
      if (parent.style.position !== 'relative' && parent.style.position !== 'absolute') {
        parent.style.position = 'relative';
      }
      parent.insertBefore(skeleton, img);

      // Cuando cargue la imagen
      img.addEventListener('load', function() {
        skeleton.style.opacity = '0';
        img.style.opacity = '1';
        setTimeout(() => skeleton.remove(), 500);
      });

      // Si hay error, remover skeleton igual
      img.addEventListener('error', function() {
        skeleton.remove();
        img.style.opacity = '1';
      });
    });
  }

  /**
   * Agrega efecto de skeleton a iframes/videos - simplificado
   */
  function addMediaSkeletons() {
    // Deshabilitado temporalmente para mejorar rendimiento
    return;
  }

  /**
   * Inicializa los skeleton loaders
   */
  function init() {
    // Prevenir múltiples inicializaciones
    if (document.body.dataset.skeletonInitialized) return;
    document.body.dataset.skeletonInitialized = 'true';

    // Agregar skeletons solo a imágenes al cargar
    addImageSkeletons();
    
    // MutationObserver deshabilitado temporalmente para mejorar rendimiento
    // Solo aplicamos skeleton en la carga inicial
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer funciones globalmente
  window.SkeletonLoader = {
    show: showSkeletons,
    remove: removeSkeletons,
    wrap: wrapWithSkeleton,
    init: init
  };

})();
