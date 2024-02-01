const express = require("express");
const controllerRendezvous = require("../controllers/controllerRendezvous");

const router = express.Router();

router.get('/', controllerRendezvous.listeRendezvous);

module.exports = router;