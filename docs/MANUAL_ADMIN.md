# Manual de Usuario - Administrador

## 🎯 Introducción

Este manual está dirigido a usuarios con rol de **Administrador** del sistema Tambora. Como administrador, tienes acceso completo para gestionar agrupaciones, integrantes y eventos de candombe.

## 🔐 Acceso al Sistema

### 1. Iniciar Sesión

1. Navega a: `http://localhost:3000/admin`
2. Ingresa tus credenciales:
   - **Usuario**: `admin`
   - **Contraseña**: `admin123`
3. Click en "Iniciar Sesión"

![Login Admin](file:///Users/soporte/.gemini/antigravity/brain/43b866ac-d443-4654-a38c-73d43186954e/agrupaciones_working_1763593391853.png)

### 2. Navegación

El dashboard tiene un menú lateral con las siguientes opciones:
- 📊 **Dashboard**: Vista general con estadísticas
- 🎭 **Agrupaciones**: Gestión de comparsas y grupos
- 👥 **Integrantes**: Gestión de miembros
- 📅 **Eventos**: Listado de eventos
- 🗺️ **Mapa Público**: Ver mapa de eventos públicos
- 🚪 **Cerrar Sesión**: Salir del sistema

## 🎭 Gestión de Agrupaciones

### Listar Agrupaciones

1. Click en "🎭 Agrupaciones" en el menú lateral
2. Verás una tabla con todas las agrupaciones registradas
3. Información mostrada:
   - Nombre
   - Tipo (Comparsa Oficial / Agrupación/Grupo)
   - Ciudad y País
   - Participación en concurso (Sí/No)

### Crear Nueva Agrupación

1. En la página de Agrupaciones, click en "+ Nueva Agrupación"
2. Completa el formulario:
   - **Nombre** * (obligatorio)
   - **Tipo** * (obligatorio): Selecciona entre:
     - Comparsa Oficial
     - Agrupación/Grupo
   - **Participa en concurso**: Marca si participa en concursos oficiales
   - **Barrio**: Barrio de origen
   - **Ciudad** * (obligatorio)
   - **País** * (obligatorio): Uruguay o Argentina
   - **Año de Fundación**: Año en que se fundó
   - **Descripción**: Información adicional
3. Click en "Guardar"

### Editar Agrupación

1. En la lista de agrupaciones, click en "Editar" en la fila correspondiente
2. Modifica los campos necesarios
3. Click en "Guardar"

### Eliminar Agrupación

1. En la lista de agrupaciones, click en "Eliminar"
2. Confirma la eliminación en el diálogo
3. La agrupación será eliminada permanentemente

> ⚠️ **Advertencia**: Al eliminar una agrupación, los integrantes asociados quedarán sin agrupación.

## 👥 Gestión de Integrantes

### Listar Integrantes

1. Click en "👥 Integrantes" en el menú lateral
2. Verás una tabla con todos los integrantes registrados
3. Información mostrada:
   - Nombre completo
   - Rol
   - Agrupación a la que pertenece
   - Años de experiencia

### Crear Nuevo Integrante

1. En la página de Integrantes, click en "+ Nuevo Integrante"
2. Completa el formulario:
   - **Nombre** * (obligatorio)
   - **Apellido** * (obligatorio)
   - **Rol** * (obligatorio): Selecciona entre:
     - Propietario
     - Director
     - Jefe de Cuerda
     - Vedette
     - Coreógrafa
     - Gramillero
     - Bandera
     - Bailarina
     - Tamborilero
   - **Agrupación** * (obligatorio): Selecciona de la lista
   - **Años de Experiencia**: Número de años
   - **Biografía**: Información adicional
3. Click en "Guardar"

### Editar Integrante

1. En la lista de integrantes, click en "Editar"
2. Modifica los campos necesarios
3. Click en "Guardar"

### Eliminar Integrante

1. En la lista de integrantes, click en "Eliminar"
2. Confirma la eliminación
3. El integrante será eliminado permanentemente

## 📅 Gestión de Eventos

### Listar Eventos

1. Click en "📅 Eventos" en el menú lateral
2. Verás una tabla con todos los eventos registrados
3. Información mostrada:
   - Título
   - Fecha
   - Ciudad y País
   - Agrupaciones participantes
   - Estado (Publicado, Aprobado, Pendiente)

### Estados de Eventos

- **Publicado** 🟢: Visible en el mapa público
- **Aprobado** 🟡: Aprobado pero no publicado
- **Pendiente** 🔴: Pendiente de aprobación

> 📝 **Nota**: En la versión actual (demo), la creación y edición de eventos se realiza mediante el script `seedAdmin.js`. La interfaz completa de CRUD de eventos estará disponible en la próxima versión.

## 📊 Dashboard Principal

El dashboard muestra:

1. **Estadísticas Generales**:
   - Total de agrupaciones
   - Total de integrantes
   - Total de eventos

2. **Próximos Eventos**:
   - Lista de los 5 próximos eventos ordenados por fecha

## 🔍 Consejos y Mejores Prácticas

### Organización de Datos

1. **Crear agrupaciones primero**: Antes de agregar integrantes, asegúrate de tener las agrupaciones creadas
2. **Datos completos**: Completa toda la información posible para mejor visualización
3. **Nombres consistentes**: Usa nombres oficiales de las agrupaciones

### Seguridad

1. **Cambiar contraseña**: En producción, cambia la contraseña por defecto
2. **Cerrar sesión**: Siempre cierra sesión al terminar
3. **No compartir credenciales**: Mantén tus credenciales seguras

### Mantenimiento

1. **Revisar datos regularmente**: Verifica que la información esté actualizada
2. **Eliminar duplicados**: Evita crear agrupaciones o integrantes duplicados
3. **Backup**: Realiza respaldos periódicos de la base de datos

## ❓ Preguntas Frecuentes

### ¿Cómo recupero mi contraseña?

Actualmente no hay sistema de recuperación de contraseña. Contacta al administrador del sistema.

### ¿Puedo crear múltiples usuarios admin?

Sí, usando el endpoint `/api/auth/register` (requiere autenticación).

### ¿Los cambios se reflejan inmediatamente en el mapa público?

Sí, los eventos con estado "Publicado" aparecen inmediatamente en el mapa público.

### ¿Puedo subir logos de agrupaciones?

En la versión actual (demo) no. Esta funcionalidad estará disponible en próximas versiones.

## 🆘 Soporte

Si encuentras problemas:

1. Verifica la consola del navegador (F12)
2. Revisa la sección de "Solución de Problemas" en el README
3. Contacta al equipo de desarrollo

---

**Versión del Manual**: 1.0.0  
**Última actualización**: Noviembre 2024
