# Delta Rodó · Abate Propiedades

Landing estática para la propiedad 6178866: USD 178.200, dos dormitorios, entrega enero de 2027 y WhatsApp +598 96 206 755.

## Desarrollo

Desde el checkout existente `/workspace/DeltaRODO`, ejecutar `python3 -m http.server 3000 --bind 0.0.0.0`. No requiere instalación de dependencias. Cada tarea ya está aislada; no crear worktrees.

## Publicación en GitHub Pages

En el repositorio abrir Settings → Pages → Build and deployment → Source: GitHub Actions. El flujo `.github/workflows/pages.yml` publica la rama main. Si se activa Pages después del primer push, abrir Actions → Publicar landing en GitHub Pages → Run workflow. El enlace definitivo lo devuelve el paso Publicar; el URL esperado para este repositorio es https://inmoabate-alt.github.io/DeltaRODO/ y debe verificarse antes de anunciarlo como activo. GitHub Pages debe estar disponible para la visibilidad y plan del repositorio. No cambiar un repositorio privado a público sin autorización.

## Contenido

Editar `property.js` para actualizar fotos y datos. Las siete imágenes usan URLs proporcionadas por el usuario y necesitan acceso a static.tokkobroker.com. El entorno de desarrollo bloquea ese dominio; el usuario confirmó que las fotos y WhatsApp funcionan en la publicación anterior de Netlify.

El logo original utiliza el enlace de Infocasas proporcionado por el usuario, configurado en `logo` de `property.js`. Se muestra con ancho adaptable y altura automática para conservar las proporciones. Si el proveedor no responde, se muestra una marca tipográfica de respaldo. El entorno bloquea la descarga de Infocasas con HTTP 403; su carga real debe comprobarse en la web publicada.

## Meta

Píxel 1905629136345100. Se registra PageView y un evento personalizado WhatsAppClick al pulsar el único botón fijo. El clic no confirma mensaje enviado ni lead calificado. Revisar estos eventos en Meta → Probar eventos tras publicar. Gestionar el consentimiento y la información de privacidad que correspondan antes de campañas.

## Validación

Comprobar `node --check app.js` y `node --check property.js`; revisar en navegador móvil/escritorio, ampliar fotos, desplazarse para comprobar el botón fijo y verificar el destino de WhatsApp. El HTML/CSS no requieren build.
