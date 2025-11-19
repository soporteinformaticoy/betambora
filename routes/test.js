const express = require('express');
const router = express.Router();

// Static test data (no database)
const testAgrupaciones = [
    {
        _id: 'test1',
        nombre: 'Test Comparsa 1',
        tipo: 'Comparsa Oficial',
        participaConcurso: true,
        ciudad: 'Montevideo',
        pais: 'Uruguay'
    },
    {
        _id: 'test2',
        nombre: 'Test Comparsa 2',
        tipo: 'Agrupación/Grupo',
        participaConcurso: false,
        ciudad: 'Buenos Aires',
        pais: 'Argentina'
    }
];

const testIntegrantes = [
    {
        _id: 'int1',
        nombre: 'Juan',
        apellido: 'Test',
        rol: 'Tamborilero',
        agrupacion: { _id: 'test1', nombre: 'Test Comparsa 1' },
        experienciaAños: 10
    },
    {
        _id: 'int2',
        nombre: 'María',
        apellido: 'Prueba',
        rol: 'Bailarina',
        agrupacion: { _id: 'test2', nombre: 'Test Comparsa 2' },
        experienciaAños: 5
    }
];

const testEventos = [
    {
        _id: 'evt1',
        titulo: 'Evento de Prueba',
        fecha: new Date('2025-02-01'),
        ciudad: 'Montevideo',
        pais: 'Uruguay',
        estado: 'Publicado',
        agrupaciones: [{ _id: 'test1', nombre: 'Test Comparsa 1' }]
    }
];

// Test endpoints (no authentication required)
router.get('/agrupaciones', (req, res) => {
    console.log('TEST: Serving static agrupaciones');
    res.json(testAgrupaciones);
});

router.get('/integrantes', (req, res) => {
    console.log('TEST: Serving static integrantes');
    res.json(testIntegrantes);
});

router.get('/eventos', (req, res) => {
    console.log('TEST: Serving static eventos');
    res.json(testEventos);
});

module.exports = router;
