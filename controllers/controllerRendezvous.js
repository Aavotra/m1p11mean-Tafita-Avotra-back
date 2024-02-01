const { connectToDatabase } = require('../db');

const listeRendezvous = async function(request, response) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('clients');
        const documents = await collection.find({}).toArray();
        response.json(documents);
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Erreur lors de la connexion bdd');
    }
};

module.exports = {
    listeRendezvous,
};
