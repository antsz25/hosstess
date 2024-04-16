let corsOptions = {};

if (process.env.ENV === "PROD") {
  corsOptions = {
    origin: true,
    credentials: true,
  };
}
if (process.env.ENV === "DEV") {
  corsOptions = {
    origin: true,
    credentials: true,
  };
}

module.exports = corsOptions;
