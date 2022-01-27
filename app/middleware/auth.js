const { db } = require('../../db/mongo');
const { verifyAuthToken } = require('../models/auth/methods');
const Users = db.collection('users');
const { ObjectId } = require('mongodb');

const auth = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ');
    const decoded = await verifyAuthToken(token);
    console.log('decoded :>> ', decoded);
    // TODO: iat - issued at time, implement expiring tokens

    const user = await Users.findOne({
      _id: ObjectId(decoded._id),
      tokens: { $in: [token] },
    });

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
