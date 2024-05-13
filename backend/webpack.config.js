const path = require('path');

module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'server.js',
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PORT: JSON.stringify(process.env.PORT),
        SECRET_KEY: JSON.stringify(process.env.SECRET_KEY),
        DATABASE_NAME: JSON.stringify(process.env.DATABASE_NAME),
        DATABASE_URI: JSON.stringify(process.env.DATABASE_URI),
      },
    }),
  ],
};