const mongoose = require('mongoose');

const agrupacionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        enum: ['Comparsa Oficial', 'Agrupación/Grupo'],
        required: true
    },
    participaConcurso: {
        type: Boolean,
        default: false
    },
    barrio: {
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
    descripcion: {
        type: String,
        trim: true
    },
    añoFundacion: {
        type: Number,
        min: 1900,
        max: new Date().getFullYear()
    },
    logo: {
        type: String,
        trim: true
    },
    redesSociales: {
        facebook: String,
        instagram: String,
        twitter: String
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
agrupacionSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Agrupacion', agrupacionSchema);
