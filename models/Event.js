const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    fecha: {
        type: Date,
        required: true
    },
    ubicacion: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    direccion: {
        type: String,
        trim: true
    },
    ciudad: {
        type: String,
        required: true,
        trim: true
    },
    pais: {
        type: String,
        enum: ['Uruguay', 'Argentina'],
        required: true
    },
    agrupaciones: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agrupacion'
    }],
    estado: {
        type: String,
        enum: ['Pendiente', 'Aprobado', 'Publicado'],
        default: 'Pendiente'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

// Create geospatial index for location queries
eventSchema.index({ ubicacion: '2dsphere' });

// Update the updatedAt timestamp before saving
eventSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Event', eventSchema);
