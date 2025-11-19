const express = require('express');
const router = express.Router();
const Integrante = require('../models/Integrante');
const auth = require('../middleware/auth');

// Get all integrantes
router.get('/', async (req, res) => {
    try {
        const integrantes = await Integrante.find()
            .populate('agrupacion', 'nombre tipo')
            .sort({ apellido: 1, nombre: 1 });
        res.json(integrantes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get integrantes by agrupacion
router.get('/agrupacion/:agrupacionId', async (req, res) => {
    try {
        const integrantes = await Integrante.find({ agrupacion: req.params.agrupacionId })
            .sort({ apellido: 1, nombre: 1 });
        res.json(integrantes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single integrante
router.get('/:id', async (req, res) => {
    try {
        const integrante = await Integrante.findById(req.params.id)
            .populate('agrupacion', 'nombre tipo ciudad pais');

        if (!integrante) {
            return res.status(404).json({ message: 'Integrante not found' });
        }
        res.json(integrante);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create integrante (protected)
router.post('/', auth, async (req, res) => {
    try {
        const integrante = new Integrante(req.body);
        await integrante.save();
        await integrante.populate('agrupacion', 'nombre tipo');
        res.status(201).json(integrante);
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
});

// Update integrante (protected)
router.put('/:id', auth, async (req, res) => {
    try {
        const integrante = await Integrante.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('agrupacion', 'nombre tipo');

        if (!integrante) {
            return res.status(404).json({ message: 'Integrante not found' });
        }

        res.json(integrante);
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
});

// Delete integrante (protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const integrante = await Integrante.findByIdAndDelete(req.params.id);

        if (!integrante) {
            return res.status(404).json({ message: 'Integrante not found' });
        }

        res.json({ message: 'Integrante deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
