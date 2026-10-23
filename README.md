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

Píxel 1905629136345100. Se registra PageView y el evento estándar Contact (Contactar en Meta) al pulsar el único botón fijo. Contact sustituye al anterior WhatsAppClick; no se envían ambos por el mismo clic. El clic no confirma mensaje enviado ni lead calificado. Revisar estos eventos en Meta → Probar eventos tras publicar. Para la conversión de Delta Rodó, elegir Contactar y filtrar por URL que contiene inmoabate-alt.github.io/DeltaRODO, conservando así separados los contactos de otras webs que comparten el píxel. Gestionar el consentimiento y la información de privacidad que correspondan antes de campañas.

## Validación

Comprobar `node --check app.js` y `node --check property.js`; revisar en navegador móvil/escritorio, ampliar fotos, desplazarse para comprobar el botón fijo y verificar el destino de WhatsApp. El HTML/CSS no requieren build.

## Diagnóstico del píxel

Abrir la landing con `?diagnostico=1` para ver la carga de fbevents.js, disponibilidad del motor, clics detectados y recuento orientativo de recursos /tr. No genera eventos extra ni confirma recepción de Meta. El panel no se muestra en la URL normal. Si el motor carga pero Meta no recibe eventos, revisar en el Administrador de eventos los diagnósticos y permisos de tráfico del píxel para el dominio inmoabate-alt.github.io. No sustituir una lista de dominios existentes sin revisarla.
