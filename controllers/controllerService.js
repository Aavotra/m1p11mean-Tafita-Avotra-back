const { createDocument, readDocuments, readDocumentsByData, updateDocument, deleteDocument } = require('../mongoDbUtil/mongodbUtils');
const { ObjectId } = require('mongodb');

const listeService = async function(request, response) {
    let documents;
    try {
        if(request.body.idCategorie)
        {
            documents=await readDocumentsByData('service', {idCategorie:new ObjectId(request.body.idCategorie)});
        }
        else
        {
            documents = await readDocuments('service');

        }
        response.json(documents);
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Document introuvable');
    }
};

const insertService = async function(request, response) {
    const { nom, prix, duree, commission,idCategorie,image} = request.body;
    try {
        const data = {
            nom: nom,
            prix: prix,
            commission: commission,
            duree: duree,
            idCategorie: new ObjectId(idCategorie),
            image: image
    const { nom, prix, duree, commission, idCategorie, image } = request.body;

    try {
        const data = {
            "nom": nom,
            "prix": parseFloat(prix),
            "commission": parseFloat(commission),
            "duree": parseInt(duree),
            "idCategorie": new ObjectId(idCategorie),
            "image": image,
        };

        const result = await createDocument('service', data);
        response.status(200).json({
            success: true,
            message: 'Création d\'un nouveau service avec succès',
            serviceId: result.insertedId
        });
        
    } catch (error) {
        console.error('Erreur lors de la création d\'un service :', error.errInfo);
        response.status(500).json({
            success: false,
            message: 'Erreur lors de la création d\'un service.'+error
        });
    }
};

const updateService = async function(request, response) {
    const { nom, prix, duree, commission, idCategorie, image } = request.body;
    const _id = request.params.id

    try {
        const updateData = {
            nom: nom,
            prix: prix,
            commission: commission,
            duree: duree,
            idCategorie: new ObjectId(idCategorie),
            image: image,
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
