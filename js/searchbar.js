document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('busqueda');
  const items = document.querySelectorAll('.accordion-item');

  // Cache bootstrap collapse instances
  const collapseMap = new Map();
  // Store original HTML content for highlighting reset
  const originalContentMap = new Map();

  items.forEach(item => {
    const collapseEl = item.querySelector('.accordion-collapse');
    collapseMap.set(item, new bootstrap.Collapse(collapseEl, { toggle: false }));
    const body = item.querySelector('.accordion-body');
    originalContentMap.set(item, body.innerHTML);
  });

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark style="text-decoration: underline;">$1</mark>');
  }

  function filterAccordion() {
    const query = input.value.trim().toLowerCase();

    if (!query) {
      // Show all items, collapse all, and reset highlights
      items.forEach(item => {
        item.style.display = '';
        collapseMap.get(item).hide();
        const body = item.querySelector('.accordion-body');
        body.innerHTML = originalContentMap.get(item);
        const headerBtn = item.querySelector('.accordion-button');
        headerBtn.innerHTML = headerBtn.textContent; // reset header text (no highlight)
      });
      return;
    }

    items.forEach(item => {
      const keywords = (item.getAttribute('data-keywords') || '').toLowerCase();
      const headerBtn = item.querySelector('.accordion-button');
      const headerText = headerBtn.textContent.toLowerCase();
      const body = item.querySelector('.accordion-body');
      const contentText = body.textContent.toLowerCase();

      const visible = keywords.includes(query) || headerText.includes(query) || contentText.includes(query);

      if (visible) {
        item.style.display = '';
        collapseMap.get(item).show();
        // Highlight matched words in header and body
        headerBtn.innerHTML = highlightText(headerBtn.textContent, query);
        body.innerHTML = highlightText(originalContentMap.get(item), query);
      } else {
        item.style.display = 'none';
        collapseMap.get(item).hide();
        // Reset highlights
        headerBtn.innerHTML = headerBtn.textContent; // reset header text (no highlight)
        body.innerHTML = originalContentMap.get(item);
      }
    });
  }

  // Debounce input event for performance
  let debounceTimeout;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(filterAccordion, 200);
  });
});
