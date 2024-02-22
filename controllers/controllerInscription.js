const { createDocument,readOneDocumentByData } = require('../mongoDbUtil/mongodbUtils');
const { sendEmail, } = require('../config/emailService');
const { ObjectId } = require('mongodb');

const bcrypt = require('bcrypt');


const inscription = async function(request, response) {
    try {
        let hashedPassword;
        let username;
        let profil=request.params.profil;
        let res;
        if(profil==0)
        {
            // Vérifier si l'utilisateur existe déjà dans la base de données
            username= request.body.username
            // Hacher le mot de passe
            hashedPassword = await bcrypt.hash(request.body.password, 10);
        }
        if(profil==1)
        {
            // Vérifier si l'utilisateur existe déjà dans la base de données
            const randomNumber = Math.floor(Math.random() * 101);
            username= request.body.infosPerso.nom+request.body.infosPerso.prenom+randomNumber;
            // Hacher le mot de passe
            hashedPassword = await bcrypt.hash('0000', 10);
        }
        const existingUser = await readOneDocumentByData('user', { username:username });
        if (existingUser) {
            return response.status(400).json({ message: "Cet utilisateur existe déjà" });
        }

        // Créer un nouvel objet utilisateur avec le mot de passe haché et autres données
        const newUser = {
            username: username,
            password: hashedPassword,
            profil: request.params.profil, // profil client
            dateInscription: new Date(),
            infosPerso: request.body.infosPerso
        };

        // Insérer le nouvel utilisateur dans la base de données
        const userResult = await createDocument('user', newUser);

        // Vérifier que l'insertion de l'utilisateur s'est bien déroulée
        if (!userResult.insertedId) {
            throw new Error("Erreur lors de l'insertion de l'utilisateur");
        }

        if(profil ==0)
        {
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
            res="Inscription réussie !";
        }
        if(profil ==1)
        {

            const newEmploye = {
                idUser: userResult.insertedId,
                matricule:'emp001',
                postes: request.body.postes.map(poste =>new ObjectId(poste)),
                salaire: request.body.salaire,
                dateEmbauche: new Date()                    
            };
            res="test";
            const mail_sent =  mailsentEmploye(request.body.lien_resetPassword ,request.body.infosPerso.email);
            
            const empResult = await createDocument('employe', newEmploye);

            // Vérifier que l'insertion du client s'est bien déroulée
          
            if (!empResult.insertedId) {
                throw new Error("Erreur lors de l'insertion du client");
            }
            res="Inscription réussie !";
             if(mail_sent>0)
            {
                res=userResult.insertedId;
            }
        }
        response.status(201).send(res);
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
}


const mailsentEmploye= function(lien,emailDestinataire) {
    const subject = 'Réinitialisation des identifiants';
    const html = `
        <p>Bonjour ,Bienvenu parmis nous!</p>
        <p>Voici le lien vers votre inscription: <a href="`+lien+`">réinitialisation de vos identifiants</a>  veuillez suivre les étapes pour finaliser votre inscription </p>
        <p>Bien à vous,Le Manager!</p>
    `;

    try {
        const emailSent =  sendEmail(emailDestinataire, subject, html);
        if (emailSent) {
            return 1;
        } else {
            return -1
        }
    } catch (error) {
        console.error('Error sending confirmation email: ', error);
        return -1;
    }
}


module.exports = {
    inscription,
    mailsentEmploye
};
