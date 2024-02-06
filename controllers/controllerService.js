const { createDocument, readDocuments, readDocumentsByID, updateDocument, deleteDocument } = require('../mongoDbUtil/mongodbUtils');

const listeService = async function(request, response) {
    try {
        const documents = await readDocuments('service');
        response.json(documents);
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Document introuvable');
    }
};

const insertService = async function(request, response) {
    const { nom, prix, duree, commission } = request.body;

    try {
        const data = {
            nom: nom,
            prix: prix,
            duree: duree,
            commission: commission,
        };

        const result = await createDocument('service', data);
        response.status(200).json({
            success: true,
            message: 'Création d\'un nouveau service avec succès',
            serviceId: result.insertedId
        });
        
    } catch (error) {
        console.error('Erreur lors de la création d\'un service :', error);
        response.status(500).json({
            success: false,
            message: 'Erreur lors de la création d\'un service.'
        });
    }
};

const updateService = async function(request, response) {
    const { _id, nom, prix, duree, commission } = request.body;

    try {
        const updateData = {
            nom: nom,
            prix: prix,
            duree: duree,
            commission: commission,
        };

        const result = await updateDocument('service', _id, updateData);
        response.status(200).json({
            success: true,
            message: 'Changement du service avec succès',
            serviceId: result.modifiedCount > 0 ? _id : null
        });
        
    } catch (error) {
        console.error('Erreur lors du changement d\'un service :', error);
        response.status(500).json({
            success: false,
            message: 'Erreur lors du changement d\'un service.'
        });
    }
};

module.exports = {
    listeService,
    insertService,
    updateService,
};