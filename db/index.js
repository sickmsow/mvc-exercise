const { Client } = require('pg');

const client = new Client({
  user: 'macbookpro',
  host: 'localhost',
  database: 'mvc3_db',
  password: '1019',
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Export the client so it can be used elsewhere in the app
module.exports = client;
