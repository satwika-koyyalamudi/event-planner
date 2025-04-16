const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = (req, res) => {
    console.log('JWT Secret in login:', process.env.JWT_SECRET);
    const { email, password } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];
        

            console.log("Password entered by user:", password);
            console.log("Password stored in DB:", user.password);
            
            


        // Compare hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", validPassword);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    });
};

const register = (req, res) => {
    const { email, password } = req.body;

    // Hash password before saving
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Error securing password' });
        }

        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    });
};

module.exports = { login, register };
