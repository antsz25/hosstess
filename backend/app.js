require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const RateLimit = require('express-rate-limit');
const server = require("http").createServer(app);
//Initial configuration
/*app.use(RateLimit({
    windowMs: 1*60*1000, // 1 minute
    max:50, // 20 requests per minute
}));*/
app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(compression());
let corsoptions = require('./configurations/cors.configuration');
app.use(cors(corsoptions));

//Routes
app.use('/usuarios', require('./routers/usuarios.router'));
app.use('/mesas', require('./routers/mesas.router'));
app.use('/waiters', require('./routers/meseros.router'));
server.listen(process.env.PORT, () =>{
    console.log(`Server listening on port ${process.env.PORT}`);
});
