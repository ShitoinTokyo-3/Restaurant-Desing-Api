const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {
  PORT
} = process.env;

const {
  DB_USER, DB_PASSWORD, DB_HOST,DB
} = process.env;


// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`%s listening at ${PORT}`); // eslint-disable-line no-console
  });
});