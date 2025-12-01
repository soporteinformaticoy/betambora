const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Passport configuration
const passport = require('./config/passport');

// CORS configurado ANTES de session para OAuth
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());
app.use(express.static('public'));

// Session configurado DESPUÉS de CORS
app.use(session({
  secret: process.env.SESSION_SECRET || 'tambora_secret_session',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // true en producción con HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Import routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes); // <-- Google OAuth flow
const agrupacionesRoutes = require('./routes/agrupaciones');
const integrantesRoutes = require('./routes/integrantes');
const eventosRoutes = require('./routes/eventos');
const testRoutes = require('./routes/test');

// Test routes (static data, no DB)
app.use('/api/test', testRoutes);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/agrupaciones', agrupacionesRoutes);
app.use('/api/integrantes', integrantesRoutes);
app.use('/api/eventos', eventosRoutes);

// Legacy route for backward compatibility with public map
const Event = require('./models/Event');
const auth = require('./middleware/auth');

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({ estado: 'Publicado' })
      .populate('agrupaciones', 'nombre tipo')
      .select('titulo descripcion fecha ubicacion direccion ciudad pais agrupaciones estado goingCount');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Legacy route para toggle "going" (compatibilidad con frontend)
app.post('/api/events/:id/going', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const userId = req.user._id;
    const userIndex = event.goingUsers.indexOf(userId);

    if (userIndex > -1) {
      event.goingUsers.splice(userIndex, 1);
      event.goingCount = Math.max(0, event.goingCount - 1);
    } else {
      event.goingUsers.push(userId);
      event.goingCount = (event.goingCount || 0) + 1;
    }

    await event.save();
    res.json({
      goingCount: event.goingCount,
      iAmGoing: event.goingUsers.includes(userId)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Ruta para la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin routes
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'login.html'));
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));