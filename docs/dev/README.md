# MAKO — Development Phases (Master Plan)

Este plan organiza el desarrollo de Mako **como si arrancara desde cero**, pero incluye checks para validar y aprovechar lo que ya existe en el repositorio.

## Orden de fases y dependencias

1. **Fase 0 — Foundations & Environments**
   - Archivo: `PHASE_00_FOUNDATIONS.md`
   - Bloquea todas las demás.

2. **Fase 1 — Core Directory Domain (Empresas Tipo 0/1)**
   - Archivo: `PHASE_01_CORE_DIRECTORY.md`
   - Depende de Fase 0.

3. **Fase 2 — Discovery UX (Web/App) + SEO Base**
   - Archivo: `PHASE_02_DISCOVERY_AND_SEO.md`
   - Depende de Fase 1.

4. **Fase 3 — Claim, Merchant Workflows & Plan Ladder**
   - Archivo: `PHASE_03_CLAIM_AND_PLANS.md`
   - Depende de Fase 1 y 2.

5. **Fase 4 — Trust, Verification & Reputation**
   - Archivo: `PHASE_04_TRUST_AND_REPUTATION.md`
   - Depende de Fase 3.

6. **Fase 5 — Promotions, Coupons & Redemptions**
   - Archivo: `PHASE_05_PROMOS_AND_COUPONS.md`
   - Depende de Fase 3 y 4.

7. **Fase 6 — Solara Ops, Data Quality & AI Assist**
   - Archivo: `PHASE_06_SOLARA_DATA_AI.md`
   - Depende de Fase 4.

8. **Fase 7 — Hardening, Observability & Go-Live**
   - Archivo: `PHASE_07_RELEASE_READINESS.md`
   - Depende de todas las fases previas.

## Estado base detectable en este repo (evidencia rápida)

- [x] Backend con API Express y ruta base `/api/responseMako`.
- [x] Backend con `GET /health`.
- [x] Backend con static files vía `/files` y `MAKO_STORAGE_ROOT`.
- [x] Frontend Next.js funcional.
- [x] Frontend configurado para `NEXT_PUBLIC_FILES_BASE_URL`.
- [x] Documento de despliegue/env: `ENV_DEPLOY_GUIDE.md`.
- [ ] Suite mínima de tests automáticos (unit/integration/e2e) formalizada.
- [ ] QA matrix por fase con evidencia persistida (reportes/versionados).

## Regla de cierre de fase

Una fase se considera cerrada solo si:
1. Se completan todos los checks de su archivo.
2. Se ejecutan sus pruebas de salida.
3. Se documenta evidencia (URL, capturas, logs, PRs, métricas).
