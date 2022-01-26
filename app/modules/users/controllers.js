// const Methods = require('./methods.js');

module.exports.getCurrentUser = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    console.log('user :>> ', user);
    delete user.tokens;
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
