/**
 * Gestor de Meta Tags y Open Graph
 * Permite actualizar dinámicamente los meta tags de la página
 */

class MetaTagsManager {
    constructor() {
        this.defaultMeta = {
            title: "Henoch Aguiar - Políticas Digitales y Telecomunicaciones",
            description: "Especialista en Políticas Digitales y Telecomunicaciones. Ex Vicepresidente de ARSAT y ex Secretario de Comunicaciones de Argentina.",
            image: "https://henochaguiar.com/media/henochaguiar.jpeg",
            url: window.location.href,
            type: "website",
            siteName: "Henoch Aguiar",
            locale: "es_AR",
            twitterHandle: "@henochaguiar"
        };
    }

    /**
     * Actualiza el título de la página
     * @param {string} title - Nuevo título
     */
    updateTitle(title) {
        document.title = title;
        this.updateMetaTag('property', 'og:title', title);
        this.updateMetaTag('name', 'twitter:title', title);
    }

    /**
     * Actualiza la descripción
     * @param {string} description - Nueva descripción
     */
    updateDescription(description) {
        this.updateMetaTag('name', 'description', description);
        this.updateMetaTag('property', 'og:description', description);
        this.updateMetaTag('name', 'twitter:description', description);
    }

    /**
     * Actualiza la imagen
     * @param {string} imageUrl - URL de la nueva imagen
     */
    updateImage(imageUrl) {
        this.updateMetaTag('property', 'og:image', imageUrl);
        this.updateMetaTag('name', 'twitter:image', imageUrl);
    }

    /**
     * Actualiza la URL canónica
     * @param {string} url - Nueva URL
     */
    updateUrl(url) {
        this.updateMetaTag('property', 'og:url', url);
        this.updateMetaTag('name', 'twitter:url', url);
        
        // Actualizar canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.href = url;
        } else {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = url;
            document.head.appendChild(canonical);
        }
    }

    /**
     * Actualiza keywords
     * @param {string} keywords - Nuevas keywords (separadas por comas)
     */
    updateKeywords(keywords) {
        this.updateMetaTag('name', 'keywords', keywords);
    }

    /**
     * Actualiza todos los meta tags de una vez
     * @param {Object} metaData - Objeto con los datos de meta tags
     */
    updateAll(metaData) {
        const data = { ...this.defaultMeta, ...metaData };
        
        if (data.title) this.updateTitle(data.title);
        if (data.description) this.updateDescription(data.description);
        if (data.image) this.updateImage(data.image);
        if (data.url) this.updateUrl(data.url);
        if (data.keywords) this.updateKeywords(data.keywords);
        if (data.type) this.updateMetaTag('property', 'og:type', data.type);
    }

    /**
     * Actualiza meta tags para una tarjeta específica
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    updateFromCard(card) {
        const title = card.querySelector('h3')?.textContent || this.defaultMeta.title;
        const description = card.querySelector('.card-text')?.textContent?.trim().substring(0, 160) || this.defaultMeta.description;
        const image = card.querySelector('img')?.src || this.defaultMeta.image;
        
        this.updateAll({
            title: `${title} | Henoch Aguiar`,
            description: description,
            image: image,
            url: window.location.href
        });
    }

    /**
     * Restaura los meta tags por defecto
     */
    resetToDefault() {
        this.updateAll(this.defaultMeta);
    }

    /**
     * Método helper para actualizar un meta tag específico
     * @private
     */
    updateMetaTag(attribute, key, content) {
        let element = document.querySelector(`meta[${attribute}="${key}"]`);
        
        if (element) {
            element.setAttribute('content', content);
        } else {
            element = document.createElement('meta');
            element.setAttribute(attribute, key);
            element.setAttribute('content', content);
            document.head.appendChild(element);
        }
    }

    /**
     * Genera structured data (JSON-LD) para SEO
     * @param {Object} data - Datos para el structured data
     */
    generateStructuredData(data) {
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Henoch Aguiar",
            "jobTitle": "Especialista en Políticas Digitales y Telecomunicaciones",
            "description": data.description || this.defaultMeta.description,
            "url": data.url || this.defaultMeta.url,
            "image": data.image || this.defaultMeta.image,
            "sameAs": [
                "https://www.linkedin.com/in/henochaguiar/",
                "https://twitter.com/henochaguiar",
                "https://www.instagram.com/henochaguiar/"
            ]
        };

        // Eliminar script anterior si existe
        const existingScript = document.querySelector('script[type="application/ld+json"]');
        if (existingScript) {
            existingScript.remove();
        }

        // Crear y agregar nuevo script
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
    }

    /**
     * Inicializa listeners para compartir tarjetas
     */
    initCardShareListeners() {
        const shareIcons = document.querySelectorAll('.share-icon');
        
        shareIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                const card = event.target.closest('.card');
                if (card) {
                    this.updateFromCard(card);
                }
            });
        });
    }
}

// Inicializar el gestor cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.metaTagsManager = new MetaTagsManager();
    
    // Generar structured data inicial
    window.metaTagsManager.generateStructuredData({});
    
    // Inicializar listeners para actualizar meta tags al compartir
    window.metaTagsManager.initCardShareListeners();
    
    // Ejemplo de uso: Actualizar meta tags al hacer clic en una tarjeta
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Opcional: actualizar meta tags al pasar el mouse
            // window.metaTagsManager.updateFromCard(card);
        });
    });
});

// Actualizar meta tags para un artículo específico
window.metaTagsManager.updateAll({
    title: "Hay que aportar cerebros argentinos al desarrollo del data center",
    description: "La empresa OpenAi anunció una inversión de u$s 25.000 millones en el país...",
    image: "https://henochaguiar.com/media/datacenter.jpg",
    keywords: "OpenAI, data center, Argentina, tecnología, inversión"
});

// Actualizar desde una tarjeta
const card = document.querySelector('.card');
window.metaTagsManager.updateFromCard(card);

// Restaurar meta tags por defecto
window.metaTagsManager.resetToDefault();

// Exportar para uso global
window.MetaTagsManager = MetaTagsManager;