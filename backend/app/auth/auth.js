const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    console.log('req.headers', req.headers);
    const authHeader = req.headers['access-token'];
    const token = authHeader;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.json({ message: 'Invalid Token' });
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        res.send({
            message: 'No token provided.'
        });
    }
};
