const jwt = require('jsonwebtoken');

const secretKey = 'exam_salon_de_beaute';

// Middleware pour vérifier le token JWT
const verifyToken = (request, response, next) => {
    const token = request.headers['authorization'];
    
    // si token manquant
    if (!token) {
        return response.status(403).json(-2);
    }
    //si token non valide
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return response.status(403).json(-1);
        }
        request.user = decoded;
        next();
    });
};

module.exports = {
    secretKey,
    verifyToken,
};

