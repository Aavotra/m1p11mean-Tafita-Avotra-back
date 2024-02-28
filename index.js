require('dotenv').config({ path: './config/.env' });
const express = require('express');
const cors = require('cors');

const router = require("./routes/router.js");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Serveur sur le port ${port}`);
});
