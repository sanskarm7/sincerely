const path = require('path');

module.exports = {
  entry: './backend/pa-api-calls.js', // Your main JavaScript file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};