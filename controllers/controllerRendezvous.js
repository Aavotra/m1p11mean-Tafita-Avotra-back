const { createDocument, readDocuments, updateDocument, deleteDocument } = require('../mongoDbUtil/mongodbUtils');

const listeRendezvous = async function(request, response) {
    try {
        const documents = await readDocuments('clients');
        response.json(documents);
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Erreur lors de la connexion bdd');
    }
};

const priseDeRendezvous = async function(request, response) {
    try {
        const { idclients, heure, employe } = req.body;
        const db = await connectToDatabase();
        const collectionRendezvous = db.collection('rendezvous');
        const collectionClients = db.collection('clients');
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
