# Fase 0 — Foundations & Environments

## Objetivo
Establecer base técnica estable para `lab` y `prod`: repos, ramas, env vars, storage, DB, deploy reproducible.

## Entregables
- Contrato de entornos (`lab`/`prod`) validado.
- Backend sirviendo API + `/files` por entorno.
- Frontend consumiendo `HOST_NAME` y `NEXT_PUBLIC_FILES_BASE_URL` sin hardcodes.

## Checklist de cierre
- [ ] `.env` backend definido para lab/prod.
- [ ] `MAKO_STORAGE_ROOT` creado por entorno y sin versionado en git.
- [ ] DB por entorno provisionada y accesible.
- [ ] Frontend con `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_FILES_BASE_URL`.
- [ ] Health checks documentados.
- [ ] Runbook de arranque local y VPS.

## Checks de lo ya desarrollado en este repo
- [x] Existe guía de env/deploy: `ENV_DEPLOY_GUIDE.md`.
- [x] Backend tiene `MAKO_STORAGE_ROOT` y static `/files`.
- [x] Front usa `NEXT_PUBLIC_FILES_BASE_URL`.
- [ ] Confirmar CI/CD formal por ambiente.

## Pruebas base checkeables
1. `GET /health` responde `200`.
2. `GET /files/<archivo_existente>` responde `200`.
3. Front carga logos de empresas desde `/files/images/...`.
4. `sitemap.xml` y `robots.txt` salen con `NEXT_PUBLIC_SITE_URL` del entorno.

