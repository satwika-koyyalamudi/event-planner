const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM vendors', (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch vendors' });
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM vendors WHERE id = ?';
    db.query(sql, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch vendor' });
        if (results.length === 0) return res.status(404).json({ error: 'Vendor not found' });
        res.json(results[0]);
    });
});

module.exports = router;
