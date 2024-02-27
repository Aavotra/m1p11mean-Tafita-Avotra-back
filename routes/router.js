const express = require("express");
const controllerRendezvous = require("../controllers/controllerRendezvous");
const controllerService = require("../controllers/controllerService");
const controllerAuthentification = require("../controllers/controllerAuthentification");
const controllerInscription = require("../controllers/controllerInscription");
const controllerUser = require("../controllers/controllerUser");
const controllerEmploye = require("../controllers/controllerEmploye");
const controllerCategorie = require("../controllers/controllerCategorie");


const router = express.Router();


//prise de rendez-vous
router.get('/', controllerRendezvous.listeRendezvous);
router.get('/listeRendezvousClients/:idClient', controllerRendezvous.listeRendezvousClients);
router.post('/take_appointment', controllerRendezvous.priseDeRendezvous);
router.post('/payer_rendezVous/:idRdv',controllerRendezvous.payer);
router.post('/abonnement_portefeuille/:idClient',controllerRendezvous.abonnement);
//router.get('/solde_disponible/:idClient',controllerRendezvous.solde_disponible);




//Liste employés
router.get('/listEmploye', controllerEmploye.listeEmploye);


//User
router.get('/listUser', controllerUser.listeUser);

//crud service
router.get('/listeService', controllerService.listeService);
router.post('/insertService', controllerService.insertService);
router.put('/updateService/:id', controllerService.updateService);

//crud Categorie
router.get('/listeCategorie', controllerCategorie.listeCategorie);
router.post('/insertCategorie', controllerCategorie.insertCategorie);
router.put('/updateCategorie/:id', controllerCategorie.updateCategorie);

//login
router.post('/login', controllerAuthentification.login);
//verifier token
router.get('/verifyToken', controllerAuthentification.checkToken);

//inscription client
router.post('/registration/:profil', controllerInscription.inscription);
router.put('/reset_identifiers', controllerInscription.reinitialisationIdentifiants);
//router.post('/mail_test', controllerInscription.mailsentEmploye);



module.exports = router;