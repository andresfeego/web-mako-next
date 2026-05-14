# Fase 3 — Claim, Merchant Workflows & Plan Ladder

## Objetivo
Implementar la evolución de empresas del directorio hacia perfiles administrados por comerciantes con plan ladder (Base/Plus/Pro/Business).

## Dependencias
- Fase 1 y 2 cerradas.

## Entregables
- Flujo de reclamo de empresa.
- Gestión de plan por empresa.
- Feature flags por plan.

## Checklist de cierre
- [ ] Flujo de reclamo (inicio, validación, aprobación/rechazo).
- [ ] Trazabilidad de quién reclamó y cuándo.
- [ ] Matriz de capacidades por plan aplicada en backend.
- [ ] UI/UX por plan aplicada en frontend.
- [ ] Reglas de upgrade/downgrade con impacto controlado.
- [ ] Auditoría de cambios de plan.

## Checks de lo ya desarrollado en este repo
- [x] Dossier define claramente plan ladder y tipos.
- [ ] Verificar implementación completa de gating por plan en backend.
- [ ] Verificar vistas separadas tipo 0 (modal) vs tipo 1+ (página indexable).

## Pruebas base checkeables
1. Reclamar empresa tipo 0 y confirmar cambio de estado.
2. Cambiar plan y verificar habilitación/bloqueo de funciones.
3. Probar acceso a edición avanzada según plan.
4. Verificar logs/auditoría de cambio de plan.

