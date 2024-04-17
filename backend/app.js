require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer(app);

//Initial configuration
app.use(bodyParser.json());
let corsoptions = require('./configurations/cors.configuration');
app.use(cors(corsoptions));
app.set("trust proxy", 1);

//Routes
app.use('/clientes', require('./routers/usuarios.router'));
app.use('/mesas', require('./routers/mesas.router'));

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});