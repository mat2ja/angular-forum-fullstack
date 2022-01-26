const { db } = require('../../db/mongo');
const { verifyAuthToken } = require('../modules/auth/methods');
const Users = db.collection('users');
const { ObjectId } = require('mongodb');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await verifyAuthToken(token);
    console.log('decoded :>> ', decoded);

    const user = await Users.findOne({
      _id: ObjectId(decoded._id),
      tokens: { $in: [token] },
    });

    if (!user) {
      throw new Error('Not authorized');
    }

    req.token = token;
    req.user = user;

    console.log('req.user :>> ', req.user);
    next();
  } catch (err) {
    res.status(401).send({ error: err.message });
  }
};

module.exports = auth;
