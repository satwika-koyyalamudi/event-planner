const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    console.log('JWT Secret in authenticate:', process.env.JWT_SECRET);
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Authorization token missing' });
    }
};

module.exports = authenticate;
