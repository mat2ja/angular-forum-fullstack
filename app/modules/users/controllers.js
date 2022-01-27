const Methods = require('./methods.js');

module.exports.getCurrentUser = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    delete user.tokens;
    delete user.password;

    if (req.query.posts) {
      const posts = await Methods.getUserPosts(user._id);
      user.posts = posts;
      res.send({ ...user, posts });
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports.getCurrentUserPosts = async (req, res) => {
  try {
    const { user } = req;
    const posts = await Methods.getUserPosts(user._id);
    res.send(posts);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await Methods.listUsers();
    users.forEach((user) => {
      delete user.tokens;
      delete user.password;
    });
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
