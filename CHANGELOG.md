# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2024-11-19

### Agregado
- Sistema de autenticación con JWT para administradores
- Modelos de datos: User, Agrupacion, Integrante, Event
- API REST completa para CRUD de agrupaciones, integrantes y eventos
- Dashboard administrativo con:
  - Página de login
  - Vista de estadísticas
  - Gestión completa de agrupaciones
  - Gestión completa de integrantes
  - Listado de eventos
- Mapa público interactivo con Leaflet + OpenStreetMap
- Marcadores de eventos en el mapa con popups informativos
- Script de seed con datos reales de comparsas de Uruguay y Argentina
- Documentación completa:
  - README.md con guía de instalación
  - Manual de usuario para administradores
  - Manual de usuario para público general
- Configuración de Git y .gitignore

### Datos Iniciales
- 7 agrupaciones reales (5 de Uruguay, 2 de Argentina)
- 15 integrantes con roles variados
- 6 eventos de ejemplo
- 1 usuario administrador (demo)

### Técnico
- Backend: Node.js + Express + MongoDB
- Frontend: HTML + CSS + JavaScript vanilla
- Autenticación: JWT con bcrypt
- Mapa: Leaflet 1.9.4
- Base de datos: MongoDB con Mongoose

### Corregido
- Problema de carga de scripts en dashboard (API_URL duplicado)
- Marcadores del mapa no aparecían (nombres de propiedades incorrectos)
- Script loading order con defer y DOMContentLoaded

## [Unreleased]

### Por Implementar
- CRUD completo de eventos en el dashboard
- Selector de mapa interactivo para crear eventos
- Sistema de subida de imágenes (logos, fotos)
- Roles y permisos granulares
- Registro público de usuarios
- Notificaciones y alertas
- Exportación de datos
- API pública documentada con Swagger
- Tests unitarios y de integración
- CI/CD pipeline
- Modo demo público sin autenticación

---

## Tipos de Cambios

- `Agregado` para nuevas funcionalidades
- `Cambiado` para cambios en funcionalidades existentes
- `Obsoleto` para funcionalidades que serán eliminadas
- `Eliminado` para funcionalidades eliminadas
- `Corregido` para corrección de errores
- `Seguridad` para vulnerabilidades corregidas
