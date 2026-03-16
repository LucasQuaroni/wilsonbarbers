# Barbería Premium - Rosario

Sitio web profesional para una barbería con sistema completo de reserva de turnos, panel administrativo, y notificaciones por email.

## 🎯 Características

- **🏠 Página de Inicio**: Hero atractivo, galería de trabajos, servicios y por qué elegirnos
- **📋 Servicios**: Catálogo completo de servicios con descripciones y precios
- **👨‍💼 Quiénes Somos**: Presentación de barberos profesionales con sus biografías
- **📞 Contacto**: Formulario de contacto, teléfono, email y mapa de ubicación
- **📅 Sistema de Reserva de Turnos**:
  - Seleccionar barbero, servicio, fecha y hora
  - Confirmación automática por email
  - Recordatorio 15 minutos antes del turno
  - Resumen diario de turnos
- **🛡️ Panel Administrativo**:
  - Login seguro con email/password
  - Gestión de barberos (agregar, editar, eliminar)
  - Gestión de servicios (agregar, editar, eliminar)
  - Visualización de turnos
  - Configuración de horarios y datos de la barbería
- **📧 Notificaciones por Email**:
  - Confirmación de turno reservado
  - Recordatorio 15 minutos antes
  - Resumen diario para administrador y barberos

## 🛠 Stack Tecnológico

- **Frontend**: Next.js 16, React 19, TypeScript
- **UI**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Emails**: Resend
- **Cron Jobs**: Vercel Cron
- **Deployment**: Vercel

## 📦 Instalación y Setup

### 1. Clonar el repositorio
```bash
git clone <repo-url>
cd barberia-rosario
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Variables de entorno
Crear un archivo `.env.local` con:
```
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
RESEND_API_KEY=tu_resend_api_key
CRON_SECRET=tu_cron_secret_aleatorio
```

### 4. Crear tablas en Supabase
Las tablas se crean automáticamente. Si necesitas datos de ejemplo, ejecuta el SQL en `scripts/002_seed_demo_data.sql`.

### 5. Crear usuario admin
En Supabase, ve a Authentication > Users y crea un nuevo usuario con email y contraseña para el panel administrativo.

### 6. Ejecutar en desarrollo
```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗂 Estructura de carpetas

```
app/
├── api/
│   ├── appointments/        # API para crear turnos
│   └── cron/               # Jobs de cron para notificaciones
├── admin/
│   ├── login/              # Login del panel
│   └── dashboard/          # Panel administrativo
├── turnos/                 # Sistema de reserva
├── servicios/              # Página de servicios
├── quienes-somos/          # Página del equipo
├── contacto/               # Página de contacto
└── page.tsx                # Home

components/
├── home/                   # Componentes de la home
├── admin/                  # Componentes del panel admin
├── navbar.tsx              # Navegación
└── footer.tsx              # Pie de página

lib/
├── supabase/
│   ├── client.ts           # Cliente Supabase para el navegador
│   ├── server.ts           # Cliente Supabase para servidor
│   └── middleware.ts       # Middleware para manejo de sesión

scripts/
├── 001_create_tables.sql   # Creación de tablas
└── 002_seed_demo_data.sql  # Datos de ejemplo
```

## 📱 Páginas disponibles

### Públicas
- `/` - Inicio
- `/servicios` - Catálogo de servicios
- `/quienes-somos` - Equipo de profesionales
- `/contacto` - Contacto e información
- `/turnos` - Sistema de reserva de turnos

### Protegidas (Admin)
- `/admin/login` - Login del panel administrativo
- `/admin/dashboard` - Panel de control
  - Turnos: Ver y gestionar reservas
  - Barberos: CRUD de barberos
  - Servicios: CRUD de servicios
  - Configuración: Horarios y datos del negocio

## 🔐 Seguridad

- **Autenticación**: Supabase Auth con contraseñas hasheadas
- **CORS**: Configurado para proteger tu API
- **CRON Secret**: Se valida en endpoints de cron para prevenir acceso no autorizado
- **Row Level Security**: Implementada en Supabase (para futuras extensiones)

## 📧 Configuración de Emails (Resend)

1. Crear cuenta en [resend.com](https://resend.com)
2. Obtener tu API Key
3. Agregar a variables de entorno: `RESEND_API_KEY`
4. Los emails se envían automáticamente:
   - Al reservar un turno
   - 15 minutos antes del turno
   - Resumen diario a las 8:00 AM

## ⏰ Cron Jobs (Vercel)

Se ejecutan automáticamente:
- **Recordatorios**: Cada 15 minutos (busca turnos próximos)
- **Resumen diario**: Cada día a las 8:00 AM

Requiere variable de entorno: `CRON_SECRET`

## 🎨 Personalización

### Cambiar nombre de la barbería
1. Ve a `/admin/dashboard` > Configuración
2. Edita "Nombre de la Barbería"
3. El nombre aparecerá en todo el sitio

### Colores y tema
- Editar `app/globals.css` para cambiar variables CSS
- Los colores usan un sistema de tokens (color primario: oro/ámbar)
- Tema oscuro fijo (sin toggle)

### Información de contacto
1. Ve a `/admin/dashboard` > Configuración
2. Actualiza teléfono, email, dirección y horarios
3. Se mostrarán en contacto y footer

### Agregar barberos
1. Ve a `/admin/dashboard` > Barberos
2. Completa el formulario y guarda
3. Aparecerán automáticamente en el sistema de reserva

### Agregar servicios
1. Ve a `/admin/dashboard` > Servicios
2. Crea nuevos servicios con duración y precio
3. Los clientes podrán seleccionarlos al reservar

## 🐛 Troubleshooting

### Error de conexión a Supabase
- Verifica que `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` sean correctos
- Asegúrate de que Supabase esté activo

### Los emails no se envían
- Verifica que `RESEND_API_KEY` esté configurado
- Comprueba que el dominio de Resend esté verificado
- Revisa los logs de Resend

### Cron jobs no se ejecutan
- Se ejecutan solo en producción (Vercel)
- Necesita `CRON_SECRET` configurado
- Los logs están en el dashboard de Vercel

## 📝 TODO / Mejoras futuras

- [ ] Integración con Google Calendar
- [ ] Descargables de términos y condiciones
- [ ] Sistema de opiniones/reseñas
- [ ] Galería editable desde admin
- [ ] Descuentos y promociones
- [ ] Programa de lealtad
- [ ] Chat en vivo
- [ ] App móvil

## 📄 Licencia

Proyecto privado. Todos los derechos reservados.

## 🤝 Soporte

Para reportar bugs o solicitar features, contacta al equipo de desarrollo.

---

**Hecho con ❤️ para Barbería Premium Rosario**
