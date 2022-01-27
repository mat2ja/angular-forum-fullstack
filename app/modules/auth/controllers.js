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
    const created_at = new Date();
    const user = await Methods.addUser({
      username,
      password,
      name,
      email,
      created_at,
    });
    const token = await Methods.storeToken(user);

    delete user.password;
    delete user.tokens;

    res.status(201).send({ user, token });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    console.log(req.user, req.token);
    await Methods.logoutUser(req.user._id, req.token);
    res.send({ message: 'Logged out' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  login,
  register,
  logout,
};
