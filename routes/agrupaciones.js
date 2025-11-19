const express = require('express');
const router = express.Router();
const Agrupacion = require('../models/Agrupacion');
const auth = require('../middleware/auth');

// Get all agrupaciones
router.get('/', async (req, res) => {
    try {
        const agrupaciones = await Agrupacion.find().sort({ nombre: 1 });
        res.json(agrupaciones);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single agrupacion
router.get('/:id', async (req, res) => {
    try {
        const agrupacion = await Agrupacion.findById(req.params.id);
        if (!agrupacion) {
            return res.status(404).json({ message: 'Agrupación not found' });
        }
        res.json(agrupacion);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create agrupacion (protected)
router.post('/', auth, async (req, res) => {
    try {
        const agrupacion = new Agrupacion(req.body);
        await agrupacion.save();
        res.status(201).json(agrupacion);
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
});

// Update agrupacion (protected)
router.put('/:id', auth, async (req, res) => {
    try {
        const agrupacion = await Agrupacion.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!agrupacion) {
            return res.status(404).json({ message: 'Agrupación not found' });
        }

        res.json(agrupacion);
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
});

// Delete agrupacion (protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const agrupacion = await Agrupacion.findByIdAndDelete(req.params.id);

        if (!agrupacion) {
            return res.status(404).json({ message: 'Agrupación not found' });
        }

        res.json({ message: 'Agrupación deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
