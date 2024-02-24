const { createDocument, readDocuments, readDocumentsByID,ajouterPaiement,abonnementPortefeuille, updateDocument, deleteDocument } = require('../mongoDbUtil/mongodbUtils');
const { ObjectId } = require('mongodb');
const listeRendezvous = async function(request, response) {
    try {
        const documents = await readDocuments('rendezVous');
        response.json(documents);
    } catch (error) {
        console.error('Erreur :', error);
        response.status(500).send('Document introuvable');
    }
};
//historique des rendez-vous
const listeRendezvousClients = async function(request, response) {
    const idClient = new ObjectId(request.params.idClient);
    try {
        const documents = await readDocumentsByID('rendezVous', idClient,"idClient");
        if (documents) {
            //const historiqueRendezVous = documents.historique_rendez_vous;
            response.json(documents);
        } else {
            console.error('Erreur :', error);
            response.status(500).send('Document introuvable');
        }
    } catch (error) {
        response.status(500).send('Document introuvable');
    }
};
/*
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
*/
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
        const result = await createDocument('rendezVous', data);

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
//Paiement en ligne 

const payer=async function (request,response){
    const documentId = new ObjectId(request.params.idRdv); // ID du rendezVous à mettre à jour
    const nouveauPaiement = 
    {
        montant:request.body.montant,
        date: new Date(request.body.date)
    };

    const ajoutReussi = await ajouterPaiement(documentId, nouveauPaiement);

    if (ajoutReussi) {
        console.log('Paiement ajouté avec succès.');
        response.status(200).json("Payé!")
    } else {
        console.log('Échec de l\'ajout du paiement.');
        response.status(500).json("Une erreur s'est produite pendant le paiement,Veuillez réessayaer!")

    }
}

//Paiement en ligne 

const abonnement=async function (request,response){
    const clientId = new ObjectId(request.params.idClient); // ID du rendezVous à mettre à jour
    const transaction = 
    {
        entree:request.body.entree,
        sortie:request.body.sortie,
        date: new Date()
    };

    const ajoutReussi = await abonnementPortefeuille(clientId, transaction);

    try {
        console.log('Abonnement  avec succès.');
        response.status(200).json("Abonnement  avec succès!")
    } catch(error) {
        console.error('Échec de l\'ajout du paiement.',error);
        response.status(500).json("Une erreur s'est produite pendant la transaction,Veuillez réessayaer!")

    }
}

module.exports = {
    listeRendezvous,
    listeRendezvousClients,
    //listeRendezvousEmployes,
    priseDeRendezvous,
    abonnement,
    payer
};
