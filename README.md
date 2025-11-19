# Tambora - Sistema de Gestión de Eventos de Candombe

Sistema web para gestionar y visualizar eventos de candombe en Uruguay y Argentina, con dashboard administrativo y mapa público interactivo.

![Mapa Público con Eventos](file:///Users/soporte/.gemini/antigravity/brain/43b866ac-d443-4654-a38c-73d43186954e/map_with_markers_1763594536650.png)

## 🎯 Características

### Mapa Público
- 🗺️ Visualización interactiva con Leaflet + OpenStreetMap
- 📍 Marcadores de eventos de candombe
- 🎭 Información de agrupaciones participantes
- 🌎 Cobertura: Uruguay y Argentina

### Dashboard Administrativo
- 👤 Autenticación con JWT
- 🎭 Gestión completa de Agrupaciones (CRUD)
- 👥 Gestión completa de Integrantes (CRUD)
- 📅 Gestión de Eventos
- 📊 Estadísticas en tiempo real

## 📋 Requisitos Previos

- **Node.js**: v14 o superior
- **MongoDB**: v4.4 o superior
- **npm**: v6 o superior

## 🚀 Instalación

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd tambora
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI=mongodb://localhost:27017/tambora
PORT=3000
JWT_SECRET=tu_secreto_jwt_super_seguro_cambiar_en_produccion
```

### 4. Poblar Base de Datos

```bash
npm run seedAdmin
```

Esto creará:
- 1 usuario administrador
- 7 agrupaciones (Uruguay y Argentina)
- 15 integrantes con roles
- 6 eventos de ejemplo

### 5. Iniciar Servidor

**Desarrollo (con auto-reload):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📚 Estructura del Proyecto

```
tambora/
├── models/              # Modelos de MongoDB
│   ├── User.js         # Usuarios/Admins
│   ├── Agrupacion.js   # Comparsas y grupos
│   ├── Integrante.js   # Miembros de agrupaciones
│   └── Event.js        # Eventos
├── routes/             # Rutas de API
│   ├── auth.js         # Autenticación
│   ├── agrupaciones.js # CRUD agrupaciones
│   ├── integrantes.js  # CRUD integrantes
│   ├── eventos.js      # CRUD eventos
│   └── test.js         # Endpoints de prueba
├── middleware/         # Middlewares
│   └── auth.js         # Verificación JWT
├── public/             # Frontend
│   ├── index.html      # Mapa público
│   ├── test.html       # Página de diagnóstico
│   └── admin/          # Dashboard admin
│       ├── login.html
│       ├── dashboard.html
│       ├── agrupaciones.html
│       ├── integrantes.html
│       ├── eventos.html
│       ├── css/
│       │   └── admin.css
│       └── js/
│           ├── auth.js
│           └── api.js
├── app.js              # Servidor Express
├── seed.js             # Seed de eventos básicos
├── seedAdmin.js        # Seed completo con datos reales
├── package.json
└── .env                # Variables de entorno (no versionado)
```

## 🔑 Credenciales de Acceso

### Usuario Administrador (Demo)
- **URL**: http://localhost:3000/admin
- **Usuario**: `admin`
- **Contraseña**: `admin123`

> ⚠️ **Importante**: Cambiar estas credenciales en producción

## 📖 Guías de Usuario

### Para Administradores
Ver [MANUAL_ADMIN.md](./docs/MANUAL_ADMIN.md)

### Para Público General
Ver [MANUAL_PUBLICO.md](./docs/MANUAL_PUBLICO.md)

## 🛠️ Scripts Disponibles

```bash
npm start          # Iniciar servidor en producción
npm run dev        # Iniciar con nodemon (desarrollo)
npm run seed       # Poblar eventos básicos
npm run seedAdmin  # Poblar base de datos completa
npm test           # Ejecutar tests (pendiente)
```

## 🔌 API Endpoints

### Públicos (sin autenticación)
```
GET  /api/agrupaciones          # Listar agrupaciones
GET  /api/agrupaciones/:id      # Obtener agrupación
GET  /api/integrantes           # Listar integrantes
GET  /api/integrantes/:id       # Obtener integrante
GET  /api/eventos               # Listar eventos
GET  /api/eventos/:id           # Obtener evento
GET  /api/events                # Eventos publicados (legacy)
```

### Protegidos (requieren JWT)
```
POST   /api/auth/register       # Registrar admin
POST   /api/auth/login          # Login
POST   /api/agrupaciones        # Crear agrupación
PUT    /api/agrupaciones/:id    # Actualizar agrupación
DELETE /api/agrupaciones/:id    # Eliminar agrupación
POST   /api/integrantes         # Crear integrante
PUT    /api/integrantes/:id     # Actualizar integrante
DELETE /api/integrantes/:id     # Eliminar integrante
POST   /api/eventos             # Crear evento
PUT    /api/eventos/:id         # Actualizar evento
DELETE /api/eventos/:id         # Eliminar evento
```

## 🧪 Testing

### Página de Diagnóstico
Acceder a `http://localhost:3000/test.html` para verificar:
- Conexión al backend
- Conexión a MongoDB
- Carga de datos estáticos vs base de datos

## 🐛 Solución de Problemas

### El dashboard no carga datos
1. Verificar que MongoDB esté corriendo
2. Limpiar caché del navegador (Ctrl+Shift+R)
3. Revisar consola del navegador para errores
4. Verificar que `seedAdmin` se haya ejecutado correctamente

### Los marcadores no aparecen en el mapa
1. Verificar que haya eventos con estado "Publicado"
2. Revisar consola del navegador
3. Verificar que los eventos tengan coordenadas válidas

### Error de autenticación
1. Verificar que el token JWT no haya expirado (7 días)
2. Limpiar localStorage del navegador
3. Volver a hacer login

## 📝 Próximas Funcionalidades

- [ ] CRUD completo de eventos en el dashboard
- [ ] Selector de mapa interactivo para crear eventos
- [ ] Subida de imágenes (logos, fotos)
- [ ] Sistema de roles y permisos granulares
- [ ] Registro público de usuarios
- [ ] Notificaciones y alertas
- [ ] Exportación de datos
- [ ] API pública documentada con Swagger

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit cambios (`git commit -m 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- Equipo Tambora

## 🙏 Agradecimientos

- Comparsas de Uruguay y Argentina por inspirar este proyecto
- Comunidad de candombe
- OpenStreetMap por los mapas
- Leaflet por la librería de mapas

---

**Versión**: 1.0.0 (Demo)  
**Última actualización**: Noviembre 2024
