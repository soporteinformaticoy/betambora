# 🔐 Configuración de Google OAuth para Tambora

Esta guía te ayudará a configurar Google OAuth para permitir que los usuarios inicien sesión con su cuenta de Google.

## 📋 Pasos para Configurar Google OAuth

### 1. Crear Proyecto en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Nombra tu proyecto (ej: "Tambora")

### 2. Habilitar Google+ API

1. En el menú lateral, ve a **APIs & Services** > **Library**
2. Busca "Google+ API"
3. Haz click en **Enable**

### 3. Configurar Pantalla de Consentimiento OAuth

1. Ve a **APIs & Services** > **OAuth consent screen**
2. Selecciona **External** (para permitir cualquier cuenta de Google)
3. Completa la información requerida:
   - **App name**: Tambora
   - **User support email**: tu email
   - **Developer contact information**: tu email
4. En **Scopes**, agrega:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
5. Guarda y continúa

### 4. Crear Credenciales OAuth 2.0

1. Ve a **APIs & Services** > **Credentials**
2. Click en **Create Credentials** > **OAuth client ID**
3. Selecciona **Web application**
4. Configura:
   - **Name**: Tambora Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (desarrollo)
     - Tu URL de producción (cuando la tengas)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/auth/google/callback` (desarrollo)
     - `https://tudominio.com/auth/google/callback` (producción)
5. Click en **Create**
6. **IMPORTANTE**: Copia el **Client ID** y **Client Secret**

### 5. Configurar Variables de Entorno

#### Backend (`/tambora/.env`)

Agrega estas variables a tu archivo `.env`:

```env
# Google OAuth
GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu_client_secret_aqui
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

# Frontend URL (para redirección después del login)
FRONTEND_URL=http://localhost:3001

# JWT Secret (cámbialo en producción)
JWT_SECRET=tambora_secret_key_change_in_production
```

#### Frontend (`/web/.env.local`)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
```

### 6. Reiniciar Servidores

Después de configurar las variables de entorno:

```bash
# Backend (en /tambora)
# Detén el servidor (Ctrl+C) y reinicia
npm start

# Frontend (en /web)
# Detén el servidor (Ctrl+C) y reinicia
npm run dev
```

## 🧪 Probar la Integración

1. Abre el frontend en `http://localhost:3001`
2. Deberías ver la landing page con la luna roja
3. Click en "Entrar con Google · Reconocer mi alma"
4. Serás redirigido a Google para autenticarte
5. Después de autenticarte, volverás a Tambora en `/mapa`

## 🔍 Solución de Problemas

### Error: "Google OAuth no configurado"

- Verifica que `GOOGLE_CLIENT_ID` esté en el archivo `.env` del backend
- Asegúrate de reiniciar el servidor después de agregar las variables

### Error: "redirect_uri_mismatch"

- Verifica que la URI de redirección en Google Cloud Console coincida exactamente con `GOOGLE_REDIRECT_URI`
- Debe ser exactamente: `http://localhost:3000/auth/google/callback`

### El usuario no se crea en la base de datos

- Verifica que MongoDB esté corriendo
- Revisa los logs del backend para ver errores
- Asegúrate de que el modelo User tenga el campo `googleId`

### No redirige al frontend después del login

- Verifica que `FRONTEND_URL` esté configurado correctamente en el backend
- Debe ser: `http://localhost:3001` (sin slash al final)

## 📝 Notas Importantes

1. **Seguridad**: Nunca compartas tu `GOOGLE_CLIENT_SECRET` públicamente
2. **Producción**: Cuando despliegues a producción:
   - Actualiza las URIs autorizadas en Google Cloud Console
   - Cambia `FRONTEND_URL` y `GOOGLE_REDIRECT_URI` a tus URLs de producción
   - Usa un `JWT_SECRET` fuerte y único
3. **Usuarios**: Los usuarios que se registran con Google OAuth:
   - No tienen password en la base de datos
   - Tienen un `googleId` único
   - Por defecto tienen rol `user`

## 🎯 Flujo Completo

```
Usuario → Click "Entrar con Google"
  ↓
Frontend → Redirige a backend/auth/google
  ↓
Backend → Redirige a Google OAuth
  ↓
Google → Usuario autoriza la app
  ↓
Google → Redirige a backend/auth/google/callback con código
  ↓
Backend → Intercambia código por access token
  ↓
Backend → Obtiene info del usuario de Google
  ↓
Backend → Crea/actualiza usuario en MongoDB
  ↓
Backend → Genera JWT token
  ↓
Backend → Redirige a frontend/?token=xxx
  ↓
Frontend → Guarda token en cookies/localStorage
  ↓
Frontend → Redirige a /mapa
  ↓
Usuario autenticado ✅
```

---

**Con el alma del candombe** 🥁🔥
