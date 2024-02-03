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

//create
async function createDocument(nomCollection, data) {
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const result = await collection.insertOne(data);
    return result;
}

//update
async function updateDocument(nomCollection, collectionId, updatedData) {
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const result = await collection.updateOne({ _id: ObjectId(collectionId) }, { $set: updatedData });
    return result;
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
};
