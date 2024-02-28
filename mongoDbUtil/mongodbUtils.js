const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../db');

//find
async function readDocuments(nomCollection) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(nomCollection);
        const documents = await collection.find({}).toArray();
        return documents;
    } catch (error) {
        console.error("erreur de liste",error);
    }
   
}

//find by id
async function readDocumentsByID(nomCollection, collectionId, fieldName) {
    const objectId = new ObjectId(collectionId);
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    // Construction de la query dynamique avec le champ spécifié
    const query = {};
    query[fieldName] = objectId;

    const documents = await collection.find(query).toArray();
    return documents;
}

//find by data
async function readDocumentsByData(nomCollection, data) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(nomCollection);
        
        // Utilisation de toArray() pour obtenir les résultats sous forme de tableau
        const documents = await collection.find(data).toArray();
        
        console.log(data);
        return documents;
    } catch (error) {
        console.error('Erreur lors de la lecture des documents :', error);
        throw error; // Renvoyer l'erreur pour qu'elle puisse être gérée à un niveau supérieur
    }
}

// find one document by data
async function readOneDocumentByData(nomCollection, data) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(nomCollection);
        const document = await collection.findOne(data);
        return document;
    } catch (error) {
        console.error('Erreur lors de la recherche du document:', error);
        throw error; // Renvoyer l'erreur pour qu'elle puisse être gérée à un niveau supérieur
    }
}


//create
async function createDocument(nomCollection, data) {
    console.log(data);
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const result = await collection.insertOne(data);
    return result;
}

//update
async function updateDocument(nomCollection, collectionId, updatedData) {
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const result = await collection.updateOne({ _id: new ObjectId(collectionId) }, { $set: updatedData });
    return result;
}


//delete
async function deleteDocument(nomCollection, collectionId) {
    
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const result = await collection.deleteOne({ _id: new ObjectId(collectionId) });
    return result;
}
async function ajouterPaiement(documentId, nouveauPaiement) {
    const db = await connectToDatabase();
    const collection = db.collection('rendezVous');

    // Filtre pour sélectionner le document à mettre à jour
    const filter = { _id: new ObjectId(documentId) };

    // Récupérer le document existant
    const existingDocument = await collection.findOne(filter);

    // Nouveau tableau paiement
    let nouveauTableauPaiement;

    // Si le document existe et contient déjà le champ paiement
    if (existingDocument && existingDocument.paiement) {
        // Créer un nouveau tableau paiement en concaténant le paiement existant avec le nouveau paiement
        nouveauTableauPaiement = existingDocument.paiement.concat(nouveauPaiement);
    } else {
        // Créer un nouveau tableau paiement contenant uniquement le nouveau paiement
        nouveauTableauPaiement = [nouveauPaiement];
    }

    // Mise à jour du document avec le nouveau tableau paiement
    const updateResult = await collection.updateOne(
        filter,
        { $set: { paiement: nouveauTableauPaiement } },
        { upsert: true }
    );

    return updateResult.modifiedCount > 0;
}



async function abonnementPortefeuille(documentId, transaction) {
    const db = await connectToDatabase();
    const collection = db.collection('client');

    // Filtre pour sélectionner le document à mettre à jour
    const filter = { _id: new ObjectId(documentId) };

    // Mise à jour du document en ajoutant le nouveau paiement au tableau 'paiement'
    const updateResult = await collection.updateOne(
        filter,
        { $push: { porteFeuille: transaction } },
        { upsert: true }
    );

    return updateResult.modifiedCount > 0;
}
async function getSoldeDispo(idClient) {
    try {
        const db = await connectToDatabase();
        console.log("a");
        const collection = db.collection("vue_solde_disponible");
        const document = await collection.findOne({ _id: new ObjectId(idClient) }, { soldeDisponible: 1 });
       // console.log(document);
        return document;
    } catch (error) {
        console.error('Erreur lors de la recherche du document:', error);
        throw error; // Renvoyer l'erreur pour qu'elle puisse être gérée à un niveau supérieur
    }
}

module.exports = {
    createDocument,
    readDocuments,
    readDocumentsByID,
    updateDocument,
    deleteDocument,
    readDocumentsByData,
    readOneDocumentByData,
    ajouterPaiement,
    getSoldeDispo,
    abonnementPortefeuille
};