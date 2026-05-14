# Fase 5 — Promotions, Coupons & Redemptions

## Objetivo
Implementar sistema de talonarios y bonos con trazabilidad total por usuario y comercio.

## Dependencias
- Fase 3 y 4 cerradas.

## Entregables
- Talonarios públicos/privados.
- Bonos individuales con estado y propietario.
- Redención controlada en tienda.

## Checklist de cierre
- [ ] Modelo `talonario` y `bono` con IDs únicos.
- [ ] Flujo de reclamar bono (público y privado).
- [ ] Flujo de redención con validación de estado.
- [ ] Caducidad y cancelación de bonos.
- [ ] Historial de movimientos por bono.
- [ ] Restricciones por plan para crear promociones.

## Checks de lo ya desarrollado en este repo
- [ ] Confirmar tablas/endpoints existentes de cupones reutilizables.
- [ ] Confirmar UI actual para promoción/beneficios.

## Pruebas base checkeables
1. Crear talonario de N bonos y verificar conteo.
2. Reclamar bono con usuario A y bloquear doble claim.
3. Redimir bono y verificar transición `activo -> canjeado`.
4. Intentar redimir bono expirado y validar rechazo.

