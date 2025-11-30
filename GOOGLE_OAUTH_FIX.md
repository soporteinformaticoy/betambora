# 🔥 FIX URGENTE: Error redirect_uri_mismatch

## El problema:
Google está rechazando la URI `http://localhost:3000/auth/google/callback` porque **NO está registrada** en Google Cloud Console.

## Solución paso a paso:

### 1. Ve a Google Cloud Console
- Abre: https://console.cloud.google.com/
- Selecciona tu proyecto (o créalo si no existe)

### 2. Habilita Google+ API
- Ve a **APIs & Services** → **Library**
- Busca "Google+ API" o "Google Identity"
- Haz clic en **Enable**

### 3. Configura OAuth Consent Screen
- Ve a **APIs & Services** → **OAuth consent screen**
- Completa:
  - **User Type**: External (para desarrollo)
  - **App name**: Tambora
  - **User support email**: Tu email
  - **Developer contact**: Tu email
- Guarda y continúa

### 4. Crea las credenciales OAuth 2.0
- Ve a **APIs & Services** → **Credentials**
- Haz clic en **+ CREATE CREDENTIALS** → **OAuth client ID**
- **Application type**: Web application
- **Name**: Tambora Local Dev
- **Authorized JavaScript origins**: 
  ```
  http://localhost:3000
  ```
- **Authorized redirect URIs** (MUY IMPORTANTE, debe ser EXACTO):
  ```
  http://localhost:3000/auth/google/callback
  ```
- Haz clic en **CREATE**

### 5. Copia las credenciales a tu `.env`
Después de crear, Google te dará:
- **Client ID** (algo como: `123456789-abc.apps.googleusercontent.com`)
- **Client Secret** (algo como: `GOCSPX-xxxxxxxxxxxxx`)

Agrega esto a tu archivo `.env` en la raíz del proyecto:
```env
GOOGLE_CLIENT_ID=tu_client_id_aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-tu_client_secret_aqui
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
SESSION_SECRET=tambora_secret_session_cambiar_en_produccion
```

### 6. Reinicia el servidor
```bash
npm run dev
```

### 7. Prueba de nuevo
Ve a: http://localhost:3001 y haz clic en "Entrar con Google"

---

## ⚠️ IMPORTANTE:
- La URI debe ser **EXACTAMENTE** `http://localhost:3000/auth/google/callback`
- Sin trailing slash `/`
- Sin espacios
- Debe coincidir **carácter por carácter** con lo que está en Google Cloud Console

## 🔍 Verificación:
Si aún falla, verifica que:
1. El servidor Express esté corriendo en puerto 3000
2. Las variables de entorno estén cargadas correctamente
3. La URI en Google Cloud Console sea idéntica a la del código

