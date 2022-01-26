const { db } = require('../../../db/mongo');
const { checkHashedPassword } = require('../auth/methods');
const { ObjectId } = require('mongodb');

const Users = db.collection('users');

const findById = async (id) => {
  try {
    const user = await Users.findOne({ _id: ObjectId(id) });

    return user;
  } catch (err) {
    throw new Error('Error fetching user');
  }
};

const findByCredentials = async ({ username, password }) => {
  const user = await Users.findOne({ username });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await checkHashedPassword(password, user.password);

  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  return user;
};

const listUsers = async () => {
  try {
    const users = await Users.find().toArray();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error('Error fetching users');
  }
};

module.exports = {
  findById,
  findByCredentials,
  listUsers,
};
