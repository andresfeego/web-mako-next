# Fase 2 — Discovery UX (Web/App) + SEO Base

## Objetivo
Consolidar descubrimiento por ciudad/categoría/keyword y bases SEO indexables para perfiles elegibles.

## Dependencias
- Fase 1 cerrada.

## Entregables
- Búsqueda y filtros confiables.
- Páginas de listados indexables.
- Sitemap/robots/canonical por entorno.

## Checklist de cierre
- [ ] Búsqueda por ciudad funcional.
- [ ] Búsqueda por categoría funcional.
- [ ] Búsqueda por palabra clave funcional.
- [ ] Paginación o estrategia de performance en listados grandes.
- [ ] Canonical/OG/Twitter tags correctos por página.
- [ ] Sitemap dinámico correcto y estable.
- [ ] Robots dinámico correcto por entorno.

## Checks de lo ya desarrollado en este repo
- [x] Rutas de categorías/ciudades/listados existen.
- [x] Sitemap dinámico existe.
- [x] Robots dinámico existe.
- [x] Dominio parametrizado vía env (sin hardcode principal).

## Pruebas base checkeables
1. Query por ciudad devuelve resultados esperados.
2. Query por categoría devuelve resultados esperados.
3. `GET /sitemap.xml` contiene URLs del entorno actual.
4. Validar meta tags de una empresa tipo 1 y una página de listado.

