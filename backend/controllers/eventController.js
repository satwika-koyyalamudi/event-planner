const db = require('../config/db');

// Get all events
const getAllEvents = (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
};

// Get event by ID
const getEventById = (req, res) => {
    const eventId = req.params.id;
    db.query('SELECT * FROM events WHERE id = ?', [eventId], (err, results) => {
        if (err) {
            console.error('Error fetching event:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(results[0]);
    });
};

// Create new event
const createEvent = (req, res) => {
    const { venue_id, event_name, event_date, available_bookings } = req.body;
    const query = 'INSERT INTO events (venue_id, event_name, event_date, available_bookings) VALUES (?, ?, ?, ?)';
    db.query(query, [venue_id, event_name, event_date, available_bookings], (err, result) => {
        if (err) {
            console.error('Error creating event:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Event created successfully', eventId: result.insertId });
    });
};

// Update an event
const updateEvent = (req, res) => {
    const eventId = req.params.id;
    const { venue_id, event_name, event_date, available_bookings } = req.body;
    const query = 'UPDATE events SET venue_id = ?, event_name = ?, event_date = ?, available_bookings = ? WHERE id = ?';
    db.query(query, [venue_id, event_name, event_date, available_bookings, eventId], (err) => {
        if (err) {
            console.error('Error updating event:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Event updated successfully' });
    });
};

// Delete an event
const deleteEvent = (req, res) => {
    const eventId = req.params.id;
    db.query('DELETE FROM events WHERE id = ?', [eventId], (err) => {
        if (err) {
            console.error('Error deleting event:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Event deleted successfully' });
    });
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
