const Methods = require('./methods.js');
const { findByCredentials } = require('../users/methods');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await findByCredentials({ username, password });
    const token = await Methods.storeToken(user);

    delete user.password;
    delete user.tokens;
    res.send({ user, token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const register = async (req, res) => {
  try {
    const { username, password, name, email } = req.body;
    const user = await Methods.addUser({ username, password, name, email });
    const token = await Methods.storeToken(user);

    delete user.password;
    delete user.tokens;

    res.status(201).send({ user, token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const logout = (req, res) => {
  res.send({ message: 'logged out' });
};

module.exports = {
  login,
  register,
  logout,
};
