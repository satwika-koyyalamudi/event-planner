const mysql = require('mysql');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Database connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'your_password',
    database: process.env.DB_NAME || 'event_planner'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to database!');
});

const users = [
    { email: 'alice@gmail.com', password: 'alice123' },
    { email: 'bob@gmail.com', password: 'bob456' },
    { email: 'charlie@yahoo.com', password: 'charlie789' },
    { email: 'diana@gmail.com', password: 'diana321' },
    { email: 'edward@hotmail.com', password: 'edward654' },
    { email: 'frank@gmail.com', password: 'frank987' },
    { email: 'grace@outlook.com', password: 'grace159' },
    { email: 'harry@gmail.com', password: 'harry753' },
    { email: 'irene@yahoo.com', password: 'irene852' },
    { email: 'jack@hotmail.com', password: 'jack951' },
    { email: 'kate@gmail.com', password: 'kate147' },
    { email: 'leo@gmail.com', password: 'leo258' },
    { email: 'mona@outlook.com', password: 'mona369' },
    { email: 'nancy@gmail.com', password: 'nancy753' },
    { email: 'oliver@yahoo.com', password: 'oliver159' },
    { email: 'peter@gmail.com', password: 'peter456' },
    { email: 'quinn@hotmail.com', password: 'quinn654' },
    { email: 'rachel@gmail.com', password: 'rachel321' },
    { email: 'steve@outlook.com', password: 'steve123' },
    { email: 'tony@gmail.com', password: 'tony999' }
];

users.forEach(user => {
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            console.error(`❌ Error hashing for ${user.email}:`, err);
        } else {
            const sql = 'UPDATE users SET password = ? WHERE email = ?';
            db.query(sql, [hash, user.email], (err, result) => {
                if (err) {
                    console.error(`❌ Error updating ${user.email}:`, err);
                } else {
                    console.log(`✅ Password updated for ${user.email}`);
                }
            });
        }
    });
});
