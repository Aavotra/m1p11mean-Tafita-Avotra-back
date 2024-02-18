const express = require("express");
const controllerRendezvous = require("../controllers/controllerRendezvous");
const controllerService = require("../controllers/controllerService");
const controllerAuthentification = require("../controllers/controllerAuthentification");
const controllerInscription = require("../controllers/controllerInscription");
const controllerUser = require("../controllers/controllerUser");


const router = express.Router();


//prise de rendez-vous
router.get('/', controllerRendezvous.listeRendezvous);
router.get('/listeRendezvousClients', controllerRendezvous.listeRendezvousClients);

//User
router.get('/listUser', controllerUser.listeUser);

//crud service
router.get('/listeService', controllerService.listeService);
router.post('/insertService', controllerService.insertService);
router.put('/updateService', controllerService.updateService);

//login
router.post('/login', controllerAuthentification.login);
//verifier token
router.get('/verifyToken', controllerAuthentification.checkToken);

//inscription client
router.post('/customer_registration', controllerInscription.inscriptionClient);
router.post('/mail_test', controllerInscription.mailsentEmploye);



module.exports = router;