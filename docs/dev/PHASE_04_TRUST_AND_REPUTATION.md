# Fase 4 — Trust, Verification & Reputation

## Objetivo
Construir el sistema de confianza: verificación, reputación trazable y controles anti-manipulación.

## Dependencias
- Fase 3 cerrada.

## Entregables
- Modelo de reputación y eventos.
- Flujo de verificación por niveles.
- Panel de trazabilidad para soporte/admin.

## Checklist de cierre
- [ ] Modelo de reputación y estados de confianza definido.
- [ ] Eventos de reputación auditables (fuente, actor, timestamp).
- [ ] Flujo de reportes/reclamos con resolución.
- [ ] Separación explícita entre plan pagado y confianza.
- [ ] Controles básicos anti-fraude/abuso.
- [ ] Exposición UI de señales de confianza.

## Checks de lo ya desarrollado en este repo
- [ ] Identificar endpoints actuales de reputación/bitácora reutilizables.
- [ ] Confirmar visualización actual de señales de confianza en front.

## Pruebas base checkeables
1. Crear evento de verificación y consultar historial.
2. Crear reporte de usuario y cerrar caso con trazabilidad.
3. Asegurar que cambiar plan no altera score de confianza automáticamente.
4. Validar UI de badge/estado de confianza en perfil público.

