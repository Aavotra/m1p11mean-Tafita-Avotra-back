const express = require("express");
const controllerRendezvous = require("../controllers/controllerRendezvous");
const controllerService = require("../controllers/controllerService");

const router = express.Router();


//prise de rendez-vous
router.get('/', controllerRendezvous.listeRendezvous);
router.get('/listeRendezvousClients', controllerRendezvous.listeRendezvousClients);


//crud service
router.get('/listeService', controllerService.listeService);
router.post('/insertService', controllerService.insertService);
router.put('/updateService', controllerService.updateService);

module.exports = router;