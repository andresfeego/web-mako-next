# Fase 1 — Core Directory Domain (Empresas Tipo 0/1)

## Objetivo
Implementar el núcleo del directorio: modelo de empresa, creación tipo 0, edición básica, lectura pública y consistencia de datos.

## Dependencias
- Fase 0 cerrada.

## Entregables
- CRUD mínimo de empresa.
- Flujo de creación `tipo 0` desde usuario/sistema.
- Exposición pública de perfil básico.

## Checklist de cierre
- [ ] Modelo de empresa versionado y documentado (campos obligatorios/opcionales).
- [ ] Endpoint de creación de empresa tipo 0 validado.
- [ ] Endpoint de actualización de campos críticos con reglas.
- [ ] Lectura pública por código de empresa.
- [ ] Manejo de estado empresa activa/inactiva.
- [ ] Validaciones de calidad mínima de datos.

## Checks de lo ya desarrollado en este repo
- [x] Existen rutas de empresa en backend.
- [x] Front consume perfiles y listados de empresa.
- [ ] Confirmar cobertura total de reglas de negocio tipo 0 vs tipo 1.

## Pruebas base checkeables
1. Crear empresa tipo 0 y verificar persistencia en DB.
2. Consultar empresa por código desde web pública.
3. Desactivar empresa y verificar comportamiento esperado en front.
4. Actualizar `url_logo` y verificar que renderiza desde `/files`.

