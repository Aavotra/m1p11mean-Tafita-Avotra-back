const { connectToDatabase } = require('../db');

async function createDocument(nomCollection, data) {
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const result = await collection.insertOne(data);
    return result;
}

async function readDocuments(nomCollection) {
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const documents = await collection.find({}).toArray();
    return documents;
}

async function updateDocument(nomCollection, documentId, updatedData) {
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const result = await collection.updateOne({ _id: ObjectId(documentId) }, { $set: updatedData });
    return result;
}

async function deleteDocument(nomCollection, documentId) {
    
    const db = await connectToDatabase();
    const collection = db.collection(nomCollection);
    const result = await collection.deleteOne({ _id: ObjectId(documentId) });
    return result;
}

module.exports = {
  createDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
};
