const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const dbName = 'salon';

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(url);
    console.log('Connexion bdd réussie');
    return client.db(dbName);
  } catch (error) {
    console.error('Erreur lors de la connexion à la bdd :', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
