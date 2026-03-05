# ARCHITECTURE.md — Arquitectura del Proyecto

## Stack Técnico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js |
| Framework backend | Express 4 |
| Base de datos | MongoDB 4.4+ con Mongoose 8 |
| Autenticación | JWT (jsonwebtoken) + bcryptjs + Passport.js (Google OAuth 2.0) |
| Sesiones | express-session |
| Frontend clásico | HTML5 + CSS3 + JavaScript vanilla |
| Mapas (clásico) | Leaflet 1.9 + OpenStreetMap |
| Frontend moderno | Next.js 16 + TypeScript + Tailwind CSS v4 |
| Mapas (moderno) | Mapbox GL 3 + @mapbox/search-js-react |
| Componentes UI | shadcn/ui (Radix UI + Tailwind) |
| Animaciones | Framer Motion 12 |
| Utilidades | clsx + tailwind-merge |

---

## Estructura de Archivos

```
tambora/
├── app.js                  # Servidor Express, punto de entrada
├── package.json
├── seed.js                 # Seed básico de eventos
├── seedAdmin.js            # Seed completo: admin + agrupaciones + integrantes + eventos
│
├── config/
│   └── passport.js         # Configuración Google OAuth con Passport
│
├── middleware/
│   └── auth.js             # Verificación JWT → adjunta req.user
│
├── models/
│   ├── User.js
│   ├── Agrupacion.js
│   ├── Integrante.js
│   └── Event.js
│
├── routes/
│   ├── auth.js             # Login, register, Google OAuth
│   ├── agrupaciones.js     # CRUD agrupaciones
│   ├── integrantes.js      # CRUD integrantes
│   ├── eventos.js          # CRUD eventos + toggle going
│   └── test.js             # Endpoints de diagnóstico (sin BD)
│
├── public/                 # Frontend clásico (servido por Express)
│   ├── index.html          # Mapa público con Leaflet
│   ├── test.html           # Página de diagnóstico
│   └── admin/              # Dashboard administrativo
│       ├── login.html
│       ├── dashboard.html
│       ├── agrupaciones.html
│       ├── integrantes.html
│       ├── eventos.html
│       ├── css/admin.css
│       └── js/
│           ├── auth.js
│           └── api.js
│
└── web/                    # Frontend moderno Next.js
    ├── package.json
    ├── .env.local
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx            # Landing page (animada, botón Google)
        │   ├── middleware.ts       # Redirect / → /mapa si hay token
        │   └── mapa/
        │       └── page.tsx        # Importa MapView dinámicamente (sin SSR)
        ├── components/
        │   ├── MapView.tsx         # Mapa Mapbox + sidebar + popup eventos
        │   └── ui/
        │       └── button.tsx      # Componente shadcn/ui
        └── lib/
            └── utils.ts            # cn() helper (clsx + tailwind-merge)
```

---

## Base de Datos

**Colección: users**
| Campo | Tipo | Notas |
|---|---|---|
| username | String | único, requerido, mín 3 chars |
| email | String | único, requerido |
| password | String | bcrypt, requerido solo si no hay googleId |
| googleId | String | único sparse, presente en login OAuth |
| photo | String | URL foto de perfil |
| role | String | enum: admin, agrupacion, integrante, espectador |
| createdAt | Date | auto |

**Colección: agrupaciones**
| Campo | Tipo | Notas |
|---|---|---|
| nombre | String | requerido |
| tipo | String | enum: Comparsa Oficial, Agrupación/Grupo |
| participaConcurso | Boolean | default false |
| barrio | String | |
| ciudad | String | requerido |
| pais | String | enum: Uruguay, Argentina |
| descripcion | String | |
| añoFundacion | Number | 1900 – año actual |
| logo | String | URL |
| redesSociales | Object | { facebook, instagram, twitter } |

**Colección: integrantes**
| Campo | Tipo | Notas |
|---|---|---|
| nombre | String | requerido |
| apellido | String | requerido |
| rol | String | enum: Propietario, Director, Jefe de Cuerda, Vedette, Coreógrafa, Gramillero, Bandera, Bailarina, Tamborilero |
| agrupacion | ObjectId | ref Agrupacion, requerido |
| foto | String | URL |
| fechaNacimiento | Date | |
| experienciaAños | Number | mín 0 |
| biografia | String | |
> Virtual disponible: `nombreCompleto` → `${nombre} ${apellido}`

**Colección: events**
| Campo | Tipo | Notas |
|---|---|---|
| titulo | String | requerido |
| descripcion | String | |
| fecha | Date | requerido |
| ubicacion | GeoJSON Point | `{ type: 'Point', coordinates: [lng, lat] }` — índice 2dsphere |
| direccion | String | |
| ciudad | String | requerido |
| pais | String | enum: Uruguay, Argentina |
| agrupaciones | [ObjectId] | ref Agrupacion |
| estado | String | enum: Pendiente, Aprobado, Publicado — ⚠️ solo Publicado aparece en el mapa público |
| createdBy | ObjectId | ref User |
| goingCount | Number | default 0 |
| goingUsers | [ObjectId] | ref User |

---

## Variables de Entorno

### Backend — `.env` (raíz del proyecto)
```
MONGODB_URI=mongodb://localhost:27017/tambora
PORT=3000
JWT_SECRET=<secreto_jwt>
SESSION_SECRET=<secreto_sesion>
GOOGLE_CLIENT_ID=<client_id>.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-<secret>
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

### Frontend Next.js — `web/.env.local`
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=pk.<token_mapbox>
```

---

## Endpoints de la API

### Públicos (sin auth)
```
GET  /api/eventos                       # Lista todos (filtros: ?estado=&pais=)
GET  /api/eventos/:id
GET  /api/agrupaciones
GET  /api/agrupaciones/:id
GET  /api/integrantes
GET  /api/integrantes/:id
GET  /api/events                        # Alias legacy: solo estado=Publicado, usado por MapView.tsx
```

### Auth
```
POST /api/auth/login                    # { username, password } → { token, user }
POST /api/auth/register                 # { username, email, password, role }
GET  /auth/google                       # Inicia flujo OAuth Google
GET  /auth/google/callback              # Callback → redirect localhost:3001/?token=<jwt>
```

### Protegidos (header: Authorization: Bearer <token>)
```
POST   /api/agrupaciones
PUT    /api/agrupaciones/:id
DELETE /api/agrupaciones/:id
POST   /api/integrantes
PUT    /api/integrantes/:id
DELETE /api/integrantes/:id
POST   /api/eventos
PUT    /api/eventos/:id
DELETE /api/eventos/:id
POST   /api/eventos/:id/going           # Toggle "voy a ir" — también en /api/events/:id/going (legacy)
```

---

## Funciones Helper

| Función | Archivo | Descripción |
|---|---|---|
| `cn(...inputs)` | `web/src/lib/utils.ts` | Combina clases Tailwind con clsx + tailwind-merge |
| `auth` middleware | `middleware/auth.js` | Verifica JWT y adjunta `req.user` al request |
| `comparePassword()` | `models/User.js` | Método de instancia, compara password con hash bcrypt |
| `nombreCompleto` | `models/Integrante.js` | Virtual: concatena nombre + apellido |

---

## Log de Decisiones

| Fecha | Decisión | Razón |
|---|---|---|
| Nov 2024 | Dos frontends en paralelo (clásico + Next.js) | Migración gradual sin romper lo que funciona |
| Nov 2024 | JWT como mecanismo de auth principal | Simple, stateless, compatible con ambos frontends |
| Nov 2024 | express-session + Passport solo para el flujo OAuth | Google OAuth requiere session para el handshake, JWT se emite al final |
| Nov 2024 | Índice 2dsphere en Event.ubicacion | Habilita consultas geoespaciales futuras |
| Nov 2024 | Ruta legacy /api/events (alias de /api/eventos) | El frontend Next.js MapView.tsx consume este endpoint |
| Mar 2026 | Sistema de archivos de gestión: AGENT.md, ARCHITECTURE.md, PRODUCT.md, TODO.md, PLANES.md | Flujo de trabajo con agente de ejecución (Antigravity) |