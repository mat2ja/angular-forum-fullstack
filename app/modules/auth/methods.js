const bcrypt = require('bcryptjs');
const { db } = require('../../../db/mongo');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const Users = db.collection('users');

const addUser = async (credentials) => {
  try {
    credentials.password = await hashPassword(credentials.password);

    await Users.insertOne(credentials);

    return credentials;
  } catch (err) {
    console.log(err);
    throw new Error('Error adding user');
  }
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const checkHashedPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const generateAuthToken = (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  return token;
};

const verifyAuthToken = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

const storeToken = async (user) => {
  try {
    const token = generateAuthToken(user);

    await Users.updateOne(
      { _id: ObjectId(user._id) },
      { $push: { tokens: token } }
    );

    return token;
  } catch (err) {
    console.log(err);
    throw new Error('Error adding user token');
  }
};

module.exports = {
  addUser,
  hashPassword,
  checkHashedPassword,
  generateAuthToken,
  verifyAuthToken,
  storeToken,
};
