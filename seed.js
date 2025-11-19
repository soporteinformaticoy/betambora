const mongoose = require('mongoose');
require('dotenv').config();

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => {
        console.error('Error de conexión a MongoDB:', err);
        process.exit(1);
    });

// Modelo de evento
const Event = mongoose.model('Event', {
    title: String,
    description: String,
    date: Date,
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]
    }
});

// Datos de ejemplo de eventos de candombe en Montevideo
const sampleEvents = [
    {
        title: 'Llamadas de Cuareim',
        description: 'Tradicionales llamadas de candombe en el barrio Cuareim',
        date: new Date('2025-02-15T18:00:00'),
        location: {
            type: 'Point',
            coordinates: [-56.1920, -34.8850] // Cuareim, Montevideo
        }
    },
    {
        title: 'Desfile de Ansina',
        description: 'Desfile de comparsas por el barrio Ansina',
        date: new Date('2025-02-20T19:00:00'),
        location: {
            type: 'Point',
            coordinates: [-56.1850, -34.8900] // Ansina, Montevideo
        }
    },
    {
        title: 'Candombe en Palermo',
        description: 'Encuentro de tambores en el barrio Palermo',
        date: new Date('2025-02-22T17:30:00'),
        location: {
            type: 'Point',
            coordinates: [-56.1750, -34.8950] // Palermo, Montevideo
        }
    },
    {
        title: 'Llamadas en Barrio Sur',
        description: 'Llamadas tradicionales en Barrio Sur',
        date: new Date('2025-02-25T18:30:00'),
        location: {
            type: 'Point',
            coordinates: [-56.1880, -34.9080] // Barrio Sur, Montevideo
        }
    },
    {
        title: 'Candombe en Cordón',
        description: 'Presentación de comparsas en el barrio Cordón',
        date: new Date('2025-02-28T19:00:00'),
        location: {
            type: 'Point',
            coordinates: [-56.1700, -34.9000] // Cordón, Montevideo
        }
    },
    {
        title: 'Festival de Tambores',
        description: 'Gran festival de candombe en la Rambla',
        date: new Date('2025-03-01T16:00:00'),
        location: {
            type: 'Point',
            coordinates: [-56.1645, -34.9011] // Rambla, Montevideo
        }
    }
];

// Función para poblar la base de datos
async function seedDatabase() {
    try {
        // Limpiar la colección existente
        await Event.deleteMany({});
        console.log('Base de datos limpiada');

        // Insertar eventos de ejemplo
        await Event.insertMany(sampleEvents);
        console.log(`${sampleEvents.length} eventos insertados exitosamente`);

        console.log('\n✅ Base de datos poblada con éxito!');
        process.exit(0);
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
}

// Ejecutar el seed
seedDatabase();
