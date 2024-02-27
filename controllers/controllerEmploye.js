const {  readDocuments } = require('../mongoDbUtil/mongodbUtils');

const listeEmploye = async function(request, response) {
    try {
        const documents = await readDocuments('empAllInfos');
        console.log(documents);
        response.json(documents);
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Document introuvable');
    }
};

module.exports = {
    listeEmploye
};