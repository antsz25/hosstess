let corsOptions = {};

if (process.env.ENV === "PROD") {
  corsOptions = {
    origin: "https://hosstess.netlify.app",
    credentials: true,
    optionSuccessStatus: 200,
  };
}
if (process.env.ENV === "DEV") {
  corsOptions = {
    origin: "http://localhost:4173",
    credentials: true,
    optionSuccessStatus: 200,
  };
}

module.exports = corsOptions;
