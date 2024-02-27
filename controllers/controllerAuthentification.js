const { readOneDocumentByData } = require('../mongoDbUtil/mongodbUtils');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey, verifyToken } = require('../config/configJWT');


const login = async function(request, response) {
  try {
    const { username, password } = request.body;

    // Rechercher l'utilisateur dans la base de données
    const user = await readOneDocumentByData('user', { username });
    if (!user) {
      return response.status(401).json({ message: 'Nom d\'utilisateur non valide' });
    }

    // Vérifier le mot de passe avec bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return response.status(401).json({ message: 'Mot de passe non valide' });
    }
    const client = await readOneDocumentByData('client', {idUser:user._id});

    
    // Si l'authentification réussit, générer le token JWT
    const payload = {
      userId: user._id,
      profil: user.profil ,
      clientId: client._id
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    response.json({ token, username});
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
  login,
  checkToken,
};