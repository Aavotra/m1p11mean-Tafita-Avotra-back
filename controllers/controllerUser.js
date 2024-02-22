const { createDocument, readDocuments, readDocumentsByID, updateDocument, deleteDocument } = require('../mongoDbUtil/mongodbUtils');

const listeUser = async function(request, response) {
    try {
        const documents = await readDocuments('user');
        response.json(documents);
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Document introuvable');
    }
};

module.exports = {
    listeUser
};