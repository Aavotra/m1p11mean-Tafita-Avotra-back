const express = require('express');
const router = require("./routes/router.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Serveur sur le port ${port}`);
});