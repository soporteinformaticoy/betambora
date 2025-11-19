const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Get all events (public)
router.get('/', async (req, res) => {
    try {
        const { estado, pais } = req.query;
        const filter = {};

        if (estado) filter.estado = estado;
        if (pais) filter.pais = pais;

        const events = await Event.find(filter)
            .populate('agrupaciones', 'nombre tipo ciudad')
            .populate('createdBy', 'username')
            .sort({ fecha: 1 });

        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('agrupaciones', 'nombre tipo ciudad pais')
            .populate('createdBy', 'username email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Create event (protected)
router.post('/', auth, async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            createdBy: req.user._id
        };

        const event = new Event(eventData);
        await event.save();
        await event.populate('agrupaciones', 'nombre tipo ciudad');

        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
});

// Update event (protected)
router.put('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('agrupaciones', 'nombre tipo ciudad');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(event);
    } catch (error) {
        res.status(400).json({ message: 'Validation error', error: error.message });
    }
});

// Delete event (protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
