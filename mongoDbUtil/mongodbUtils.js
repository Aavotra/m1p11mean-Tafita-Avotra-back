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
async function readDocumentsByID(nomCollection, collectionId) {
    const objectId = new ObjectId(collectionId);
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const documents = await collection.findOne({ _id: objectId });
    return documents;
}

//find by data
async function readDocumentsByData(nomCollection, data) {
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const documents = await collection.find(data);
    return documents;
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
    try {
        const db = await connectToDatabase();
        const collection = db.collection(nomCollection);
        const result = await collection.updateOne({ _id: new ObjectId(collectionId) }, { $set: updatedData });
        return result;
    } catch (error) {
        console.error("Une erreur est survenue lors de la mise à jour du document :", error);
        throw error;
    }
}


//delete
async function deleteDocument(nomCollection, collectionId) {
    
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const result = await collection.deleteOne({ _id: ObjectId(collectionId) });
    return result;
}

module.exports = {
    createDocument,
    readDocuments,
    readDocumentsByID,
    updateDocument,
    deleteDocument,
    readDocumentsByData,
    readOneDocumentByData,
};
