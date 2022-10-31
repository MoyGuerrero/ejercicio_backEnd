const express = require("express");
const cors = require('cors');
const { dbConnection } = require("./db/database");

const datos = require('./routes/datos');

require('dotenv').config();


dbConnection();

const app = express();
app.use(cors());



// Parseo del body
app.use(express.json());


// Rutas
app.use('/api/buscar_datos', datos)





app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo ${process.env.PORT}`)
});
