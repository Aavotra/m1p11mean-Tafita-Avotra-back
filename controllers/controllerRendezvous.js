const { createDocument, readDocuments, readDocumentsByID, updateDocument, deleteDocument } = require('../mongoDbUtil/mongodbUtils');
const { ObjectId } = require('mongodb');
const listeRendezvous = async function(request, response) {
    try {
        const documents = await readDocuments('rendezvous');
        response.json(documents);
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Document introuvable');
    }
};

const listeRendezvousClients = async function(request, response) {
    const { idclients } = request.body;
    try {
        const documents = await readDocumentsByID('clients', idclients);
        if (documents) {
            const historiqueRendezVous = documents.historique_rendez_vous;
            response.json(historiqueRendezVous);
        } else {
            console.error('Erreur :', error);
            response.status(500).send('Document introuvable');
        }
    } catch (error) {
        response.status(500).send('Document introuvable');
    }
};

const listeRendezvousEmployes = async function(request, response) {
    const { idemploye } = request.body;
    data = {
        _id: idemploye, 
    }

    try {
        const documents = await readDocumentsByID('rendezvous', data);
        if (documents) {
            const historiqueRendezVous = documents;
            response.json(historiqueRendezVous);
        } else {
            console.error('Erreur :', error);
            response.status(500).send('Document introuvable');
        }
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Document introuvable');
    }
};

const priseDeRendezvous = async function(request, response) {
    const { idClient, idEmploye } = request.body;

    try {
        // Convertir les idService en ObjectId
        const servicesWithObjectIds = request.body.service.map(service => ({
            ...service,
            idService: new ObjectId(service.idService.replace(/^ObjectId\('(.*)'\)$/, '$1'))
        }));

        // Calcul du prix total
        let prixTotal = servicesWithObjectIds.reduce((acc, obj) => acc + parseInt(obj.prix), 0);

        // Création de l'objet de données
        const data = {
            service: servicesWithObjectIds,
            date: new Date(),
            etatPaiement: false,
            prixTotal: prixTotal,
            etatRdv: "0",
            idEmploye: new ObjectId(idEmploye),
            idClient: new ObjectId(idClient)
        };

        // Insertion du document dans la collection
        const result = await createDocument('rendezvous', data);

        response.status(200).json({
            success: true,
            message: 'Prise de rendez-vous avec succès',
            rendezVousId: result.insertedId
        });        
    } catch (error) {
        console.error('Erreur lors de l\'insertion de la prise de rendez-vous :', error);
        response.status(500).json({
            success: false,
            message: 'Une erreur s\'est produite lors de la prise de rendez-vous.'
        });
    }
};

module.exports = {
    listeRendezvous,
    listeRendezvousClients,
    listeRendezvousEmployes,
    priseDeRendezvous,
};
