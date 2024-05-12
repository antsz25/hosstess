let corsOptions = {};
let domains = ["http://localhost:5173","http://localhost:4173","https://hosstess.netlify.app"];

corsOptions = {
    origin: domains,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}

module.exports = corsOptions;
