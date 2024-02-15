const { readOneDocumentByData } = require('../mongoDbUtil/mongodbUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const secretKey = 'abcd';


const login = async function(request, response) {
    try {
        const username = request.body.username;
        const password = request.body.password; 

        const user = await readOneDocumentByData('user', { username: username});    
        if (!user) {
          return response.status(401).json({ message: 'Nom d\' utilisateur non valide' });
        }
    
        // Vérifier le mot de passe avec bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password); // Comparer avec le mot de passe haché stocké
    
        if (!passwordMatch) {
          return response.status(401).json({ message: 'Mot de passe non valide' });
        }
    
        const payload = {
          userId: user._id,
          profil:user.profil 
        };
        // Si l'authentification réussit, générer le token JWT
        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        response.json({ token });
      } catch (err) {
        console.error('Erreur lors de l\'authentification:', err);
        response.status(500).json({ message: 'Erreur lors de l\'authentification' });
      }
};


  const checkToken = (request, response) => {
    // Appeler le middleware verifyToken
    verifyToken(request, response, () => {
      response.json(1);
    });
};

  module.exports = {
    login,checkToken
};