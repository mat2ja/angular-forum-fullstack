const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT;

const { connectToDatabase, client } = require('./db/mongo');

connectToDatabase()
  .then(({ db }) => {
    const app = express();

    // middleware
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(`${__dirname}/public/app`));
    app.use(helmet());
    app.use(morgan('dev'));

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE'
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type,  Authorization'
      );
      next();
    });

    // routers
    app.use('/api', require('./app/routes/api'));

    // routes
    app.get('', (_req, res) => {
      res.sendFile(path.join(__dirname, '/public/app/index.html'));
    });

    app.get('/db', async (_req, res) => {
      const users = await db.collection('users').find().toArray();
      res.send(users);
    });

    app.listen(PORT, () => {
      console.log(`🚀️ Running on port ${PORT}`);
    });
  })
  .catch(console.error)
  .finally(() => client?.close());
