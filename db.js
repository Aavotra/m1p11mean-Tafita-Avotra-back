const { MongoClient } = require('mongodb');
const config = require('./config/config');

async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(config.database.url);
    console.log('Connexion bdd réussie');
    return client.db(config.database.name);
  } catch (error) {
    console.error('Erreur lors de la connexion à la bdd :', error);
    throw error;
  }
}

module.exports = { connectToDatabase };
