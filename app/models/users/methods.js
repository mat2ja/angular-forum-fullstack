const { db } = require('../../../db/mongo');
const { checkHashedPassword } = require('../auth/methods');
const { ObjectId } = require('mongodb');

const Users = db.collection('users');
const Posts = db.collection('posts');

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
    throw new Error('User not found');
  }

  const isMatch = await checkHashedPassword(password, user.password);

  if (!isMatch) {
    throw new Error('Incorrect password');
  }

  delete user.password;
  delete user.tokens;

  return user;
};

const getUserPosts = async (userId) => {
  try {
    const posts = await Posts.find({ userId: ObjectId(userId) }).toArray();
    return posts;
  } catch (err) {
    throw new Error('Error fetching posts');
  }
};

const listUsers = async () => {
  try {
    const users = await db
      .collection('users')
      .find(
        {},
        {
          projection: {
            password: 0,
            tokens: 0,
          },
        }
      )
      .toArray();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error('Error fetching users');
  }
};

module.exports = {
  findById,
  findByCredentials,
  getUserPosts,
  listUsers,
};
