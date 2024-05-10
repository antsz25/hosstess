require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const server = require('http').createServer(app);
const compression = require('compression');
const RateLimit = require('express-rate-limit');
//Initial configuration
app.use(RateLimit({
    windowMs: 1*60*1000, // 1 minute
    max:20, // 20 requests per minute
}));
app.use(bodyParser.json());
app.use(compression());
let corsoptions = require('../configurations/cors.configuration');
app.use(cors(corsoptions));
app.set("trust proxy", 1);

//Routes
app.use('/usuarios', require('../routers/usuarios.router'));
app.use('/mesas', require('../routers/mesas.router'));

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});