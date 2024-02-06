const { createDocument, readDocuments, readDocumentsByID, updateDocument, deleteDocument } = require('../mongoDbUtil/mongodbUtils');

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
    const { idemployes } = request.body;
    try {
        const documents = await readDocumentsByID('employes', idemployes);
        if (documents) {
            const historiqueRendezVous = documents.historique_rendez_vous;
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

    const { idclient, idEmploye, idservice, date, prix, paye_en_ligne } = request.body;

    try {
        const data = {
            idclient: idclient,
            idEmploye: idEmploye,
            idservice: idservice,
            date: date,
            prix: prix,
            paye_en_ligne: paye_en_ligne
        };

        const result = await createDocument('rendezvous', data);
        response.status(200).json({
            success: true,
            message: 'Prise de rendez-vous avec succès',
            professionalId: result.insertedId
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
