const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY || 'secret' ;

// Check request token to see if the user is authenticated
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];  // récupère le Token
        const decoded = jwt.verify(token, secretKey);           // vérifie le Token
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
