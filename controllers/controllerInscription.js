const { createDocument,readOneDocumentByData } = require('../mongoDbUtil/mongodbUtils');
const { sendEmail, } = require('../config/emailService');

const bcrypt = require('bcrypt');
/*
const inscriptionClient = async function(request, response) {
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await readDocumentsByData('user', { username: request.body.username });
        if (existingUser) {
            return response.status(400).send("Cet utilisateur existe déjà.");
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const registerDate = new Date();
        // Créer un nouvel objet utilisateur avec le mot de passe haché
        const newUser = {
            username: request.body.username,
            password: hashedPassword,
            profil: 0, // profil client
            dateInscription: registerDate,
            infosPerso: request.body.infosPerso
        };
        // Insérer le nouvel utilisateur dans la base de données
        const result = await createDocument('user', newUser);
        response.status(201).send("Inscription réussie !");
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
}*/

/*const inscriptionClient = async function(request, response) {
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await readOneDocumentByData('user', { username: request.body.username });
        console.log(existingUser);
        if (existingUser) {
            return response.status(400).json({ message: "Cet utilisateur existe déjà" });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const registerDate = new Date();
        // Créer un nouvel objet utilisateur avec le mot de passe haché
        const newUser = {
            username: request.body.username,
            password: hashedPassword,
            profil: 0, // profil client
            dateInscription: registerDate,
            infosPerso: request.body.infosPerso
        };
        // Insérer le nouvel utilisateur dans la base de données
        const userResult = await createDocument('user', newUser);

        // Vérifier que l'insertion de l'utilisateur s'est bien déroulée
        if (!userResult.insertedId) {
            throw new Error("Erreur lors de l'insertion de l'utilisateur");
        }

        // Créer un nouvel objet client avec le nouvel identifiant utilisateur et un portefeuille initial
        const newClient = {
            idUser: userResult.insertedId,
            porteFeuille: [{ entree: 0, sortie: 0, date: new Date() }] // Valeurs par défaut pour le portefeuille
        };

        // Insérer le nouvel utilisateur dans la base de données
        const clientResult = await createDocument('client', newClient);

        // Vérifier que l'insertion du client s'est bien déroulée
        if (!clientResult.insertedId) {
            throw new Error("Erreur lors de l'insertion du client");
        }

        response.status(201).send("Inscription réussie !");
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
}
*/

const inscriptionClient = async function(request, response) {
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await readOneDocumentByData('user', { username: request.body.username });
        if (existingUser) {
            return response.status(400).json({ message: "Cet utilisateur existe déjà" });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        
        // Créer un nouvel objet utilisateur avec le mot de passe haché et autres données
        const newUser = {
            username: request.body.username,
            password: hashedPassword,
            profil: 0, // profil client
            dateInscription: new Date(),
            infosPerso: request.body.infosPerso
        };

        // Insérer le nouvel utilisateur dans la base de données
        const userResult = await createDocument('user', newUser);

        // Vérifier que l'insertion de l'utilisateur s'est bien déroulée
        if (!userResult.insertedId) {
            throw new Error("Erreur lors de l'insertion de l'utilisateur");
        }

        // Créer un nouvel objet client avec le nouvel identifiant utilisateur et un portefeuille initial
        const newClient = {
            idUser: userResult.insertedId,
            porteFeuille: [{ entree: 0, sortie: 0, date: new Date() }] // Valeurs par défaut pour le portefeuille
        };

        // Insérer le nouvel utilisateur dans la base de données
        const clientResult = await createDocument('client', newClient);

        // Vérifier que l'insertion du client s'est bien déroulée
        if (!clientResult.insertedId) {
            throw new Error("Erreur lors de l'insertion du client");
        }

        response.status(201).send("Inscription réussie !");
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
}


const mailsentEmploye=async function(request, response) {
    const emailDestinataire = request.body.destinataire;
    const subject = 'Réinitialisation des identifiants';
    const html = `
        <p>Bonjour Employexxx,Bienvenu parmis nous!</p>
        <p>Voici le lien vers votre inscription: <a href="https://fr.wikipedia.org/wiki/Fleur">réinitialisation de vos identifiants</a>  veuillez suivre les étapes pour finaliser votre inscription </p>
        <p>Bien à vous,Le Manager!</p>
    `;

    try {
        const emailSent = await sendEmail(emailDestinataire, subject, html);
        if (emailSent) {
            response.send('Email de reinitialisation envoyé avec succès.');
        } else {
            response.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'email.');
        }
    } catch (error) {
        console.error('Error sending confirmation email: ', error);
        response.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'email.');
    }
}


module.exports = {
    inscriptionClient,
    mailsentEmploye
};
