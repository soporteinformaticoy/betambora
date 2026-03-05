# 🥁 Tambora - Sistema de Gestión de Eventos de Candombe

**Tambora** es una plataforma web integral diseñada para la gestión, promoción y visualización de eventos de candombe en Uruguay y Argentina. El sistema combina un mapa público interactivo para la comunidad con un potente panel administrativo para la gestión de datos.

## 🎯 Objetivos de la Plataforma
- **Visibilidad**: Centralizar y mapear los eventos de candombe para facilitar su acceso al público.
- **Gestión**: Proporcionar a los administradores herramientas eficientes para gestionar agrupaciones, integrantes y eventos.
- **Geolocalización**: Permitir búsquedas inteligentes basadas en la ubicación del usuario.

## 🚀 Funcionalidades Principales

### 🌍 Interfaz Pública
- **Mapa Interactivo**: Basado en Leaflet y OpenStreetMap con marcadores de eventos.
- **Búsqueda Inteligente**: Filtrado por ubicación (geocodificación con Nominatim), rangos temporales y país.
- **Directorio de Agrupaciones**: Consulta detallada de comparsas, sus redes sociales e integrantes.
- **Perfil Público**: Control de privacidad para la visualización de integrantes.

### 🔐 Panel Administrativo
- **Autenticación Segura**: Sistema basado en JWT y soporte para OAuth (Google).
- **Gestión CRUD**: Control total sobre Agrupaciones, Integrantes y Eventos.
- **Estadísticas**: Visualización de métricas de participación e interacciones (ej. usuarios que asistirán).

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Backend** | Node.js + Express |
| **Base de Datos** | MongoDB + Mongoose (Indexación Geoespacial 2dsphere) |
| **Frontend** | Vanilla JavaScript / HTML5 / CSS3 / Next.js (en desarrollo) |
| **Mapas** | Leaflet.js + OpenStreetMap |
| **Autenticación** | JWT (JSON Web Tokens) + Passport.js (Google OAuth) |

## 📁 Estructura del Proyecto e Interfaz
- `app.js`: Servidor Express (API y Frontend Clásico).
- `models/`: Esquemas de datos (MongoDB).
- `routes/`: Endpoints de la API RESTful.
- `public/`: Frontend clásico y panel administrativo.
- `web/`: Nueva interfaz basada en Next.js (en desarrollo).

## 🚀 Servidores y Puertos
El sistema cuenta con dos entornos que pueden coexistir:

| Servicio | Comando | URL | Descripción |
| :--- | :--- | :--- | :--- |
| **Backend / API** | `npm run dev` | [http://localhost:3000](http://localhost:3000) | Servidor principal Express + API REST. |
| **Admin Panel** | - | [http://localhost:3000/admin](http://localhost:3000/admin) | Dashboard para administradores (admin/admin123). |
| **Next.js Web** | `cd web && npm run dev` | [http://localhost:3001](http://localhost:3001) | Nueva interfaz moderna (Next.js). |

### 🛠️ Comandos Útiles
*   `npm run seedAdmin`: Limpia la base de datos y carga datos reales de prueba.
*   `npm run dev`: Inicia el servidor clásico con recarga automática.
*   `cd web && npm run dev`: Inicia el entorno de desarrollo de Next.js.

## 📈 Estado Actual y Próximos Pasos
- **Versión Actual**: 1.0.0 (Demo Operativa).
- **En curso**: Implementación completa de OAuth y migración parcial a Next.js.
- **Próximamente**: Sistema de imágenes (subida de logos), notificaciones push y API documentada con Swagger.

---
*Última actualización: Marzo 2026*
