const { createDocument, readDocuments, readDocumentsByID, updateDocument, deleteDocument } = require('../mongoDbUtil/mongodbUtils');

const listeCategorie = async function(request, response) {
    try {
        const documents = await readDocuments('categorie');
        response.json(documents);
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Document introuvable');
    }
};

const insertCategorie = async function(request, response) {
    const libelle = request.body.libelle;

    try {
        const data = {
            libelle: libelle,
        };

        const result = await createDocument('categorie', data);
        response.status(200).json({
            success: true,
            message: 'Création d\'un nouveau categorie avec succès',
            CategorieId: result.insertedId
        });
        
    } catch (error) {
        console.error('Erreur lors de la création d\'un categorie :', error);
        response.status(500).json({
            success: false,
            message: 'Erreur lors de la création d\'un categorie.'
        });
    }
};

const updateCategorie = async function(request, response) {
    const { libelle } = request.body;
    const _id = request.params.id

    try {
        const updateData = {
            libelle: libelle,
        };

        const result = await updateDocument('categorie', _id, updateData);
        response.status(200).json({
            success: true,
            message: 'Changement du Categorie avec succès',
            CategorieId: result.modifiedCount > 0 ? _id : null
        });
        
    } catch (error) {
        console.error('Erreur lors du changement d\'un categorie :', error);
        response.status(500).json({
            success: false,
            message: 'Erreur lors du changement d\'un categorie.'
        });
    }
};

module.exports = {
    listeCategorie,
    insertCategorie,
    updateCategorie,
};
