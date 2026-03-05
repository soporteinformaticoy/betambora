# TODO.md

## En curso
(ninguno)

## Pendiente

- [ ] **[Next.js] Decodificar JWT para mostrar datos reales del usuario**
  El sidebar de MapView.tsx muestra "Usuario Tambora" y datos hardcodeados.
  Falta leer el token de localStorage, decodificarlo (sin verificar — es client-side)
  y usar `username` y `photo` del payload para renderizar el perfil real.

- [ ] **[Dashboard admin] Completar CRUD de eventos en el frontend clásico**
  La pantalla `public/admin/eventos.html` existe pero el CRUD no está implementado.
  El backend ya tiene todos los endpoints necesarios en `/api/eventos`.

- [ ] **[Dashboard admin] Selector de mapa interactivo para crear/editar eventos**
  Al crear o editar un evento, el campo `ubicacion.coordinates` debe poder
  completarse haciendo clic en un mapa, no ingresando coordenadas a mano.

- [ ] **[OAuth] Verificar configuración de Google Cloud Console**
  El flujo Google OAuth está implementado en el backend pero puede fallar
  si las URIs no están registradas. Ver `GOOGLE_OAUTH_FIX.md` para los pasos.
  Pendiente confirmar que funciona en entorno local.

- [ ] **[Imágenes] Sistema de subida de logos y fotos**
  Los campos `logo` (Agrupacion) y `foto` (Integrante, User) actualmente
  aceptan solo URLs. Falta implementar subida de archivos (multer o servicio externo).

- [ ] **[PRODUCT.md] Completar con visión, usuarios y roadmap**
  El archivo existe pero está vacío. Necesita decisiones del dueño del producto.

- [ ] **[Tests] Implementar tests básicos de la API**
  No hay ningún test. Mínimo necesario: tests de los endpoints de auth y eventos.

## Completado

- [x] Backend Express + MongoDB operativo
- [x] Auth JWT (login/register)
- [x] Google OAuth implementado en el backend
- [x] CRUD completo de Agrupaciones (backend + frontend clásico)
- [x] CRUD completo de Integrantes (backend + frontend clásico)
- [x] CRUD completo de Eventos en el backend
- [x] Mapa público con Leaflet (frontend clásico)
- [x] Landing page Next.js con animaciones
- [x] Mapa Next.js con Mapbox, marcadores y popup "Voy"
- [x] Toggle "going" en eventos (backend + Next.js)
- [x] AGENT.md creado
- [x] ARCHITECTURE.md completado
- [x] TODO.md completado
- [x] JWT OAuth unificado: callback Google ahora firma con `{ userId }` — verificado con login + toggle
- [x] Toggle "going" corregido: .some()/.filter() con .equals() — verificado con test-going.js ✅

## Deuda técnica conocida

- **Token OAuth no verificado en client-side**: MapView.tsx lee el JWT de localStorage
  pero no valida expiración ni firma. Es aceptable para UX pero hay que ser consciente.

- **middleware.ts de Next.js no cubre /mapa**: Solo redirige `/` si hay token.
  Un usuario sin token puede acceder directamente a `/mapa`. Falta proteger esa ruta.

- **Sin rate limiting ni validación de input**: Las rutas de auth no tienen protección
  contra fuerza bruta ni sanitización de inputs más allá de los validators de Mongoose.
