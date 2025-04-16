const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM venues', (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch venues' });
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM venues WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch venue' });
        if (results.length === 0) return res.status(404).json({ error: 'Venue not found' });
        res.json(results[0]);
    });
});

module.exports = router;
