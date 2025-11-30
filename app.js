const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

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