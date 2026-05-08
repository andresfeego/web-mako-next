# Mako Env & Storage Guide (Lab/Prod)

## Objetivo
Dejar una sola guía para configurar correctamente:
- backend (API + archivos estáticos)
- frontend (Next.js)
- rutas de archivos (`/files`)
- diferencias entre `lab` y `prod`

Esta guía está pensada para que Codex en VPS implemente sin romper endpoints ni assets.

---

## Arquitectura esperada

### Backend
- Expone API en: `/api/responseMako/*`
- Expone archivos en: `/files/*`
- Sirve archivos desde disco según `MAKO_STORAGE_ROOT`

### Frontend
- Consume API usando `HOST_NAME`
- Consume archivos usando `NEXT_PUBLIC_FILES_BASE_URL`
- Usa `NEXT_PUBLIC_SITE_URL` para sitemap, robots, canonical y links públicos

---

## Variables backend

Archivo: `Backend/.env`

### LAB (ejemplo)
```env
NODE_ENV=development
PORT=3020

MAKO_DB_HOST=127.0.0.1
MAKO_DB_PORT=3307
MAKO_DB_NAME=mako_local
MAKO_DB_USER=feegosys_mako
MAKO_DB_PASS=feegosys_mako

JWT_SECRET=CHANGE_ME_LAB

MAKO_LOG_DIR=/opt/mako/lab/logs
MAKO_STORAGE_ROOT=/opt/mako/lab/storage
```

### PROD (ejemplo)
```env
NODE_ENV=production
PORT=3033

MAKO_DB_HOST=127.0.0.1
MAKO_DB_PORT=3306
MAKO_DB_NAME=mako_prod
MAKO_DB_USER=mako_prod_user
MAKO_DB_PASS=CHANGE_ME_PROD

JWT_SECRET=CHANGE_ME_PROD

MAKO_LOG_DIR=/opt/mako/prod/logs
MAKO_STORAGE_ROOT=/opt/mako/prod/storage
```

### Estructura recomendada del storage
```text
/opt/mako/<env>/storage
  /images
    /logos
    /empresas
    /slides
    /categorias
  /icons
```

---

## Variables frontend

Archivo recomendado: `Web-next/web-mako-next/.env.local` (o variables del sistema en VPS)

### LAB (ejemplo)
```env
NODE_ENV=development
NEXT_PUBLIC_SITE_URL=https://lab.mako.guru
NEXT_PUBLIC_FILES_BASE_URL=https://lab-api.mako.guru/files
HOST_NAME_PROD=https://lab-api.mako.guru/api/responseMako
```

### PROD (ejemplo)
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://www.mako.guru
NEXT_PUBLIC_FILES_BASE_URL=https://api.mako.guru/files
HOST_NAME_PROD=https://api.mako.guru/api/responseMako
```

> Nota: En local de desarrollo, `next.config.js` usa por defecto:
- API local: `http://127.0.0.1:3020/api/responseMako`
- Files local: `http://127.0.0.1:3020/files`

---

## Reglas críticas

1. No hardcodear dominios en componentes (`mako.guru`, `feegosystem`, etc.).
2. Toda imagen dinámica debe salir de:
   - `${NEXT_PUBLIC_FILES_BASE_URL}/images/...`
3. Backend siempre debe publicar `express.static` en `/files` apuntando a `MAKO_STORAGE_ROOT`.
4. DB debe almacenar rutas relativas de archivo (ej: `logos/ABC.webp` o `images/logos/ABC.webp`) según estándar acordado.
5. Nunca versionar contenido de storage en git.

---

## Checklist de implementación VPS (Codex)

1. Crear carpetas:
- `/opt/mako/lab/logs`
- `/opt/mako/lab/storage`
- `/opt/mako/prod/logs`
- `/opt/mako/prod/storage`

2. Cargar `.env` correcto en backend según ambiente.

3. Confirmar backend:
- `GET /health` responde `200`
- `GET /files/...` responde archivos

4. Configurar frontend con variables del ambiente.

5. Reiniciar frontend (`next build/start` o `next dev`) para tomar cambios de `next.config.js`.

6. Validar:
- listado de empresas carga logos
- sitemap usa dominio del ambiente
- robots apunta a `<SITE_URL>/sitemap.xml`

---

## Ejemplos de prueba rápida

### Backend
```bash
curl -i http://127.0.0.1:3020/health
curl -I http://127.0.0.1:3020/files/images/logo_Mako_Directorio_Comercial_Colombia_512x512-2.webp
```

### Frontend
- Abrir home/listado y confirmar que las imágenes cargan desde `NEXT_PUBLIC_FILES_BASE_URL`.
- Revisar `view-source` en páginas SEO y validar canonical/og:url con `NEXT_PUBLIC_SITE_URL`.

---

## Convención de ramas para despliegues

- Backend: `chore/backend-storage-env-lab-prod`
- Frontend: `chore/frontend-env-domain-files-lab-prod`

