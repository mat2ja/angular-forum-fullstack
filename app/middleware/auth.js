const { db } = require('../../db/mongo');
const { verifyAuthToken } = require('../models/auth/methods');
const { ObjectId } = require('mongodb');

const Users = db.collection('users');

const auth = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    const decoded = await verifyAuthToken(token);
    console.log('decoded :>> ', decoded);

    const user = await Users.findOne(
      {
        _id: ObjectId(decoded._id),
        tokens: { $in: [token] },
      },
      {
        projection: {
          password: 0,
          tokens: 0,
        },
      }
    );

    if (!user) {
      throw new Error('Not authorized');
    }

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};

module.exports = auth;
