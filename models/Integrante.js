const mongoose = require('mongoose');

const integranteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        enum: [
            'Propietario',
            'Director',
            'Jefe de Cuerda',
            'Vedette',
            'Coreógrafa',
            'Gramillero',
            'Bandera',
            'Bailarina',
            'Tamborilero'
        ],
        required: true
    },
    agrupacion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agrupacion',
        required: true
    },
    foto: {
        type: String,
        trim: true
    },
    fechaNacimiento: {
        type: Date
    },
    experienciaAños: {
        type: Number,
        min: 0
    },
    biografia: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt timestamp before saving
integranteSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Virtual for full name
integranteSchema.virtual('nombreCompleto').get(function () {
    return `${this.nombre} ${this.apellido}`;
});

module.exports = mongoose.model('Integrante', integranteSchema);
