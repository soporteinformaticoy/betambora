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
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find({ estado: 'Publicado' })
      .populate('agrupaciones', 'nombre tipo');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
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