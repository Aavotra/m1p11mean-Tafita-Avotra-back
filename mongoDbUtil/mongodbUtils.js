const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../db');

//find
async function readDocuments(nomCollection) {
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const documents = await collection.find({}).toArray();
    return documents;
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
    console.log(objectId);
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
   // consolelog(data);   
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

    // Mise à jour du document en ajoutant le nouveau paiement au tableau 'paiement'
    const updateResult = await collection.updateOne(
        filter,
        { $push: { paiement: nouveauPaiement } },
        { upsert: true }
    );

    return updateResult.modifiedCount > 0;
}
module.exports = {
    createDocument,
    readDocuments,
    readDocumentsByID,
    updateDocument,
    deleteDocument,
    readDocumentsByData,
    readOneDocumentByData,
    ajouterPaiement
};
