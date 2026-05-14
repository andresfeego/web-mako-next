# Fase 7 — Hardening, Observability & Go-Live

## Objetivo
Cerrar el ciclo con estabilidad, seguridad, observabilidad y criterios de salida a producción.

## Dependencias
- Fases 0 a 6 cerradas.

## Entregables
- Matriz de calidad y riesgos residual.
- Monitoreo y alertas activas.
- Procedimiento de rollback.

## Checklist de cierre
- [ ] Test suite mínima (API + smoke web) automatizada en CI.
- [ ] Logging estructurado y correlación por request.
- [ ] Monitoreo de errores y uptime configurado.
- [ ] Backups DB/storage validados.
- [ ] Runbook de incidentes y rollback.
- [ ] Revisión de seguridad (secretos/CORS/auth/inputs).
- [ ] Checklist de release firmado por responsables.

## Checks de lo ya desarrollado en este repo
- [x] Endpoint health disponible.
- [ ] CI de pruebas/regresión por PR.
- [ ] Observabilidad centralizada (errores, latencia, saturación).

## Pruebas base checkeables
1. Smoke test post-deploy: `health`, listado, perfil, assets.
2. Simulación de falla y rollback documentado.
3. Restauración de backup en ambiente de prueba.
4. Verificación de performance base (p95) en rutas críticas.

