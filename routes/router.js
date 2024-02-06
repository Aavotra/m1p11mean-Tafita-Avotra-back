const express = require("express");
const controllerRendezvous = require("../controllers/controllerRendezvous");
const controllerService = require("../controllers/controllerService");

const router = express.Router();


//prise de rendez-vous
router.get('/', controllerRendezvous.listeRendezvous);
router.get('/listeRendezvousClients', controllerRendezvous.listeRendezvousClients);


//crud service
router.get('/listeService', controllerService.listeService);
router.get('/insertService', controllerService.insertService);
router.get('/updateService', controllerService.updateService);

module.exports = router;