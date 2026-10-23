'use strict';
const property = window.PROPERTY;
// Conservar una marca de respaldo si el proveedor del logo no responde.
if (property.logo) {
  const brandImage = document.getElementById('brand-image');
  brandImage.addEventListener('load', () => {
    brandImage.hidden = false;
    document.querySelector('.brand-fallback').hidden = true;
  });
  brandImage.addEventListener('error', () => {
    brandImage.hidden = true;
    document.querySelector('.brand-fallback').hidden = false;
  });
  brandImage.src = property.logo;
}
const setText = (id, value) => { const el = document.getElementById(id); if (el && value) el.textContent = value; };
setText('property-location', property.location);
setText('property-price', property.price.replace(/^USD\s*/, ''));
setText('description', property.description);
const validPhone = /^\d{8,15}$/.test(property.whatsapp);
if (validPhone) {
  const message = 'Quiero coordinar visita a Delta Rodo';
  document.querySelectorAll('.whatsapp').forEach(link => {
    link.href = `https://wa.me/${property.whatsapp}?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.rel = 'noopener';
    link.addEventListener('click', () => {
      // Mide clics; no confirma mensajes enviados ni clientes calificados.
      if (typeof window.fbq === 'function') window.fbq('track', 'Contact', { content_ids: [property.reference], content_name: 'WhatsApp · Delta Rodó' });
      document.dispatchEvent(new Event('abate:whatsapp-click'));
    });
  });
  const phone = document.getElementById('phone');
  if (phone) {
    phone.textContent = property.phoneDisplay || `+${property.whatsapp}`;
    phone.href = `tel:+${property.whatsapp}`;
  }
} else {
  document.querySelectorAll('.whatsapp').forEach(link => {
    link.setAttribute('aria-disabled', 'true');
    link.addEventListener('click', event => event.preventDefault());
  });
  setText('contact-status', 'Contacto pendiente de confirmación');
}
if (property.image) {
  const img = document.getElementById('hero-image');
  img.addEventListener('load', () => { img.hidden = false; document.getElementById('hero-placeholder').hidden = true; });
  img.addEventListener('error', () => { document.querySelector('#hero-placeholder small').textContent = 'Imagen no disponible. Consultá la ficha original.'; });
  img.src = property.image;
}
const sources = [property.image, ...(property.gallery || [])].filter(Boolean);
for (const [index, source] of sources.entries()) {
  const link = document.createElement('a');
  link.href = source;
  link.target = '_blank';
  link.rel = 'noopener';
  link.setAttribute('aria-label', `Abrir imagen ${index + 1} de la publicación`);
  const img = document.createElement('img');
  img.src = source;
  img.alt = `Delta Rodó · imagen ${index + 1} de la publicación`;
  img.loading = 'lazy';
  img.addEventListener('error', () => { img.hidden = true; link.textContent = `Ver imagen ${index + 1} ↗`; });
  link.append(img);
  document.getElementById(index < 5 ? 'gallery' : 'extra-gallery').append(link);
}

// Vista ampliada: mantiene la proporción completa de cada fotografía.
const viewer = document.getElementById('photo-viewer');
const viewerImage = document.getElementById('viewer-image');
const viewerError = document.getElementById('viewer-error');
let activePhoto = 0;
function showPhoto(index) {
  activePhoto = (index + sources.length) % sources.length;
  viewerError.hidden = true;
  viewerImage.hidden = false;
  viewerImage.alt = `Delta Rodó · fotografía ${activePhoto + 1}`;
  viewerImage.src = sources[activePhoto];
  document.getElementById('viewer-original').href = sources[activePhoto];
  setText('viewer-caption', `Delta Rodó · ${activePhoto + 1} de ${sources.length}`);
}
function openPhoto(index) {
  showPhoto(index);
  viewer.showModal();
  document.body.classList.add('viewer-open');
}
viewerImage.addEventListener('error', () => { viewerImage.hidden = true; viewerError.hidden = false; });
viewerImage.addEventListener('load', () => { viewerImage.hidden = false; viewerError.hidden = true; });
const hero = document.querySelector('.hero-photo');
hero.addEventListener('click', () => openPhoto(0));
hero.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openPhoto(0); }
});
document.querySelectorAll('#gallery a, #extra-gallery a').forEach((link, index) => {
  link.addEventListener('click', event => { event.preventDefault(); openPhoto(index); });
});
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.querySelector('.viewer-prev').addEventListener('click', () => showPhoto(activePhoto - 1));
viewer.querySelector('.viewer-next').addEventListener('click', () => showPhoto(activePhoto + 1));
viewer.addEventListener('close', () => document.body.classList.remove('viewer-open'));
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(activePhoto + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(activePhoto - 1); }
});


// Esta comprobación solo se muestra con ?diagnostico=1; no genera eventos extra.
if (new URLSearchParams(window.location.search).get('diagnostico') === '1') {
  const panel = document.createElement('section');
  panel.className = 'pixel-diagnostics';
  panel.setAttribute('aria-label', 'Comprobación de Meta');
  panel.innerHTML = '<h2>Comprobación de Meta</h2><p>Versión: diagnóstico 1 · Píxel 1905629136345100</p><p id="pixel-library" role="status"></p><p id="pixel-engine"></p><p id="pixel-clicks">Clics en WhatsApp durante esta visita: 0.</p><p id="pixel-requests"></p><p>Estos datos comprueban el navegador. La recepción debe confirmarse en Meta.</p>';
  document.body.prepend(panel);
  let clicks = 0;
  function renderPixelStatus() {
    const state = window.__abatePixelLoad;
    document.getElementById('pixel-library').textContent = state === 'loaded'
      ? 'Biblioteca de Meta: descargada.'
      : state === 'error'
        ? 'Biblioteca de Meta: no pudo descargarse. Puede haber un bloqueo del navegador o de la red.'
        : 'Biblioteca de Meta: esperando que termine la descarga.';
    document.getElementById('pixel-engine').textContent = typeof window.fbq?.callMethod === 'function'
      ? 'Motor del píxel: disponible. PageView se solicitó al abrir.'
      : 'Motor del píxel: no disponible; los eventos pueden estar en espera.';
    const requests = performance.getEntriesByType('resource').filter(entry => {
      try {
        const url = new URL(entry.name);
        return (url.hostname === 'facebook.com' || url.hostname.endsWith('.facebook.com')) && /^\/tr\/?$/.test(url.pathname);
      } catch { return false; }
    }).length;
    document.getElementById('pixel-requests').textContent = `Solicitudes al endpoint de eventos observadas por el navegador: ${requests}. Este recuento puede ser incompleto y no confirma recepción.`;
  }
  document.addEventListener('abate:pixel-status', renderPixelStatus);
  document.addEventListener('abate:whatsapp-click', () => {
    clicks += 1;
    document.getElementById('pixel-clicks').textContent = `Clics en WhatsApp durante esta visita: ${clicks}. Se solicitó Contact (Contactar) al píxel.`;
    renderPixelStatus();
    setTimeout(renderPixelStatus, 1500);
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden) renderPixelStatus(); });
  renderPixelStatus();
  setTimeout(renderPixelStatus, 8000);
}
